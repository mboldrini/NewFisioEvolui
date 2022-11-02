import React from 'react';
import { statusAtendimento, statusType } from '../../global/variaveis/globais';
import { parseISO, format, isBefore, isSameHour, differenceInHours } from 'date-fns';
import {useNavigation } from '@react-navigation/native';
import {
    Container,
    Header,
    Icone,
    IconeDuration,
    Nome,
    Footer,
    HoraWrapper,
    Horario,
    StatusWrapper,
    Status,
    TypeWrapper,
    Type
} from './styles';

interface Props{
    client_name: string,
    date_scheduled: Date,
    duration: string,
    end_hour: string,
    start_hour: string,
    status: number,
    type: number,
    onPress: () => void
}


export function AgendaItem( {client_name, date_scheduled, duration, end_hour, start_hour, status, type, onPress}: Props ){

    const navigation = useNavigation();

    function horarioPassou(data: Date, start_hour: string){

        const [hora, minuto] = start_hour.split(":");
        // const [ano, mes, dia] = data.split("-");

        let today = new Date();
        let receivedDate = new Date(data);
        receivedDate.setHours(parseInt(hora));
        receivedDate.setMinutes(parseInt(minuto));

        if( isSameHour(receivedDate, today) == true){
            return 2;// Mesma mora = Amarelo
        }else if( isBefore(receivedDate, today) == true ){
            return 1;// Data Antes = Cinza
        }else{
            return 0;// Azul = Ainda ta vindo
        }

    }

    function iconeHorario(data: Date, start_hour: string){

       let horaAgendada = horarioPassou(data, start_hour);

        if(horaAgendada  == 0){
            return "clock";
        }else if(horaAgendada == 1){
            return "history";
        }else{
            return "stopwatch";
        }

    }

    function horaAgendada(hour: string){
        const [hora, minuto, segundo] = hour.split(":");
        return hora +":"+ minuto;
    }

    function Duracao(duration: string){
        const [hora, minuto, segundo] = duration.split(":");
        if(parseInt(hora) == 0){
            return minuto +"min"
        }else{
            return hora +":"+ minuto +"H"
        }
    }

    return(
        <Container status={status} onPress={onPress}>
            <Header>
                <HoraWrapper horaPassou={ horarioPassou(date_scheduled, start_hour) }>
                    <Icone name={ iconeHorario(date_scheduled, start_hour) } horaPassou={ horarioPassou(date_scheduled, start_hour) }/> 
                    <Horario horaPassou={ horarioPassou(date_scheduled, start_hour) }>{ horaAgendada(start_hour) } até { horaAgendada(end_hour) } - <IconeDuration name="clock"/> {Duracao(duration)}</Horario>
                </HoraWrapper>
            </Header>
            <Nome>{ client_name }</Nome>
            <Footer>
                <StatusWrapper status={status}>
                    { status !== 0 && 
                        <Status status={status}>{ statusAtendimento[status] }</Status> 
                    }
                </StatusWrapper> 
                { type != 3 &&
                    <TypeWrapper status={type}>
                        <Type status={type}>{ statusType[type] }</Type> 
                    </TypeWrapper> 
                }
                { type == 3 &&
                <>
                    <TypeWrapper status={1}>
                        <Type status={1}>{ statusType[1] }</Type> 
                    </TypeWrapper> 
                    <TypeWrapper status={2}>
                        <Type status={2}>{ statusType[2] }</Type> 
                    </TypeWrapper> 
                </>
                }
               
            </Footer>
        </Container>
    )
}

