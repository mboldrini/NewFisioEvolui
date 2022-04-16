import React, { useState, useEffect } from 'react';
import { ButtonGoogle } from '../../../components/Forms/ButtonGoogle/Index';
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
        }finally{
            setLoading(false);
        }

    }

    async function GetApiToken(data: IGoogleData){
        if(data.email){
            await api.post('/sessions', {
                email: data.email,
                id: data.id
            }).then(res =>{

                let dtAgora = new Date();

                setApiInfos({
                    token: res.data.token,
                    date: dtAgora
                });
                GetUserInfos(res.data.token);

            }).catch(err =>{

                console.error(err.response.data);

                if(err.response.data.message === "Usuário não encontrado"){

                    console.log("REDIRECIONA p/ CRIAR User");
                    navigation.navigate('SignUp',{ userInfo });

                }else{
                    console.log("ERRO ao fazer GET p/ a api /sessions");
                    console.error(JSON.stringify(err.response.data));
                    setLoading(false);
                }

            });
        }
    }

    async function GetUserInfos(token: string){

        const config = { headers: { Authorization: `Bearer ${token}` } };
        
        await api.get('/users', config)
        .then(res =>{

            let userInfos = res.data.user;
            userInfos = {
                ...userInfos,
                token: token
            }

            if(userInfos.id){
                setUserInfos( userInfos );
            }

            navigation.navigate("MainTab");

            setLoading(false);

        }).catch(err =>{

            console.error(err.response.data);
            setLoading(false);

        });

    }


    useEffect(()=>{

        async function ValidaSessionInfos(){
            setLoading(true); 

            if(!usrState.email){
                setLoading(false);
                console.warn("Não foi encontrado infos prévias do usuario salvas no dispositivo");
            }
            if(!apiState.token){
                setLoading(false);
                console.warn("Não foi encontrado um token de api salvo previamente");
            }
    
            if( isBefore( addHours( parseISO(apiState.date), 20) , new Date() ) ){
                // console.info("É depois! pega o token novo!");
                setLoading(false);
            }else{
                // console.info("pega user infos e faz login!");
                GetUserInfos(apiState.token);
            }
    
        }
        ValidaSessionInfos();

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

