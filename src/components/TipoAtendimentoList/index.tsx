import React from 'react';
import { 
    TipoAtendList,
    WrapConteudo,
    WrapPreco,
    MoneyIcon,
    Preco,
    WrapNome,
    Nome,
    WrapButton,
    EditButton,
} from './styles';

interface IProps{
    onPress: () => void;
    valor: number,
    nome: string,
}

export function TipoAtendimentoList({ onPress, nome, valor }: IProps){
    return(
        <TipoAtendList>

            <WrapConteudo>
                <WrapPreco>
                    <MoneyIcon name="money-bill-wave"/>
                    <Preco>{ valor }</Preco>
                </WrapPreco>

                <WrapNome>
                    <Nome numberOfLines={1} ellipsizeMode="tail">{ nome }</Nome>
                </WrapNome>
            </WrapConteudo>

            <WrapButton onPress={onPress}>
                <EditButton name="ellipsis-v"/>
            </WrapButton>

        </TipoAtendList>

    )
}