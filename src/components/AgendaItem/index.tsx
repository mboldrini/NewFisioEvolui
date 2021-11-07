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
    status: number;
    horarioAgendado: string;
    tipo: string;
    iconeTipo: string;
    dataSelecionada: Date;
    dataHoje: Date;
}

export function AgendaItem({status, horarioAgendado, tipo, iconeTipo, dataSelecionada}: Props){
    
    let dataHoje = new Date();

    function horarioPassou(){

        if( dataHoje.toDateString() === dataSelecionada.toDateString()){
     
            let horaAgendada = parseInt(horarioAgendado.split(":")[0] );

            if( horaAgendada < dataHoje.getHours() ){
                return 1;
            }else if(horaAgendada == dataHoje.getHours()){
                return 2;
            }else{
                return 0;
            }

        }else if(dataSelecionada < dataHoje){
            return 1;
        }else if(dataSelecionada > dataHoje ){
            return 0;
        }

    }

    function iconeHorario(){

        let horaAgendada = horarioPassou();

        if(horaAgendada  == 0){
            return "clock";
        }else if(horaAgendada == 1){
            return "history";
        }else{
            return "stopwatch";
        }

    }

    return(
        <Container status={status}>
           <Header>
               <IconeTipo name={iconeTipo}/>
               <Tipo>{tipo}</Tipo>
           </Header>
           <Nome>Aroldo Arão</Nome>
           <Footer>
                <HoraWrapper horaPassou={ horarioPassou() }>
                    <Icone name={ iconeHorario() }/>
                    <Horario>{horarioAgendado}</Horario>
                </HoraWrapper>
                <StatusWrapper status={status}>
                    { status !== 0 && 
                        <Status status={status}>{ variaveis.status[status] }</Status> 
                    }
                </StatusWrapper>
           </Footer>
        </Container>
    )
}

