import React from 'react';
import { 
    WrapInfoList,
    InfoArea,
    Description,
    InfoTexto,
    WrapIconeEdit,
    IconeItemEdit
} from './styles';
import { format } from 'date-fns';

interface IProps{
    onPress: () => void;
    data: Date,
    about: string,
    key: number
}



export function List_PacienteItens({ data, about, key, onPress}: IProps){
    return(
        <WrapInfoList key={key +"-"+ data}>
            <InfoArea>
                <Description>{ format(new Date(data), 'dd/MM/yyyy' ) }</Description>
                <InfoTexto>{ about }</InfoTexto>
            </InfoArea>
        <WrapIconeEdit onPress={onPress}>
            <IconeItemEdit name="ellipsis-v" />
            </WrapIconeEdit>
        </WrapInfoList>
    )
}