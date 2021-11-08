import React from 'react';
import { Text } from 'react-native';

import {
    Container,
    Icone,
    Header,
    Company,
    LastDate,
    PersonWrap,
    PersonName,
    AddressWrap,
    Address
} from './styles';

interface Props{
    id: number;
    companyIcon: string;
    companyName: string;
    lastConsult: string;
    personName: string;
    address: string;
    onPress: () => void;
}

export function PacienteList({
    id,
    companyIcon,
    companyName,
    lastConsult,
    personName,
    address,
    onPress
}: Props){
    return(
        <Container onPress={onPress}>
            <Header>
                <Company><Icone name={companyIcon}/> {companyName}</Company>
                <LastDate><Icone name="calendar"/> {lastConsult}</LastDate>
            </Header>
            <PersonWrap>
                <PersonName>{personName}</PersonName>
            </PersonWrap>
            <AddressWrap>
                <Address><Icone name="map-pin"/> {address}</Address>
            </AddressWrap>
        </Container>
    )
}

