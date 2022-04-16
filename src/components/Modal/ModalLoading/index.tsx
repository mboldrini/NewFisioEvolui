import { FontAwesome5 } from '@expo/vector-icons';
import { Text } from 'react-native';
import React, { useEffect, useState } from 'react';

import LottieView from 'lottie-react-native';

import {
    Container,
    Mensagem,
} from './styles';


// Received Props on This Modal
interface Props{
    isOpen: boolean;
    mensagem?: string;
}


export function ModalLoading({ isOpen, mensagem = "Carregando Informações..." }: Props){
    return(
        <Container>
            <LottieView
                source={require('../../../assets/loadingAnimado250.json')}
                autoSize
                autoPlay
                loop
                resizeMode='contain'
            />
            <Mensagem>{ mensagem }</Mensagem>
        </Container>
    )
}