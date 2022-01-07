import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { date } from 'yup';
import {days, tipoDeAgendamento} from '../../global/variaveis/globais';
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
    dataAgendamento: Date;
    horario: string;
    tipoAgendamento: number;
    onPress: () => void;
}

export function PacienteAgendamento({
    dataAgendamento,
    horario,
    tipoAgendamento,
    onPress,
    ...rest
}: Props){

    function validaData(dataAgendamento: Date){

        let dtString = JSON.stringify(dataAgendamento);
        let [data, hora] = dtString.split("T");
        let [ano, mes, dia] = data.split("-");
            ano = ano.replace("\"", "");

        return( dia+"/"+ mes +"/"+ ano );
    }

    function validaDiaSemana(dataAgendamento: Date){
        // let dtString = JSON.stringify(dataAgendamento);
        // let [data, hora] = dtString.split("T");
        // data = data.replace("\"", "").replace("\"", "");
        // let [dia, mes, ano] = data.split("/");
        // let newData = new Date(parseInt(ano), parseInt(mes)-1, parseInt(dia) ); 
        // let diaSemana = newData.getDay();
        let dt = new Date(dataAgendamento);
        return(dt.getDay());
    }

    return(
        <Container tipoAtendimento={tipoAgendamento}  onPress={onPress} {...rest}>
            <WrapIcone>
                <DiaSemana>{ days[validaDiaSemana(dataAgendamento)] }</DiaSemana>
                <Icone name={tipoDeAgendamento[tipoAgendamento].icone} tipoAtendimento={tipoAgendamento}/>
            </WrapIcone>
            <WrapHora>
                <Horario>{horario}</Horario>
                <Tipo>{ tipoDeAgendamento[tipoAgendamento].nome }</Tipo>
            </WrapHora>
            <WrapData>
                <Data>{ validaData( dataAgendamento ) }</Data>
            </WrapData>
        </Container>
    )
}