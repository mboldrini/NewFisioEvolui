import React, { useEffect} from 'react';

import { 
    Container,
    LoadingIcon,
    Texto,
    Photo
} from './styles';

export function Loading(){

    useEffect(()=>{
        console.log("TELA INICIAL");
    },[]);


    return(
        <Container>
            <Photo source={require('../../assets/logo.png')}/>
            <LoadingIcon size="large" color="#FFFFFF"/>
            <Texto>Carregando informações iniciais</Texto>
        </Container>
    );
}
