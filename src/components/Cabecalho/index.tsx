import React, {useEffect, useState}from 'react';
import {RefreshControl} from 'react-native';
import {useNavigation } from '@react-navigation/native';
import { Text } from 'react-native';
import { 
    Container,
    Icone,
    Titulo
} from './styles';

interface Props{
    titulo: string,
    onPress: () => void;
}

export function Cabecalho({titulo, onPress}: Props){
    return(
        <Container>
            <Icone name="chevron-left"/>
            <Titulo>{titulo}</Titulo>
        </Container>
    )
}