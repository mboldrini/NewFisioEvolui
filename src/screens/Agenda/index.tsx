import React, {useEffect, useState}from 'react';
import { FlatList } from 'react-native';
import {RefreshControl} from 'react-native';
import {useNavigation } from '@react-navigation/native';
import { months, days, daysLong} from '../../global/variaveis/variaveis';
import { ITipoAgendamento } from '../../global/interfaces';
import { 
    Container,
    Header,
    Titulo,
    DateWrapper,
    Today,
    SelectDateWrapper,
    IconeChangeMonth,
    ChangeMonthLeft,
    ChangeMonthRight,
    Month,
    DateList,
    DateItem,
    DateItemWeekDay,
    DateItemWeekNumber

} from './styles';
import { AgendaItem } from '../../components/AgendaItem';
import { getDayOfYear, getDay, getMonth, getYear, addMonths, getDaysInMonth, getDate } from 'date-fns';

import { devAgenda } from '../../global/devVariaveis';

export function Agenda(){

    const navigation = useNavigation();

    const [refreshing, setRefresh] = useState(false);

    const meses = months;
    const dias = days;
    const diasLong = daysLong;

    const [atualDate, setAtualDate] = useState(null);
    const [dataHoje, setDataHoje] = useState(null);
    const [diaHoje, setDiaHoje] = useState(null);

    const [selectedYear, setSelectedYear] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedDayWeek, setSelectedDayWeek] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);

    const [listdias, setListdias] = useState([]);

    const [agendamentos, setAgendamentos] = useState<ITipoAgendamento[]>([]);


    const getAtualDay = () => {
        let today = new Date();

        setSelectedYear( getYear(today) );
        setSelectedMonth( getMonth(today) );
        setSelectedDay( getDayOfYear(today) ); 
        setSelectedDayWeek( getDay(today) );
        setSelectedDate(today);
    }

    const handleDateClick = (side: String) => {
        let mountDate = new Date(selectedYear, selectedMonth, 1);

        if(side == "left"){
            mountDate.setMonth( mountDate.getMonth() -1 );
        }else{
            mountDate.setMonth( mountDate.getMonth() +1 );
        }

        setSelectedYear( getYear(mountDate) );
        setSelectedMonth( getMonth(mountDate) );
        setSelectedDay(0);
        setSelectedDate(mountDate);
    }

    useEffect(() => {
        getAtualDay();

        let d = new Date();
        setDataHoje(`${diasLong[d.getDay()]} - ${d.getDate()}/${meses[d.getMonth()]}/${d.getFullYear()}`);
        setAtualDate(d);

        setAgendamentos(devAgenda);

    },[]);

    useEffect(()=>{
        setListdias([]);

        let diasInMonth = getDaysInMonth(new Date(selectedYear, selectedMonth)); //new Date(selectedYear, selectedMonth+1, 0).getDate();
        let newListdias = [];

        for(let i = 1;  i <= diasInMonth; i++ ){

            let d = new Date(selectedYear, selectedMonth, i);

            newListdias.push({
                weekday: dias[ getDay(d) ],
                number: i,
                status: true
            });
            
        }
        let d = new Date();
        setListdias(newListdias);

        if(selectedMonth != d.getMonth() ){
            let dtEscolhida = new Date(selectedDate);
            console.log(`DtEscolhida: ${dtEscolhida}`);
            setSelectedDay(1);
            setSelectedDayWeek(getDay(dtEscolhida));

        }else{
            setSelectedDay(getDate(d));
            setSelectedDayWeek(getDay(d));
        }



    }, [selectedMonth, selectedYear]);

    useEffect(()=>{
        let d = new Date(selectedYear, selectedMonth, selectedDay);
        setSelectedDayWeek(d.getDay());
        setSelectedDate(d);
        
        let hoje = new Date();
        setDiaHoje(hoje.getDay());

    }, [selectedDay, selectedDayWeek]);

    return(
        <Container refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getAtualDay}/>}>

            <Header>
                <Titulo>Agenda do Dia</Titulo>
            </Header>

            <DateWrapper>
                <Today>Hoje é {dataHoje}</Today>
                <SelectDateWrapper>
                    <ChangeMonthLeft onPress={ ()=> handleDateClick("left") }>
                        <IconeChangeMonth name="chevron-left"/>
                    </ChangeMonthLeft>
                    <Month>{meses[selectedMonth]} - {selectedYear}</Month>
                    <ChangeMonthRight onPress={ ()=> handleDateClick("right") }>
                        <IconeChangeMonth name="chevron-right"/>
                    </ChangeMonthRight>
                </SelectDateWrapper>

                <DateList >
                    {listdias.map((item,key)=>(
                        <DateItem key={key} diaEscolhido={selectedDay} diaHoje={diaHoje}  onPress={()=>{ item.status ? setSelectedDay(item.number) : null}} style={{backgroundColor: item.number === selectedDay ? '#4EADBE' : '#FFFFFF' }}>
                            <DateItemWeekDay style={{color: item.number === selectedDay ? '#FFFFFF' : '#000000'}}>{item.weekday}</DateItemWeekDay>
                            <DateItemWeekNumber style={{ color: item.number === selectedDay ? '#FFFFFF' : '#000000'}}>{item.number}</DateItemWeekNumber>
                        </DateItem>                        
                    ))}
                </DateList>

            </DateWrapper>
                    
                { selectedDate && agendamentos.map((item, key) =>{
                    return(
                        <AgendaItem 
                            key={key}
                            status={item.status} 
                            dataHora={item.dataHora}
                            tipo={item.tipo}
                        />
                    )
                }) }

              

        </Container>
    )
}