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
    timestamp: number,
    onPress: () => void;
}

export function AppointmentList({status, timestamp, type, onPress}: Props){

    function GetStartHour(stamp: number){
        let date = new Date(stamp);

        return date.getHours() +":"+ date.getMinutes();
    }

    function GetEndHour(stamp: number){
        // let date = new Date(stamp);
        return "99:99";
    }

    console.log(`Type: ${type}`);

    return(
        <Container status={status}>
             <WrapInfos>
                <WrapDate>
                     <WeekDay>{ daysLong[getDay( new Date(timestamp) )] }</WeekDay>
                     <Day> dia </Day>
                     <DateStr>{ format( new Date(timestamp), 'dd/M/yyyy') } </DateStr>
                 </WrapDate>

                 <WrapHours>
                     <HourIcon name={ AppointmentIcons[type] } status={type}/>
                     <Hour>{ GetStartHour(timestamp) } as { GetEndHour(timestamp)}</Hour>
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

