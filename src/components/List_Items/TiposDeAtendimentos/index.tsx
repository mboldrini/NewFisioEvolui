import React from 'react';
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
      
        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
      });
      
    return formatter.format(preco); /* $2,500.00 */
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