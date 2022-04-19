import { FontAwesome5 } from '@expo/vector-icons';
import { Text, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';

import LottieView from 'lottie-react-native';

import {
    Container,
    Mensagem,
} from './styles';


// Received Props on This Modal
interface Props{
    visible: boolean;
    mensagem?: string;
    tipo: "erro" | "loading" | "info";
}


export function ModalLoading({ visible, mensagem = "Carregando Informações..." }: Props){
    return(
        <Modal visible={visible} style={{marginTop: 150, backgroundColor: '#00ff'}}>
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
        </Modal>
    )
}