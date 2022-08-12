import React, {useEffect, useState}from 'react';
import {RefreshControl} from 'react-native';
import {useNavigation } from '@react-navigation/native';
import { Text } from 'react-native';
import { 
    Container,
    Picture,
    InfosWrapper,
    IconeTipo,
    Tipo,
    Nome
} from './styles';

interface Props{
    iconeTipo?: string;
    tipo?: string;
    nome: string;
}

export function PacienteHeader({iconeTipo, tipo, nome}: Props){
    return(
        <Container>
            <Picture name="user" />

            <InfosWrapper>
                { tipo && <Tipo><IconeTipo name={iconeTipo}/> {tipo}</Tipo> }
                <Nome>{nome}</Nome>
            </InfosWrapper>
         
        </Container>
    )
}