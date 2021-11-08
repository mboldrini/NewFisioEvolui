import React from 'react';
import { Text } from 'react-native';
import { Cabecalho } from '../Cabecalho';
import variaveis from '../../global/variaveis/variaveis';
import { 
    Container,
    WraperData,
    Icone,
    DiaSemana,
    DiaMes,
    WraperInfos,
    Horario,
    Limite,
    LimiteBold
} from './styles';

interface TipoAgendamento{
    icone: ['hospital', 'ice-cream', 'wordpress'];
    tipo: ['Recorrente', 'Único', 'Avaliação']
}

interface Props{
    diaSemana: number;
    dataMes: string;
    horario: string;
    tipoAgendamento: number;
    dataLimite?: string;
}

export function PacienteAgendamento({
    diaSemana,
    dataMes,
    horario,
    tipoAgendamento,
    dataLimite
}: Props){
    return(
        <Container>
            <WraperData tipoAtendimento={tipoAgendamento}>
                <DiaSemana tipoAtendimento={tipoAgendamento}>{ variaveis.datas.days[diaSemana] }</DiaSemana>
                <Icone name={variaveis.tipoAgendamento[tipoAgendamento].icone} tipoAtendimento={tipoAgendamento}/>
                <DiaMes tipoAtendimento={tipoAgendamento}>{dataMes}</DiaMes>
            </WraperData>
            <WraperInfos>
                <Horario><LimiteBold>{horario}</LimiteBold> - { variaveis.tipoAgendamento[tipoAgendamento].nome }</Horario>
                <Limite>Data Limite: { dataLimite ? <Limite>31/02/2033</Limite> : <Limite>Não</Limite> }</Limite>
            </WraperInfos>
        </Container>
    )
}