import React from 'react';
import { Text } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';

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

interface Props extends RectButtonProps{
    companyIcon: string;
    companyName: string;
    lastConsult: string;
    personName: string;
    address: string;
    onPress: () => void;
}

export function PacienteList({
    companyIcon,
    companyName,
    lastConsult,
    personName,
    address,
    onPress,
    ...rest
}: Props){
    return(
        <Container onPress={onPress} {...rest}>
            <Header>
                <Company><Icone name={companyIcon}/> {companyName}</Company>
                <LastDate><Icone name="calendar"/> {lastConsult}</LastDate>
            </Header>
            <PersonWrap>
                <PersonName>{personName}</PersonName>
            </PersonWrap>
            <AddressWrap>
                <Address numberOfLines={1} ellipsizeMode="tail" ><Icone name="map-pin"/> {address}</Address>
            </AddressWrap>
        </Container>
    )
}

