import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { days } from '../../global/variaveis/Dates';
import { tipoDeAgendamento } from '../../global/variaveis/TipoDeAgendamento';
import { parseISO } from 'date-fns';
import { 
    Container,
    WrapIcone,
    DiaSemana,
    Icone,
    WrapHora,
    Horario,
    Tipo,
    WrapData,
    Data,
} from './styles';

interface Props extends RectButtonProps{
    dataAgendamento: string;
    horario: number;
    tipoAgendamento: number;
    onPress: () => void;
}

export function AppointmentSimple({
    dataAgendamento,
    horario,
    tipoAgendamento,
    onPress,
    ...rest
}: Props){

    function validaData(dataAgendamento: string){
        let [ ano, mes, dia] = dataAgendamento.split("-");
        return( dia+"/"+ mes +"/"+ ano );
    }

    function validaDiaSemana(dataAgendamento: string){
        const date = parseISO(dataAgendamento);
        return date.getDay();
    }



    function HandleHour(hour: number){
        if( hour < 12){
            if( hour < 10){
                return "0"+ hour +":00 AM"
            }else{
                return hour +":00 AM"
            }
        }else{
                return hour +":00 PM"
        }
    }

    return(
        <Container tipoAtendimento={tipoAgendamento}  onPress={onPress} {...rest}>
            <WrapIcone>
                <DiaSemana>{ days[validaDiaSemana(dataAgendamento)] }</DiaSemana>
                <Icone name={tipoDeAgendamento[tipoAgendamento].icone} tipoAtendimento={tipoAgendamento}/>
            </WrapIcone>
            <WrapHora>
                <Horario>{ HandleHour(horario) }</Horario>
                <Tipo>{ tipoDeAgendamento[tipoAgendamento].nome }</Tipo>
            </WrapHora>
            <WrapData>
                <Data>{ validaData( dataAgendamento ) }</Data>
            </WrapData>
        </Container>
    )
}