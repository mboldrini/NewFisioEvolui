import React, { useState, useEffect } from 'react';
//import { Alert } from 'react-native';
import { ButtonGoogle } from '../../../components/Forms/ButtonGoogle/Index';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session';
import { StorageUserKey } from '../../../global/variaveis/globais';
import { 
    Container,
    WrapLogo,
    Photo,
    WrapInput,
    LoadingIcon
} from './styles';

/// API
import { api } from '../../../global/api';

/// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '../../../state';

type AuthResponse = {
    type: string;
    params: {
        access_token: string;
    }
}

export function SignIn(){

    // Navegação
    const navigation = useNavigation();

    // Redux de Usuários
    const dispatch = useDispatch();
    const { setUserInfos } = bindActionCreators(actionCreators, dispatch);
    const usrState = useSelector((state: State) => state.user);

    // Padrão do Login + Usuário
    const [loading, setLoading] = useState(false);
   // const [oAuthToken, setoAuthToken] = useState(null);

    async function handleSignInWithGoogle(){

        setLoading(true);

        const CLIENT_ID = '19918590573-m2k3b72f7jq816hvu3rcucov4itvjvji.apps.googleusercontent.com';
        const REDIRECT_URL = 'https://auth.expo.io/@mboldrini/fisioevolui';
        const RESPONSE_TYPE = 'token';
        const SCOPE = encodeURI('profile email');

        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
        const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthResponse;

        if(type === 'success'){
            //setoAuthToken(params.access_token);
            loadProfile(params.access_token);
        }else{
            alert("Login Cancelado");
            setLoading(false);
        }
    }

    async function loadProfile(tkn: string){
        try{

            const response = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${tkn}`);
            const userInfo = await response.json();
    
            console.log(userInfo);
            if(userInfo.email){

                api.post('/sessions', {
                    email: userInfo.email,
                    uid: userInfo.id
                }).then(res =>{
                    console.log("SUCESSO?");
                    alert("SUCESSO?");
                }).catch(err =>{
                    console.log(err.response.data);
                    if(err.response.data.message === "Usuário não encontrado"){
                        console.log("REDIR p/ CRIAR User");
                        navigation.navigate('SignUp',{
                            email: userInfo.email,
                            family_name: userInfo.family_name,
                            given_name: userInfo.given_name,
                            id: userInfo.id,
                            name: userInfo.name,
                            picture: userInfo.picture
                        });
                    }else{
                        alert(JSON.stringify(err.response.data));
                    }

                });

            }
            

        }catch(err){
            alert(err);
        }finally{
            setLoading(false);
        }
    
        // await AsyncStorage.setItem(StorageUserKey, JSON.stringify(userInfo) );
        // seta o REDUX
        // setUserInfos( userInfo );

    }

   

    // useEffect(()=>{
    //     if(oAuthToken != null){
    //         loadProfile(oAuthToken);
    //     }
    // }, [oAuthToken]);

    // useEffect(()=>{
    //     // if(usrState.name){
    //     //     navigation.navigate('MainTab');
    //     // }
    // },[usrState]);

    useEffect(()=>{
        async function handleUserInfoStorage(){
            setLoading(true);
            const usrInfosLocal = await AsyncStorage.getItem(StorageUserKey);
            if(usrInfosLocal != null){
                const usrInfos = JSON.parse(usrInfosLocal);
                setUserInfos(usrInfos);
            }
    
            setLoading(false);
        }
       // handleUserInfoStorage();

    },[]);

    return(
        <Container>
            <WrapLogo>
                <Photo source={require('../../../assets/logo.png')}/>
            </WrapLogo>

            { !loading &&
                <WrapInput>
                    <ButtonGoogle
                        onPress={handleSignInWithGoogle}
                    />
                </WrapInput>
            }
          
            { loading &&
                <LoadingIcon size="large" color="#FFFFFF"/>            
            }
        
        </Container>
    );
}

