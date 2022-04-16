import React, { useState, useEffect } from 'react';
import { ButtonGoogle } from '../../../components/Forms/ButtonGoogle/Index';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session';
import { StorageKeys } from '../../../global/variaveis/globais';
import { 
    Container,
    WrapLogo,
    Photo,
    WrapInput,
    LoadingIcon
} from './styles';

/// API
import { api } from '../../../global/api';
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



export function SignIn(){

    // Navegação
    const navigation = useNavigation();

    // // Redux de Usuários
    const dispatch = useDispatch();
    const { setUserInfos, setApiInfos } = bindActionCreators(actionCreators, dispatch);
    const usrState = useSelector((state: State) => state.user);// o .user é o nome usado no .index da pasta reducers
    const apiState = useSelector((state: State) => state.apiReducer);// o .user é o nome usado no .index da pasta reducers

    // Padrão do Login + Usuário
    const [loading, setLoading] = useState(false);

    const [googleUserInfos, setGoogleUserInfos] = useState<IGoogleData>({} as IGoogleData);
    const [appApiToken, setAppApiToken] = useState(null);

    async function HandleSignInWithGoogle(){

        setLoading(true);

        const CLIENT_ID = '19918590573-m2k3b72f7jq816hvu3rcucov4itvjvji.apps.googleusercontent.com';
        const REDIRECT_URL = 'https://auth.expo.io/@mboldrini/fisioevolui';
        const RESPONSE_TYPE = 'token';
        const SCOPE = encodeURI('profile email');

        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
        const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthResponse;

        if(type === 'success'){
            GetGoogleToken(params.access_token);
        }else{
            console.error("Login Cancelado!");
            alert("Login Cancelado");
            setLoading(false);
        }

    }

    async function GetGoogleToken(googleToken: string){
        try{

            const response = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${googleToken}`);
            const userInfo = await response.json();

            console.log(userInfo);
            if(userInfo.email){
                await AsyncStorage.setItem(StorageKeys.googleUserInfos, JSON.stringify(userInfo));
                console.log(`Setou no Storage o GoogleUserInfos`);
                setGoogleUserInfos(userInfo);
            }   

        }catch(err){
            alert(err);
        }finally{
            setLoading(false);
        }

    }

    async function GetApiToken(data: IGoogleData){
        console.group("GetApiToken");

        if(data.email){

            await api.post('/sessions', {
                email: data.email,
                id: data.id
            }).then(res =>{

                console.log("Token da api FisioEvolui Obtido");
                const token = res.data.token;
                setAppApiToken(token);
                GetUserInfos(token);

            }).catch(err =>{

                console.log(err.response.data);

                if(err.response.data.message === "Usuário não encontrado"){

                    console.log("REDIRECIONA p/ CRIAR User");
                    navigation.navigate('SignUp',{ userInfo });

                }else{
                    console.log("ERRO ao fazer GET p/ a api /sessions");
                    alert(JSON.stringify(err.response.data));
                    setLoading(false);
                }

            });

        }

        console.groupEnd();
    }

    async function GetUserInfos(token: string){
    //    console.group("GetUserInfos");

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        
        const bodyParameters = {
           key: "value"
        };
        
        await api.get('/users', config)
        .then(res =>{

            console.log( res.data.user );

            let userInfos = res.data.user;
            userInfos = {
                ...userInfos,
                token: token
            }


            // let dtNow = new Date().toString();

            if(userInfos.id){
                setUserInfos( userInfos );
                // setApiInfos({
                //     token: token,
                //     date: dtNow
                // });
            }

            //navigation.navigate("MainTab");

            console.warn("REDUX PARA AQUI!");
            setLoading(false);
          

        }).catch(err =>{

            console.log(err.response.data);
            setLoading(false);

        });

        // console.groupEnd();
    }

    // useEffect(()=>{
    //     async function SalvaApiTokenEPegaUserInfos(){
    //         await AsyncStorage.setItem(StorageKeys.appToken, appApiToken);
    //         // console.log("Salvou novo token no storage...");
    //         GetUserInfos(appApiToken);
    //     }
    //     if(appApiToken){
    //         SalvaApiTokenEPegaUserInfos();
    //     }
    // }, [appApiToken]); 

    useEffect(()=>{

        async function GetGoogleInfosStorage(){
            setLoading(true);

            let storageGoogleString = await AsyncStorage.getItem(StorageKeys.googleUserInfos);
            let googleInfos = JSON.parse(storageGoogleString) as IGoogleData;

            console.group("Loading - Get Google Infos Storage");
            console.log(googleInfos);
            console.groupEnd();
            
            if(googleInfos){
                GetApiToken(googleInfos);
            }else{
                setLoading(false);
            }

        }
        GetGoogleInfosStorage();

    }, []);


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
                </WrapInput>
            }
          
            { loading &&
                <LoadingIcon size="large" color="#FFFFFF"/>            
            }
        
        </Container>
    );
}

