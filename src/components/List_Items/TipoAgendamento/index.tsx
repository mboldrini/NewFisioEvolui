import React from 'react';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import { tiposDeAtendimentos } from '../../../global/variaveis/globais';
import { 
    WrapGeral,
    TipoPagamentoList,
    WrapText,
    NomeTipoPagamento,
    WrapIcone,
    Icone
} from './styles';


interface IProps{
    onPress: () => void;
    id: number;
}

export function List_TipoAgendamento({ id, onPress}: IProps){
    return(

        <WrapGeral onPress={ onPress  }>
        <TipoPagamentoList tipo={id} >
            <WrapText>
                <NomeTipoPagamento numberOfLines={1} ellipsizeMode="tail">{ tiposDeAtendimentos[id].title }</NomeTipoPagamento>
            </WrapText>

            <WrapIcone>
                <Icone name="chevron-right"/>
            </WrapIcone>
        </TipoPagamentoList>
        </WrapGeral>
    )
}