import React, {useEffect, useState}from 'react';
import { FlatList } from 'react-native';
import {RefreshControl} from 'react-native';
import {useNavigation } from '@react-navigation/native';
import variaveis from '../../global/variaveis/variaveis';
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

export function Agenda(){

    const navigation = useNavigation();

    const [refreshing, setRefresh] = useState(false);

    const months = variaveis.datas.months;
    const days = variaveis.datas.days;
    const daysLong = variaveis.datas.daysLong;

    const [dataHoje, setDataHoje] = useState(null);
    const [diaHoje, setDiaHoje] = useState(null);
    const [selectedYear, setSelectedYear] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedDayWeek, setSelectedDayWeek] = useState(null);

    const [listDays, setListDays] = useState([]);

    const getAtualDay = () => {
        let today = new Date();
        setSelectedYear( today.getFullYear() );
        setSelectedMonth( today.getMonth() );
        setSelectedDay( today.getDate() ); 
        setSelectedDayWeek(today.getDay());
    }

    const handleDateClick = (side: String) => {
        let mountDate = new Date(selectedYear, selectedMonth, 1);

        if(side == "left"){
            mountDate.setMonth( mountDate.getMonth() -1 );
        }else{
            mountDate.setMonth( mountDate.getMonth() +1 );
        }

        setSelectedYear(mountDate.getFullYear());
        setSelectedMonth(mountDate.getMonth());
        setSelectedDay(0);
    }

    useEffect(() => {
        getAtualDay();
    },[]);

    useEffect(()=>{
        setListDays([]);
        // if(dia != null){
        let daysInMonth = new Date(selectedYear, selectedMonth+1, 0).getDate();
        let newListDays = [];

        for(let i = 1;  i <= daysInMonth; i++ ){

            let d = new Date(selectedYear, selectedMonth, i);
            let year = d.getFullYear();
            let month = d.getMonth +1;
            let day = d.getDate();
            month = month < 10 ? '0'+month : month;
            day = day < 10 ? '0'+day : day;

            newListDays.push({
                weekday: days[ d.getDay() ],
                number: i,
                status: true
            });
            
        }
        let d = new Date();
        setListDays(newListDays);

        if(selectedMonth != d.getMonth() ){
            let dtEscolhida = new Date(selectedYear, selectedMonth, 0);
            setSelectedDay(1);
            setSelectedDayWeek(dtEscolhida.getDay());

        }else{
            setSelectedDay(d.getDate());
            setSelectedDayWeek(d.getDay());
        }


        setDataHoje(`${daysLong[d.getDay()]} - ${d.getDate()}/${months[d.getMonth()]}/${d.getFullYear()}`);

    }, [selectedMonth, selectedYear]);

    useEffect(()=>{
        let d = new Date(selectedYear, selectedMonth, selectedDay);
        setSelectedDayWeek(d.getDay());
        let hoje = new Date();
        setDiaHoje(hoje.getDay());
    }, [selectedDay, selectedDayWeek]);

    let listaAgenda = [
        {
            id: '0',
            idStatus: 0,
            horaPassou: true,
            horario: '07:00',
            tipo: 'Particular',
            icone_tipo: 'money-bill-wave',
        },
        {
            id: '1',
            idStatus: 1,
            horaPassou: true,
            horario: '07:30',
            tipo: 'Particular',
            icone_tipo: 'money-bill-wave',
        },
        {
            id: '2',
            idStatus: 2,
            horaPassou: false,
            horario: '08:00',
            tipo: 'Particular',
            icone_tipo: 'money-bill-wave',
        },
        {
            id: '3',
            idStatus: 3,
            horaPassou: false,
            horario: '08:30',
            tipo: 'Plano Amil 500FG',
            icone_tipo: 'hospital',
        },
        {
            id: '4',
            idStatus: 4,
            horaPassou: false,
            horario: '09:00',
            tipo: 'Particular',
            icone_tipo: 'money-bill-wave',
        },
        {
            id: '5',
            idStatus: 5,
            horaPassou: false,
            horario: '09:30',
            tipo: 'Particular',
            icone_tipo: 'money-bill-wave',
        },
        {
            id: '6',
            idStatus: 6,
            horaPassou: false,
            horario: '11:00',
            tipo: 'Particular',
            icone_tipo: 'money-bill-wave',
        }
    ];

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
                    <Month>{months[selectedMonth]} - {selectedYear}</Month>
                    <ChangeMonthRight onPress={ ()=> handleDateClick("right") }>
                        <IconeChangeMonth name="chevron-right"/>
                    </ChangeMonthRight>
                </SelectDateWrapper>

                <DateList >
                    {listDays.map((item,key)=>(
                        <DateItem key={key} diaEscolhido={selectedDay} diaHoje={diaHoje}  onPress={()=>{ item.status ? setSelectedDay(item.number) : null}} style={{backgroundColor: item.number === selectedDay ? '#4EADBE' : '#FFFFFF' }}>
                            <DateItemWeekDay style={{color: item.number === selectedDay ? '#FFFFFF' : '#000000'}}>{item.weekday}</DateItemWeekDay>
                            <DateItemWeekNumber style={{ color: item.number === selectedDay ? '#FFFFFF' : '#000000'}}>{item.number}</DateItemWeekNumber>
                        </DateItem>                        
                    ))}
                </DateList>

            </DateWrapper>

            <FlatList 
                data={listaAgenda}
                keyExtractor={(item) => item.id}
                renderItem={({item}) =>(
                    <AgendaItem 
                        idStatus={item.idStatus} 
                        horaPassou={item.horaPassou}
                        horario={item.horario}
                        tipo={item.tipo}
                        iconeTipo={item.icone_tipo}
                    />
                )}
            />

        </Container>
    )
}