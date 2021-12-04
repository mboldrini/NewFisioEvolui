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
    DataLimite,
} from './styles';

interface Props extends RectButtonProps{
    diaSemana: number;
    dataAgendamento: string;
    horario: string;
    tipoAgendamento: number;
    dataLimite?: string;
    onPress: () => void;
}

export function PacienteAgendamento({
    diaSemana,
    dataAgendamento,
    horario,
    tipoAgendamento,
    dataLimite,
    onPress,
    ...rest
}: Props){
    return(
        <Container tipoAtendimento={tipoAgendamento}  onPress={onPress} {...rest}>
            <WrapIcone>
                <DiaSemana>{ vars.days[diaSemana] }</DiaSemana>
                <Icone name={vars.tipoAgendamento[tipoAgendamento].icone} tipoAtendimento={tipoAgendamento}/>
            </WrapIcone>
            <WrapHora>
                <Horario>{horario}</Horario>
                <Tipo>{ vars.tipoAgendamento[tipoAgendamento].nome }</Tipo>
            </WrapHora>
            <WrapData>
                <Data>{dataAgendamento}</Data>
            </WrapData>
        </Container>
    )
}