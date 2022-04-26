import React from 'react';
import { statusAtendimento } from '../../global/variaveis/globais';
import { parseISO, format, isBefore, isSameHour, differenceInHours } from 'date-fns';
import {useNavigation } from '@react-navigation/native';
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
    dataHora: string,
    tipo: string,
    status: number,
    paciente_nome: string
}


export function AgendaItem( {  dataHora, tipo, status, paciente_nome}: Props ){

    const navigation = useNavigation();

    function horarioPassou(dataHora: string){

        const [data, hora] = dataHora.split("T");
        const [ano, mes, dia] = data.split("-");

        let today = new Date();
        let receivedDate = new Date(parseInt(ano), parseInt(mes)-1, parseInt(dia), parseInt(hora) );

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

        const [data, hora] = dataHora.split("T");
        const [ano, mes, dia] = data.split("-");
        let receivedDate = new Date(parseInt(ano), parseInt(mes), parseInt(dia), parseInt(hora) );

        return format(receivedDate, "HH:mm");
    }

    return(
        <Container status={status}>
           <Header>
               <IconeTipo name="hospital"/>
               <Tipo>{tipo}</Tipo>
           </Header>
           <Nome>{ paciente_nome }</Nome>
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

