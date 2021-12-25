import React, { useState } from 'react';
import { ButtonGoogle } from '../../components/Forms/ButtonGoogle/Index';
import {useNavigation} from '@react-navigation/native';
import { 
    Container,
    WrapLogo,
    Photo,
    WrapInput,
    LoadingIcon
} from './styles';

import * as Google from 'expo-google-app-auth';

export function Login(){

    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    async function signInWithGoogle(){
        try{
            setLoading(true);

            const result = await Google.logInAsync({
                androidClientId: '19918590573-iegpvh191l2qeoc24i9nvf0jbii6dpk6.apps.googleusercontent.com',
                scopes: ['profile', 'email']
            });

            if(result.type === 'success'){
                const userLogged = {
                    id: String(result.user.id),
                    email: result.user.email,
                    name: result.user.name!,
                    photo: result.user.photoUrl!,
                }

                alert(JSON.stringify(userLogged));

            }

            setLoading(false);

        }catch(error){
            throw(`Erro: ${error}`);
        }finally{
            setLoading(false);
        }
    }

    async function handleLogin(){
        try{
            await signInWithGoogle();
        }catch(e){
            alert(e);
        }finally{
            setLoading(false);
        }
    }

    return(
        <Container>
            <WrapLogo>
                <Photo source={require('../../assets/logo.png')}/>
            </WrapLogo>

            { !loading &&
                <WrapInput>
                    <ButtonGoogle
                        onPress={()=>{signInWithGoogle()}}
                    />
                </WrapInput>
            }
          
            
            { loading &&
                <LoadingIcon size="large" color="#FFFFFF"/>            
            }
        
        </Container>
    );
}

