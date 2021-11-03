import React from 'react';
import { Text } from 'react-native';

import {
    Container,
    Header,
    IconeTipo,
    Icone,
    Tipo,
    Nome,
    Footer,
    HoraWrapper,
    Horario,
    StatusWrapper,
    Status
} from './styles';

interface Props{
    idStatus: string;
    status: string;
}

export function AgendaItem({idStatus, status}: Props){
    return(
        <Container>
           <Header>
               <IconeTipo name="money-bill-wave"/>
               <Tipo>Particular</Tipo>
           </Header>
           <Nome>Aroldo Arão</Nome>
           <Footer>
                <HoraWrapper>
                    <Icone name="clock"/>
                    <Horario>07:00</Horario>
                </HoraWrapper>
                <StatusWrapper idStatus={idStatus}>
                    <Status idStatus={idStatus}>{status}</Status>
                </StatusWrapper>
           </Footer>
        </Container>
    )
}

