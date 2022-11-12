import React from "react";
import { Button } from "../../Buttons/Button/Index";
import { format } from 'date-fns';

import {
   WrapInfo,
   Icone,
   InfoArea,
   Spacer,
   Description,
   Info
} from './styles';

interface IProps{
    icone: string;
    title: string;
    info: string | number;
}

export function WrapInfosProfile({ icone, title, info }: IProps){
    return(
        <>
            <WrapInfo>
                <Icone name={icone}/>
                <InfoArea>
                    <Description>{title}</Description>
                    <Info>{ info }</Info> 
                </InfoArea>
            </WrapInfo> 
            <Spacer/>
        </>
    )
}

