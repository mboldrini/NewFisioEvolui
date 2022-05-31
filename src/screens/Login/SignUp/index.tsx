import React, { useEffect, useState } from 'react';
import { TouchableWithoutFeedback, Keyboard, AsyncStorage } from 'react-native';
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
} from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { api } from '../../../global/api';

/// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '../../../state';

import * as Animatable from 'react-native-animatable';

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
    const { id, email, family_name, given_name, name, picture } = route.params as IUserInfos;

    // Redux de Usuários
    const dispatch = useDispatch();
    const { setUserInfos } = bindActionCreators(actionCreators, dispatch);
    const usrState = useSelector((state: State) => state.user);

    /// Parts
    const [page, setPage] = useState(null);
    const [pageZeroEffect, setPageZeroEffect] = useState(null);
    const [pageUmEffect, setPageUmEffect] = useState(null);

    const [duration, setDuration] = useState(null);

    function ChangePage(page: number){
        if(page == 0){
            setPage(0);
            setPageZeroEffect('fadeIn');
        }
        if(page == 1){
            setPageZeroEffect('fadeOut');
            setTimeout(()=>{
                setDuration(1500);
                setPageUmEffect('fadeIn');
                setPage(1);

            }, 1000);
        }
      
    }

    useEffect(()=>{
        ChangePage(1);
    }, []);
    
    // const {
    //     control,
    //     handleSubmit,
    //     formState: { errors }
    // } = useForm({
    //     resolver: yupResolver(schema)
    // });


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
            

        <Part1 animation={pageZeroEffect} duration={1000} page={page}>
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
                        onPress={() =>{ ChangePage(1) } }
                        largura={'half'}
                        rightIcon={'arrow-right'}
                    />
                </WrapHalfButton>
            </CenterSpaced>
        </Part1>

        <Part2 animation={pageUmEffect} duration={duration} page={page}>
            <Header>
                <Title>
                    <Greetings>Olá,</Greetings>
                    <Name>BATATISTA</Name>
                </Title>
            </Header>

            <CenterSpaced>
                <MessageWrap>
                    <Message>LOREM IMPSUM DOLOR</Message>
                    <MessageDescription>Não se preocupe, é coisa rápida!</MessageDescription>
                </MessageWrap>

                <WrapHalfButton>
                    <Button 
                        title="Vamos lá!" 
                        type="ok"
                        onPress={() =>{ ChangePage(0) } }
                        largura={'half'}
                        rightIcon={'arrow-right'}
                    />
                </WrapHalfButton>
            </CenterSpaced>
        </Part2>


        </Container>
        </TouchableWithoutFeedback>
    )
}