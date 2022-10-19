import React, { useEffect } from 'react';
import { View, Animated, Easing, Dimensions, StyleSheet } from 'react-native';

import {
    Container,
    Icone,
    Header,
    Company,
    PersonWrap,
    PersonName,
    AddressWrap,
    Address,
} from './styles';

import { LinearGradient } from 'expo-linear-gradient';


export function ShimmerPacienteList(){


    return(
        <Container>

            <Header>
                <Icone />
                <Company />
            </Header>

            <PersonWrap>
                <PersonName />
            </PersonWrap>

            <AddressWrap>
                <Icone />
                <Address  />
            </AddressWrap>

        </Container>
    )
}

