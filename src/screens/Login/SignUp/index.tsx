import React, { useEffect, useState } from 'react';
import { TouchableWithoutFeedback, Keyboard, AsyncStorage } from 'react-native';
import { InputMasked } from '../../../components/Forms/InputMasked';
import { useForm } from 'react-hook-form';
import { InputForm } from '../../../components/Forms/InputForm';
import { Button } from '../../../components/Forms/Button/Index';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { 
    Container,
    Header,
    Title,
    Greetings,
    Name,
    Message,
    Form,
    Fields,
    WrapFooterCadastro
} from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { api } from '../../../global/api';

/// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '../../../state';
import { StorageUserKey } from '../../../global/variaveis/globais';

interface FormData{
    crefito: string,
    celular: string,
}

const schema = Yup.object().shape({
    celular: Yup.string().required("Telefone de contato é obrigatório"),
    crefito: Yup.string().required("CREFITO é obrigatório"),
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
    const [routeParams, setRouteParams] = useState<IUserInfos>(route.params as IUserInfos);

    // Redux de Usuários
    const dispatch = useDispatch();
    const { setUserInfos } = bindActionCreators(actionCreators, dispatch);
    const usrState = useSelector((state: State) => state.user);

    
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });


    async function handleRegister(form: FormData){

        const data = {
            id: routeParams.id,
            email: routeParams.email,
            family_name: routeParams.family_name,
            given_name: routeParams.given_name,
            name: routeParams.name,
            picture: routeParams.picture,
            crefito: form.crefito,
            celular: form.celular,
        }

        api.post('users/', 
            data
        ).then(res =>{
            console.log("SUCESSO!");
            console.log(res.data);
        }).catch(err=>{
            alert("ERRO ao conectar na api!");
            navigation.navigate('SignIn');
            console.log(err.response.data);
        });

        await AsyncStorage.setItem(StorageUserKey, JSON.stringify(data) );
        /// Seta o REDUX
        setUserInfos( data );
    
    }

    useEffect(()=>{
        if(usrState.name){
            navigation.navigate('MainTab');
        }
    },[usrState]);
    


    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
            <Header>
                <Title>
                    <Greetings>Olá, </Greetings>
                    <Name>Matheus!</Name>
                </Title>
                <Message>Antes de criar sua conta, preciso que nos forneça algumas informações básicas sobre você!</Message>
            </Header>

            <Form >
                <Fields>

                    <InputForm 
                        name="crefito"
                        control={control}
                        placeholder="CREFITO"
                        autoCorrect={false}
                        error={errors.crefito && errors.crefito.message}
                    />

                    <InputMasked
                        name="celular"
                        control={control}
                        placeholder="Celular"
                        error={errors.celular && errors.celular.message}
                        type="cel-phone"
                        options={{
                            maskType: 'BRL',
                            withDDD: true,
                            dddMask: '(99) '
                        }}
                    /> 
                    
                </Fields>

                <WrapFooterCadastro>
                    <Button 
                        title="Criar" 
                        type="ok"
                        onPress={handleSubmit((d) => handleRegister(d as any))}
                    />
                </WrapFooterCadastro>

            </Form>

        </Container>
        </TouchableWithoutFeedback>
    )
}