import * as React from 'react';
import { AppointmentIcons } from '../../global/variaveis/IconTypes';
import {addHours, addMinutes, format, parseISO, setHours, setMinutes, getDay} from 'date-fns';
import { daysLong, months } from '../../global/variaveis/Dates';
import {
    Container,
    WrapInfos,
    WrapHours,
    HourIcon,
    Hour,
    WrapDate,
    WeekDay,
    Day,
    DateStr,
    WrapButton,
    EditButton,
    EvaluationIcon,
    Traco,
    Type
} from './styles';

interface Props{
    type: number;
    status: number;
    date_scheduled: string,
    start_hour: string;
    end_hour: string;
    onPress: () => void;
}

export function AppointmentList({status, date_scheduled, start_hour, end_hour, type, onPress}: Props){

    function GetShortHour(stamp: string){
        const [hora, minuto, segundo] = stamp.split(":");
        return hora +":"+ minuto;
    }

    console.log(`Type: ${type}`);

    return(
        <Container status={status}>
             <WrapInfos>
                <WrapDate>
                     <WeekDay>{ daysLong[getDay( new Date(date_scheduled) )] }</WeekDay>
                     <Day> dia </Day>
                     <DateStr>{ format( new Date(date_scheduled), 'dd/MM/yyyy') } </DateStr>
                 </WrapDate>

                 <WrapHours>
                     <HourIcon name={ AppointmentIcons[type] } status={type}/>
                     <Hour>{ GetShortHour(start_hour) } até { GetShortHour(end_hour)}</Hour>
                     { type == 1 &&
                        <>
                            <Traco> - </Traco>
                            <EvaluationIcon name="notes-medical" />
                            <Type>Avaliação</Type>
                        </>
                     }
                 </WrapHours>
             </WrapInfos>
             <WrapButton onPress={onPress}>
                 <EditButton name="ellipsis-v"/>
             </WrapButton>
        </Container>
    )
}

