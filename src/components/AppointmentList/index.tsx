import React from 'react';
import { AppointmentIcons } from '../../global/variaveis/IconTypes';

import {
    Container,
    WrapInfos,
    WrapHours,
    HourIcon,
    Hour,
    WrapDate,
    WeekDay,
    Day,
    Date,
    WrapButton,
    EditButton,
} from './styles';

interface Props{
    status: number;
}

export function AppointmentList({status}: Props){
    
   
    return(
        <Container status={status}>
            <WrapInfos>
                <WrapHours>
                    <HourIcon name={ AppointmentIcons[status] } status={status}/>
                    <Hour>08:00 as 08:50</Hour>
                </WrapHours>
                <WrapDate>
                    <WeekDay>Sexta</WeekDay>
                    <Day> dia </Day>
                    <Date>19/03/2022</Date>
                </WrapDate>
            </WrapInfos>
            <WrapButton>
                <EditButton name="ellipsis-v" />
            </WrapButton>
        </Container>
    )
}

