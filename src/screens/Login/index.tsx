import React, { useState, useEffect } from 'react';
//import { Alert } from 'react-native';
import { ButtonGoogle } from '../../components/Forms/ButtonGoogle/Index';
import { useNavigation } from '@react-navigation/native';
import * as AuthSession from 'expo-auth-session';
import { 
    Container,
    WrapLogo,
    Photo,
    WrapInput,
    LoadingIcon
} from './styles';
import { Text } from 'react-native';

// type AuthResponse = {
//     type: string;
//     params: {
//         access_token: string;
//     }
// }

import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '../../state';

export function Login(){


    const dispatch = useDispatch();
    const { setUserInfos } = bindActionCreators(actionCreators, dispatch);
    const usrState = useSelector((state: State) => state.user);

    useEffect(()=>{
        console.log(`UsrState: ${JSON.stringify(usrState)}`);
    },[usrState]);

    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(null);
    //const [userInfos, setUserInfos] = useState(null);

    const navigation = useNavigation();

    async function newhandleSignInWithGoogle(){

        // setUserInfos("batata");

        // navigation.navigate('MainTab');

        setLoading(true);

        const CLIENT_ID = '19918590573-m2k3b72f7jq816hvu3rcucov4itvjvji.apps.googleusercontent.com';
        const REDIRECT_URL = 'https://auth.expo.io/@mboldrini/fisioevolui';
        const RESPONSE_TYPE = 'token';
        const SCOPE = encodeURI('profile email');

        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
        const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthResponse;

        if(type === 'success'){
            console.log("SUCESSO!");
            //loadProfile(params.access_token);
            setToken(params.access_token);
        }else{
            alert("erro");
        }
    }

    async function loadProfile(tkn: string){
        console.log("vai pegar os parametrros via token");
        const response = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${token}`);
        const userInfo = await response.json();
        console.log(userInfo);

      //  setUserInfos(userInfo);

        setLoading(false);
    }

    useEffect(()=>{
        if(token != null){
            loadProfile(token);
        }
    }, [token]);

    return(
        <Container>
            <WrapLogo>
                <Photo source={require('../../assets/logo.png')}/>
            </WrapLogo>

            { !loading &&
                <WrapInput>
                    <ButtonGoogle
                        onPress={newhandleSignInWithGoogle}
                    />
                </WrapInput>
            }
          
            {/* { userInfos &&
                <Text>Olá {userInfos.name}</Text>
            } */}

            
            { loading &&
                <LoadingIcon size="large" color="#FFFFFF"/>            
            }
        
        </Container>
    );
}

