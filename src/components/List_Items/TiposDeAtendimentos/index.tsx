import React from 'react';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import { 
    TipoPagamentoList,
    WrapText,
    NomeTipoPagamento,

    WrapIcone,
    Icone,
    
    WrapContent,
    WrapInfos,
    IconeMinus,
    Title,
    ImageIcon,
    WrapInfosGroup,
} from './styles';


interface IProps{
    duracao: string,
    preco: number,
    nome: string,
    id: number,
    onPress: () => void;
}

function ValidaTempo(tempo: string){
    const [horas, minutos, segundos] = tempo.split(":");
    if( parseInt(horas) == 0 ){
        return minutos +" Minutos"; 
    }else{
        if( parseInt(horas) > 1){
            return horas +":"+ minutos +" Horas";
        }
        return horas +":"+ minutos +" Hora";
    }
}


function FormatarPreco(preco: number){

    var formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
      
    return formatter.format(preco);
}

export function List_TipoAtendimento({ duracao, preco, nome, id, onPress}: IProps){
    return(
        <TipoPagamentoList>

            <WrapContent>

                <WrapInfos>
            
                    <WrapInfosGroup>
                        <ImageIcon source={require('../../../assets/stopwatch.png')}/>
                        <Title>{ ValidaTempo(duracao) }</Title>
                    </WrapInfosGroup>

                    <IconeMinus name="minus"/> 

                    <WrapInfosGroup>
                        <ImageIcon source={require('../../../assets/money.png')}/>
                        <Title>{ FormatarPreco(preco) }</Title>
                    </WrapInfosGroup>

                </WrapInfos>

                <WrapText>
                    <NomeTipoPagamento numberOfLines={1} ellipsizeMode="tail">{ nome }</NomeTipoPagamento>
                </WrapText>

            </WrapContent>

            <WrapIcone onPress={onPress} >
                <Icone name="ellipsis-v"/>
            </WrapIcone>

        </TipoPagamentoList>
                      
    )
}