import React from 'react';
import { statusAtendimento } from '../../global/variaveis/variaveis';
import { parseISO, format, isBefore, isSameHour } from 'date-fns';

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
    status: number;
    dataHora: string;
    tipo: string;
}

const icones = {
    Particular: 'money-bill-wave',
    plano: 'hospital'
}


export function AgendaItem({status, dataHora, tipo}: Props){
    
    function horarioPassou(dataHora: string){

        let today = new Date();
        let receivedDate = parseISO(dataHora);

        if( isSameHour(receivedDate, today) == true){
            return 2;// Mesma mora = Amarelo
        }else if( isBefore(receivedDate, today) == true ){
            return 1;// Data Antes = Cinza
        }else{
            return 0;// Azul = Ainda ta vindo
        }

    }

    function iconeHorario(dataHora: string){

       let horaAgendada = horarioPassou(dataHora);

        if(horaAgendada  == 0){
            return "clock";
        }else if(horaAgendada == 1){
            return "history";
        }else{
            return "stopwatch";
        }

    }

    function horaAgendada(dataHora: string){
        return format(parseISO(dataHora), 'HH:mm'); 
    }

    return(
        <Container status={status}>
           <Header>
               <IconeTipo name={ icones[tipo] }/>
               <Tipo>{tipo}</Tipo>
           </Header>
           <Nome>Aroldo Arão</Nome>
           <Footer>
                <HoraWrapper horaPassou={ horarioPassou(dataHora) }>
                    <Icone name={ iconeHorario(dataHora) }/>
                    <Horario horaPassou={ horarioPassou(dataHora) }>{horaAgendada(dataHora)}</Horario>
                </HoraWrapper>
                <StatusWrapper status={status}>
                    { status !== 0 && 
                        <Status status={status}>{ statusAtendimento[status] }</Status> 
                    }
                </StatusWrapper>
           </Footer>
        </Container>
    )
}

