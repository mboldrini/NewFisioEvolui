import React from 'react';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import { 
    TipoPagamentoList,
    WrapText,
    NomeTipoPagamento,
    Descricao,

    WrapIcone,
    Icone
} from './styles';


interface IProps{
    onPress: () => void;
    paymentMethod_name: string;
    description?: string;
}




export function List_TipoPagamento({ paymentMethod_name, description, onPress}: IProps){
    return(
        <TipoPagamentoList>
            <WrapText>
                <NomeTipoPagamento numberOfLines={1} ellipsizeMode="tail">{ paymentMethod_name }</NomeTipoPagamento>
                { description && 
                    <Descricao numberOfLines={1} ellipsizeMode="tail" >{ description }</Descricao> 
                }
                { !description && 
                    <Descricao numberOfLines={1} ellipsizeMode="tail" >item sem descrição cadastrada</Descricao> 
                }
            </WrapText>

            <WrapIcone onPress={ onPress  }>
                <Icone name="ellipsis-v"/>
            </WrapIcone>

        </TipoPagamentoList>
    )
}