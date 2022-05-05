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
    status: number;
    type: number;
    hour: number;
    date: any;
    onPress: () => void;
}

export function AppointmentList({status, hour, date, type, onPress}: Props){

    function FormatStartHour(startHour: number){
        let today = new Date();
        today = setMinutes(today, 0);
        today = setHours(today, startHour);
        return format(today, 'HH:mm'); 
    }

    function FormatEndHour(endHour: number = 50){
        let today = new Date();
        today = setMinutes(today, 0);
        today = setHours(today, hour);
        today = addMinutes(today, endHour);
        return format(today, 'HH:mm'); 
    }

    function FormatDate(dateCalendar: string){
        let [year,month, day] = dateCalendar.split("-");
        return day +"/"+ months[parseInt(month)-1] +"/"+ year;
    }

    console.log(`Type: ${type}`);

    return(
        <Container status={status}>
             <WrapInfos>
                <WrapDate>
                     <WeekDay>{ daysLong[getDay( parseISO(date))] }</WeekDay>
                     <Day> dia </Day>
                     <DateStr>{ FormatDate(date) }</DateStr>
                 </WrapDate>

                 <WrapHours>
                     <HourIcon name={ AppointmentIcons[type] } status={type}/>
                     <Hour>{FormatStartHour(hour)} as {FormatEndHour()}</Hour>
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

