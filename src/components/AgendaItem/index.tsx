import React from 'react';
import variaveis from '../../global/variaveis/variaveis';

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
    idStatus: number;
    horaPassou: boolean;
    horario: string;
    tipo: string;
    iconeTipo: string
}

export function AgendaItem({idStatus, horaPassou, horario, tipo, iconeTipo}: Props){
    return(
        <Container idStatus={idStatus}>
           <Header>
               <IconeTipo name={iconeTipo}/>
               <Tipo>{tipo}</Tipo>
           </Header>
           <Nome>Aroldo Arão</Nome>
           <Footer>
                <HoraWrapper horaPassou={horaPassou}>
                    <Icone name="clock"/>
                    <Horario>{horario}</Horario>
                </HoraWrapper>
                <StatusWrapper idStatus={idStatus}>
                    { idStatus !== 0 && 
                        <Status idStatus={idStatus}>{ variaveis.status[idStatus] }</Status> 
                    }
                </StatusWrapper>
           </Footer>
        </Container>
    )
}

