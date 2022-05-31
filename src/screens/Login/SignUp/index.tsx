import React, { useEffect, useState } from 'react';
import { TouchableWithoutFeedback, Keyboard, AsyncStorage, ScrollView } from 'react-native';
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

interface IUserInfos{
    email: string,
    family_name: string,
    given_name: string,
    id: string;
    name: string;
    picture: string;
}


export function SignUp(){

    const navigation = useNavigation();
    const route = useRoute();
    const { id, email, family_name, given_name, name, picture } = route.params as IUserInfos;

    // Redux de Usuários
    const dispatch = useDispatch();
    const { setUserInfos } = bindActionCreators(actionCreators, dispatch);
    const usrState = useSelector((state: State) => state.user);

    /// Parts
    const [duration, setDuration] = useState(null);
    const [page, setPage] = useState(null);
    const [pageUmEffect, setPageUmEffect] = useState(null);
    const [pageDoisEffect, setPageDoisEffect] = useState(null);
    const [pageTresEffect, setPageTresEffect] = useState(null);


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
                setDuration(1500);
                setPageDoisEffect('fadeIn');
                setPage(2);

            }, 1000);
        }
        if(page == 3){
            setPageDoisEffect('fadeOut');
            setTimeout(()=>{
                setDuration(1500);
                setPageTresEffect('fadeIn');
                setPage(3);

            }, 1000);
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
    }, []);
    
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    });

    function HandlePersonalInfos(form: FormData){
        if(Object.keys(errors).length < 1){
            ChangePage(3);
        }
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
            
        <Part1 animation={pageUmEffect} duration={1000} page={page}>
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
                        largura={'half'}
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
                        largura={'half'}
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
                            control={control}
                            placeholder="Endereço"
                            autoCapitalize="words"
                            autoCorrect={false}
                            error={errors.address && errors.address.message}
                        />

                        <InputForm 
                            name="number"
                            control={control}
                            placeholder="Numero"
                            autoCapitalize="words"
                            autoCorrect={false}
                            keyboardType="numeric"
                            error={errors.number && errors.number.message}
                        />

                        <InputForm 
                            name="city"
                            control={control}
                            placeholder="Cidade"
                            autoCapitalize="words"
                            autoCorrect={false}
                            error={errors.city && errors.city.message}
                        />
                        <InputForm 
                            name="district"
                            control={control}
                            placeholder="Bairro"
                            autoCapitalize="words"
                            autoCorrect={false}
                            error={errors.district && errors.district.message}
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
                        onPress={() =>{ ChangePage(2) } }
                        largura={'half'}
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