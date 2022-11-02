import React, { useEffect, useState } from 'react';
import { TouchableWithoutFeedback, Keyboard, AsyncStorage, ScrollView, Alert } from 'react-native';
import { InputMasked } from '../../../components/Forms/InputMasked';
import { useForm } from 'react-hook-form';
import { InputForm } from '../../../components/Forms/InputForm';
import { Button } from '../../../components/Buttons/Button/Index';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { 
    Container,
    Part1,
    CenterSpaced,
    Header,
    Title,
    Greetings,
    Name,
    MessageWrap,
    Message,
    MessageDescription,
    WrapHalfButton,
    Part2,
    Description,
    Form,
    Fields,
    Part3,
} from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { api } from '../../../global/api';

/// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '../../../state';

import * as Animatable from 'react-native-animatable';
import { Select } from '../../../components/Forms/Select';
import { ModalUF } from '../../../components/Modal/ModalUF';
import { IUserBasicInfos, IUserParamsInfos } from './interfaces';
import { toast } from '@backpackapp-io/react-native-toast';


interface FormData{
    nome: string,
    sobrenome: string,
    emailProfissional: string,
    celular: string,
    website: string,
    instagram: string,
    tiktok: string,
    twitter: string,
}

const schema = Yup.object().shape({
    nome: Yup.string().required("Nome é obrigatório"),
    sobrenome: Yup.string().required("É obrigatório informar o sobrenome"),
    emailProfissional: Yup.string().required("É obrigatório informar um email para contato"),
    celular: Yup.string().required("Telefone de contato é obrigatório"),
    website: Yup.string().optional(),
    instagram: Yup.string().optional(),
    tiktok: Yup.string().optional(),
    twitter: Yup.string().optional(),
});

const schemaAddress = Yup.object().shape({
    address: Yup.string().required("Endereço é obrigatório"),
    number: Yup.number().optional(),
    city: Yup.string().required("Cidade é obrigatório"),
    district: Yup.string().required("Bairro é obrigatório")
});

interface FormDataAddress{
    address: string;
    number: number;
    city: string;
    district: string;
}



export function SignUp(){

    const navigation = useNavigation();
    const route = useRoute();
    const { id, email, family_name, given_name, name, picture } = route.params as IUserParamsInfos;

    // Redux de Usuários
    // const dispatch = useDispatch();
    // const { setUserInfos } = bindActionCreators(actionCreators, dispatch);
    // const usrState = useSelector((state: State) => state.user);

    /// YUP Resolver
    const { control, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(schema) });
    const {control: controlAddress, handleSubmit: HandleSubmitUserAddress, formState: {errors: errorsAddress}, reset: resetDois} = useForm({ resolver: yupResolver(schemaAddress), });

    /// User infos que serão cadastradas
    const [userInfos, setUserInfos] = useState<IUserBasicInfos>(null);

    /// Parts
    const [duration, setDuration] = useState(null);
    const [page, setPage] = useState(null);
    const [pageUmEffect, setPageUmEffect] = useState(null);
    const [pageDoisEffect, setPageDoisEffect] = useState(null);
    const [pageTresEffect, setPageTresEffect] = useState(null);

    /// User Address
    const [estado, setEstado] = useState({key: -1,name: 'UF'});
    const [modalUfVisible, setModalUfVisible] = useState(false);

    function ChangePage(page: number){
        if(page == 1){
            setPage(1);
            setPageUmEffect('fadeIn');
        }
        if(page == 2){
            setPageUmEffect('fadeOut');
            setTimeout(()=>{
                setDuration(1); //1500
                setPageDoisEffect('fadeIn');
                setPage(2);

            }, 1000);
        }
        if(page == 3){
            setPageDoisEffect('fadeOut');
            setTimeout(()=>{
                setDuration(1);// 1500
                setPageTresEffect('fadeIn');
                setPage(3);

            }, 1); // 1000
        }
    }

    useEffect(()=>{
        ChangePage(1);

        reset({
            nome: name,
            sobrenome: family_name,
            emailProfissional: email,
            celular: '99999999999'
        });

        resetDois({
            address: "Av. Raul de Oliveira Neves",
            number: "295",
            city: "Vitória",
            district: "Jardim Camburi"
        });
        setEstado({key: 32,name: 'ES - Espírito Santo'});

    }, []);
    
 
    function HandlePersonalInfos(form: FormData){
        if(Object.keys(errors).length < 1){
            let basicInfos = {
                magic_code: 'b4t4t4',
                user_code: id,
                name: form.nome,
                family_name: form.sobrenome,
                given_name: '_',
                picture: picture,
                email: email,
                address: {
                    address: '',
                    number: 0,
                    city: '',
                    district: '',
                    state: '',
                    country: 'Brasil'
                },
                infos: {
                    description:'.',
                    professional_mail: form.emailProfissional,
                    celphone: form.celular,
                    second_celphone: '00000000000',
                    website: form.website ? form.website : '.',
                    instagram: form.instagram ? form.instagram :'.',
                    twitter: form.twitter ? form.twitter : '.',
                    tiktok: form.tiktok ? form.tiktok : '.'
                }
            }
            setUserInfos(basicInfos);

            ChangePage(3);
        }
    }

    function HandleUserAddress(form: FormDataAddress){
        if(estado.key == -1){
            Alert.alert(
                "Ops!",
                "É necessário escolher um Estatdo",
                [ { text: "OK"} ]
            );
            return;
        }

        let infos = userInfos;

        infos.address.address = form.address;
        infos.address.number = form.number;
        infos.address.city = form.city;
        infos.address.district = form.district;
        infos.address.state = estado.name.split("-")[0].replace(" ", "");

        CreateUser(infos);
    }
    
    async function CreateUser(infos: IUserBasicInfos){
        console.group("CreateUser");

        console.log(JSON.stringify(infos));
        await api().post('/users/', infos).then(res =>{
            console.log("OK!");
            console.log(res);

            navigation.navigate("SignIn" as never);

        }).catch(err=>{
            console.log("DEU RUIM!");
            console.log(err.response.data.message);

            toast.error('Ops! Erro ao criar usuário', {duration: 6000, icon: '❌'});

        });

        console.groupEnd();
    }

    // async function handleRegister(form: FormData){

    //     const data = {
    //         id,
    //         email,
    //         family_name,
    //         given_name,
    //         name,
    //         picture,
    //         crefito: form.crefito,
    //         celular: form.celular,
    //     }

    //     api.post('users/', 
    //         data
    //     ).then(res =>{
    //         console.log("SUCESSO!");
    //         console.log(res.data);
    //     }).catch(err=>{
    //         alert("ERRO ao conectar na api!");
    //         navigation.navigate('SignIn');
    //         console.log(err.response.data);
    //     });

    //     await AsyncStorage.setItem(StorageKeys.user, JSON.stringify(data) );
    //     /// Seta o REDUX
    //     setUserInfos( data );
    
    // }

    // useEffect(()=>{
    //     if(usrState.name){
    //         navigation.navigate('MainTab');
    //     }
    // },[usrState]);
    

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>

        <Part1 animation={pageUmEffect} duration={1} page={page}>
            <Header>
                <Title>
                    <Greetings>Olá,</Greetings>
                    <Name>{name}</Name>
                </Title>
            </Header>

            <CenterSpaced>
                <MessageWrap>
                    <Message>Antes de criar sua conta, precisamos que nos forneça algumas informações básicas.</Message>
                    <MessageDescription>Não se preocupe, é coisa rápida!</MessageDescription>
                </MessageWrap>

                <WrapHalfButton>
                    <Button 
                        title="Vamos lá!" 
                        type="ok"
                        onPress={() =>{ ChangePage(2) } }
                        rightIcon={'arrow-right'}
                    />
                </WrapHalfButton>
            </CenterSpaced>
        </Part1>

        <Part2 animation={pageDoisEffect} duration={duration} page={page}>
            <ScrollView>

            <Header>
                <Title>
                    <Description>Sobre você:</Description>
                </Title>
            </Header>

            <CenterSpaced>
                <Form>
                    <Fields>

                        <InputForm 
                            name="nome"
                            control={control}
                            placeholder="Nome"
                            autoCapitalize="words"
                            autoCorrect={false}
                            error={errors.nome && errors.nome.message}
                        />

                        <InputForm 
                            name="sobrenome"
                            control={control}
                            placeholder="Sobrenome"
                            autoCapitalize="words"
                            autoCorrect={false}
                            error={errors.sobrenome && errors.sobrenome.message}
                        />

                        <InputForm 
                            name="emailProfissional"
                            control={control}
                            placeholder="Email profissional"
                            autoCapitalize="words"
                            autoCorrect={false}
                            error={errors.emailProfissional && errors.emailProfissional.message}
                            keyboardType="email-address"
                        />

                        <InputMasked
                            name="celular"
                            control={control}
                            placeholder="Celular/Whatsapp"
                            error={errors.celular && errors.celular.message}
                            type="cel-phone"
                            options={{
                                maskType: 'BRL',
                                withDDD: true,
                                dddMask: '(99) '
                            }}
                        />

                        <InputForm 
                            name="website"
                            control={control}
                            placeholder="Website"
                            autoCorrect={false}
                            error={errors.website && errors.website.message}
                        />

                        <InputForm 
                            name="instagram"
                            control={control}
                            placeholder="Instagram"
                            autoCapitalize="words"
                            autoCorrect={false}
                            error={errors.instagram && errors.instagram.message}
                        />

                        <InputForm 
                            name="tiktok"
                            control={control}
                            placeholder="Tiktok"
                            autoCapitalize="words"
                            autoCorrect={false}
                            error={errors.tiktok && errors.tiktok.message}
                        />

                        <InputForm 
                            name="twitter"
                            control={control}
                            placeholder="Twitter"
                            autoCapitalize="words"
                            autoCorrect={false}
                            error={errors.twitter && errors.twitter.message}
                        />
                    </Fields>
                </Form>

                <WrapHalfButton>
                    <Button 
                        title="Próximo" 
                        type="ok"
                        onPress={handleSubmit((d) =>  HandlePersonalInfos(d as any) )}
                        rightIcon={'arrow-right'}
                    />
                </WrapHalfButton>
            </CenterSpaced>
            </ScrollView>
        </Part2>

        <Part3 animation={pageTresEffect} duration={duration} page={page}>
            <Header>
                <Title>
                    <Description>Sua localização:</Description>
                </Title>
            </Header>

            <CenterSpaced>
                <Form>
                    <Fields>

                        <InputForm 
                            name="address"
                            control={controlAddress}
                            placeholder="Endereço"
                            autoCapitalize="words"
                            autoCorrect={false}
                            error={errorsAddress.address && errorsAddress.address.message}
                        />

                        <InputForm 
                            name="number"
                            control={controlAddress}
                            placeholder="Numero"
                            autoCapitalize="words"
                            autoCorrect={false}
                            keyboardType="numeric"
                            error={errorsAddress.number && errorsAddress.number.message}
                        />

                        <InputForm 
                            name="city"
                            control={controlAddress}
                            placeholder="Cidade"
                            autoCapitalize="words"
                            autoCorrect={false}
                            error={errorsAddress.city && errorsAddress.city.message}
                        />
                        <InputForm 
                            name="district"
                            control={controlAddress}
                            placeholder="Bairro"
                            autoCapitalize="words"
                            autoCorrect={false}
                            error={errorsAddress.district && errorsAddress.district.message}
                        />
                        <Select 
                            title={  estado.name }
                            isActive={ estado.key }
                            onPress={()=>{ setModalUfVisible(true) }}
                        /> 

                    </Fields>
                </Form>

                <WrapHalfButton>
                    <Button 
                        title="Próximo" 
                        type="ok"
                        onPress={HandleSubmitUserAddress((d) =>  HandleUserAddress(d as FormDataAddress) )}
                        rightIcon={'arrow-right'}
                    />
                </WrapHalfButton>
            </CenterSpaced>
        </Part3>


        <ModalUF  
            isVisible={modalUfVisible} 
            setIsVisible={()=> setModalUfVisible(false) }
            statusAtual={estado} 
            setCategory={setEstado}
        />


        </Container>
        </TouchableWithoutFeedback>
    )
}