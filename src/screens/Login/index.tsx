import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { ButtonGoogle } from '../../components/Forms/ButtonGoogle/Index';
import { useNavigation } from '@react-navigation/native';
import { 
    Container,
    WrapLogo,
    Photo,
    WrapInput,
    LoadingIcon
} from './styles';

import { useAuth } from '../../hooks/auth';

export function Login(){


    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const { user, signInWithGoogle } = useAuth();
    
    async function handleSignInWithGoogle(){
        setLoading(true);
        try{
            await signInWithGoogle();

        }catch(error){
            console.log("ERRO");
            console.log(error);
            Alert.alert('Não foi possível conectar a conta Google');
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

