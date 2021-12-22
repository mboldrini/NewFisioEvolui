import React from 'react';
import { ButtonGoogle } from '../../components/Forms/ButtonGoogle/Index';
import {useNavigation} from '@react-navigation/native';
import { 
    Container,
    WrapLogo,
    Photo,
    WrapInput,
} from './styles';


export function Login(){

    const navigation = useNavigation();

    function handleLogin(){
        navigation.reset({
            routes:[{name:'MainTab'}]
        });
    }

    return(
        <Container>
            <WrapLogo>
                <Photo source={require('../../assets/logo.png')}/>
            </WrapLogo>

            <WrapInput>
                <ButtonGoogle
                    onPress={()=>{handleLogin()}}
                />
            </WrapInput>
            
            {/* <LoadingIcon size="large" color="#FFFFFF"/> */}
        
        </Container>
    );
}

