import React, { useState, useEffect } from 'react';
import { ButtonGoogle } from '../../../components/Buttons/ButtonGoogle/Index';
import { useNavigation } from '@react-navigation/native';
import * as AuthSession from 'expo-auth-session';
import { addHours, isBefore, parseISO } from 'date-fns';
import { 
    Container,
    WrapLogo,
    Photo,
    WrapInput,
    LoadingIcon
} from './styles';

/// API
import { api, OAuthGoogleInfos } from '../../../global/api'; 
import { IGoogleData } from '../../../global/DTO/IGoogleData';

// /// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '../../../state';

type AuthResponse = {
    type: string;
    params: {
        access_token: string;
    }
}


import Constants from 'expo-constants';
import {
    useAuthRequest,
    makeRedirectUri,
    AuthRequestConfig,
    DiscoveryDocument
  } from 'expo-auth-session';
import { Button, Platform, Text } from 'react-native';
import { maybeCompleteAuthSession } from 'expo-web-browser';


export function SignIn(){

    // Navegação
    const navigation = useNavigation();

    // // Redux de Usuários
    const dispatch = useDispatch();
    const { setUserInfos, setApiInfos, setFormasPgto, setAtendimentos } = bindActionCreators(actionCreators, dispatch);
    const usrState = useSelector((state: State) => state.user);// o .user é o nome usado no .index da pasta reducers
    const apiState = useSelector((state: State) => state.apiReducer);// o .user é o nome usado no .index da pasta reducers

    // Padrão do Login + Usuário
    const [loading, setLoading] = useState(false);

    const [googleUserInfos, setGoogleUserInfos] = useState<IGoogleData>({} as IGoogleData);
    const [appApiToken, setAppApiToken] = useState(null);

    function GetGoogleUrlLogin(){
        const SCOPE = encodeURI('profile email');
        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${OAuthGoogleInfos.CLIENT_ID}&redirect_uri=${OAuthGoogleInfos.REDIRECT_URL}&response_type=${OAuthGoogleInfos.RESPONSE_TYPE}&scope=${SCOPE}`;
        return authUrl;
    }

    async function HandleSignInWithGoogle(){
        setLoading(true);

        const authUrl = await GetGoogleUrlLogin();
        const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthResponse;

        if(type === 'success'){
            GetGoogleToken(params.access_token);
        }else{
            console.error("Login Cancelado!");
            setLoading(false);
        }

    }

    async function GetGoogleToken(googleToken: string){
        try{

            const response = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${googleToken}`);
            const userInfo = await response.json();

            if(userInfo.email){
                setUserInfos(userInfo);
                GetApiToken(userInfo);
            }   

        }catch(err){
            console.error(err);
            setLoading(false);
        }

    }

    async function GetApiToken(data: IGoogleData){

        console.group("GetApiToken");

        console.log(data);
        setLoading(false);


        if(data.email){
            await api().post('/sessions', {
                email: data.email,
                user_code: data.id,
                magic_code: 'b4t4t4'
            }).then(res =>{
                let dtAgora = new Date();

                console.log("pegou o token da api");

                setApiInfos({
                    token: res.data.token,
                    date: dtAgora
                });
                console.log("setou a api infos");
                GetUserInfos(res.data.token);

            }).catch(err =>{

                console.error(err.response.data);

                if(err.response.data.message === "Usuário não encontrado"){

                    console.log("REDIRECIONA p/ CRIAR User");
                    navigation.navigate('SignUp' as never, data as never );

                }else{
                    console.log("ERRO ao fazer GET p/ a api /sessions");
                    console.error(JSON.stringify(err.response.data));
                    setLoading(false);
                    setLoading(false);
                }

            });
        }

        console.groupEnd();
    }

    async function GetUserInfos(token: string){

        console.group("GetUserInfos");

        console.group("TOKEN");
        console.log(token);
        console.groupEnd();

        setLoading(true);
        
        await api(token).get('/users').then(res =>{

            console.log("USER INFOS:");
            console.log(res.data);

            setUserInfos({
                user_code: res.data.user_code,
                name: res.data.name,
                family_name: res.data.family_name,
                given_name: res.data.given_name,
                picture: res.data.picture,
                email: res.data.email,
                enabled: res.data.enabled,
                created_at: res.data.created_at,
                address: res.data.address, 
                configs: res.data.configs, 
                personal_infos: res.data.personal_infos
            });


            setAtendimentos(res.data.serviceType);
            setFormasPgto(res.data.paymentMethod);

            // setUserInfos(res.data);

           navigation.navigate("MainTab" as never);

            setLoading(false);

        }).catch(err =>{

            console.log("erro ao obter User Infos");

            console.error(err.response.data);

            if(err.response.data.message == "Invalid JWT token"){
                console.log("Pega o token");
            }

            setLoading(false);

        });

        console.groupEnd();

    }

    async function ValidaSessionInfos(){
        setLoading(true); 

        if(!usrState.email){
            setLoading(false);
            console.log("%cNão foi encontrado infos prévias do usuario salvas no dispositivo",'background: #222; color: #ffc400');
            return;
        }
        if(!apiState.token){
            setLoading(false);
            console.log("%cNão foi encontrado um token de api salvo previamente",'background: #222; color: #ffc400');
            return;
        }

        if( isBefore( addHours( parseISO(apiState.date), 20) , new Date() ) ){
            console.log("É depois! pega o token novo!");
            setLoading(false);
            return;
        }else{
            console.log("pega user infos e faz login!");
            GetUserInfos(apiState.token);
        }

    }

    useEffect(()=>{
        ValidaSessionInfos();
    }, []);


    // maybeCompleteAuthSession();
    // const useProxy = Constants.appOwnership === 'expo' && false;
    // const discovery: DiscoveryDocument = {
    //   authorizationEndpoint: 'https://www.facebook.com/v6.0/dialog/oauth',
    //   tokenEndpoint: 'https://graph.facebook.com/v6.0/oauth/access_token'
    // }
    // const config: AuthRequestConfig = {
    //   clientId: '813227466277127',
    //   scopes: ['public_profile'],
    //   redirectUri: makeRedirectUri({
    //     native: 'https://auth.expo.io/@mboldrini/fisioevolui',
    //     useProxy: true
    //   })
    // }
  
    // const [request, response, promptAsync] = useAuthRequest(config, discovery);
  
    // useEffect(()=>{
    //     alert(JSON.stringify(response));
    // }, [response]);



    return(
        <Container>
            <WrapLogo>
                <Photo source={require('../../../assets/logo.png')}/>
            </WrapLogo>

            { !loading &&
                <WrapInput>
                    <ButtonGoogle
                        onPress={HandleSignInWithGoogle}
                    />
                     {/* <Button title="AAA" onPress={()=> promptAsync({useProxy: true, showInRecents:true}) }/> */}
                     {/* <Text>{JSON.stringify(response)}</Text> */}
                </WrapInput>
            }
          
            { loading &&
                <LoadingIcon size="large" color="#FFFFFF"/>            
            }
        
        </Container>
    );
}

