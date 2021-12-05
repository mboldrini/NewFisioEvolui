import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import {vars} from '../../global/variaveis/variaveis';
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
        let dtString = JSON.stringify(dataAgendamento);
        let [data, hora] = dtString.split("T");
        let [ano, mes, dia] = data.split("-");
            ano = ano.replace("\"", "");
        let newData = new Date(ano, mes-1, dia);
        return(newData.getDay());
    }

    return(
        <Container tipoAtendimento={tipoAgendamento}  onPress={onPress} {...rest}>
            <WrapIcone>
                <DiaSemana>{ vars.days[validaDiaSemana(dataAgendamento)] }</DiaSemana>
                <Icone name={vars.tipoAgendamento[tipoAgendamento].icone} tipoAtendimento={tipoAgendamento}/>
            </WrapIcone>
            <WrapHora>
                <Horario>{horario}</Horario>
                <Tipo>{ vars.tipoAgendamento[tipoAgendamento].nome }</Tipo>
            </WrapHora>
            <WrapData>
                <Data>{ validaData(dataAgendamento) }</Data>
            </WrapData>
        </Container>
    )
}