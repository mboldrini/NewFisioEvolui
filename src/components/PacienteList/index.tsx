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
    companyIcon: string;
    companyName: string;
    lastConsult: string;
    personName: string;
    address: string;
}

export function PacienteList({
    companyIcon,
    companyName,
    lastConsult,
    personName,
    address
}: Props){
    return(
        <Container>
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

