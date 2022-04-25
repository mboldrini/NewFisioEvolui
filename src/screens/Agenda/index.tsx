import React, {useEffect, useState}from 'react';
import { FlatList } from 'react-native';
import {RefreshControl} from 'react-native';
import {useNavigation } from '@react-navigation/native';
import { months, days, daysLong} from '../../global/variaveis/Dates';
import { ITipoAgendamento } from '../../global/interfaces';
import { 
    Container,
    Iscroll,
    WrapToast,
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
    DateItemWeekNumber,
    Wrap,
    LoadingIcon,
    TextoSemAgendamentos
} from './styles';
// Toast
import Toast from 'react-native-toast-message';
// API
import { api } from '../../global/api';
// REDUX
import { useSelector } from 'react-redux';
import { State } from '../../state';
// Item de agenda
import { AgendaItem } from '../../components/AgendaItem';
// Date-fns
import { getDayOfYear, getDay, getMonth, getYear, getDaysInMonth, getDate, format } from 'date-fns';

export function Agenda(){

    const navigation = useNavigation();

    const [refreshing, setRefresh] = useState(false);
    const [loading, setLoading] = useState(false);

    const apiState = useSelector((state: State) => state.apiReducer);

    const [dataHoje, setDataHoje] = useState(null);
    const [diaHoje, setDiaHoje] = useState(null);

    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);

    // Dias disponiveis no mes escolhido
    const [listdias, setListdias] = useState([]);
    // Agendamentos marcados para o dia escolhido
    const [agendamentos, setAgendamentos] = useState<ITipoAgendamento[]>([]);


    const getAtualDay = () => {
        let today = new Date();

        setSelectedYear( getYear(today) );
        setSelectedMonth( getMonth(today) );
        setSelectedDay( today.getDate() ); 
        setSelectedDate(today);

        setDataHoje(`${daysLong[today.getDay()]} - ${today.getDate()}/${months[today.getMonth()]}/${today.getFullYear()}`);

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

    const ListaDiasMes = () => {
        setListdias([]);

        let diasInMonth = getDaysInMonth(new Date(selectedYear, selectedMonth)); //new Date(selectedYear, selectedMonth+1, 0).getDate();
        let newListdias = [];

        for(let i = 1;  i <= diasInMonth; i++ ){

            let d = new Date(selectedYear, selectedMonth, i);

            newListdias.push({
                weekday: days[ getDay(d) ],
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

        }else{
            setSelectedDay(getDate(d));
        }
    }

    async function GetAgendaDia(dtEscolhida: Date){
        console.log( format(dtEscolhida, 'yyyy-MM-dd') );

        let rangeData = {
            dataInicio: format(dtEscolhida, 'yyyy-MM-dd') + "T00:01",
            dataFim: format(dtEscolhida, 'yyyy-MM-dd') +"T23:59"
        }

        setLoading(true);
        
        await api(apiState.token).post('/agendamento/allappointments', rangeData).then(res => {

            setAgendamentos(res.data);

        }).catch(err =>{
            console.log("ERRO!");
            console.error(err);
            Toast.show({
                type: 'error',
                text1: 'OPS! erro ao obter agenda do dia.',
            });
        });

        setLoading(false);

    }

    useEffect(() => {
        getAtualDay();
    },[]);
   
    useEffect(()=>{
        if(selectedMonth && selectedYear){
            ListaDiasMes();
        }
    }, [selectedMonth, selectedYear]);

    useEffect(()=>{
        if(selectedDay > 0){
            let d = new Date(selectedYear, selectedMonth, selectedDay);
            setSelectedDate(d);

            GetAgendaDia(d);
        }
    }, [selectedDay]);

    return(
        <Container >
            
        <WrapToast>
            <Toast position={'top'}  autoHide={true} visibilityTime={6000} onPress={()=>Toast.hide()}/>
        </WrapToast>

        <Iscroll refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getAtualDay}/>}>

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

                <DateList>
                    <FlatList
                        data={listdias}
                        keyExtractor={(item) => item.name}
                        horizontal={true}
                        renderItem={({item}) =>{
                        return (
                            <DateItem key={item.key} diaEscolhido={selectedDay} diaHoje={diaHoje}  onPress={()=>{ item.status ? setSelectedDay(item.number) : null}} style={{backgroundColor: item.number === selectedDay ? '#4EADBE' : '#FFFFFF' }}>
                                <DateItemWeekDay style={{color: item.number === selectedDay ? '#FFFFFF' : '#000000'}}>{item.weekday}</DateItemWeekDay>
                                <DateItemWeekNumber style={{ color: item.number === selectedDay ? '#FFFFFF' : '#000000'}}>{item.number}</DateItemWeekNumber>
                            </DateItem>   
                        )} }
                    />
                </DateList>
            </DateWrapper>

            { loading &&
                <Wrap>
                    <LoadingIcon size="large" color="#FFFFFF"/>   
                </Wrap>
            }

            { loading == false && agendamentos.length >= 1 &&
                <FlatList
                    data={agendamentos}
                    keyExtractor={(item) => item.dataHora}
                    renderItem={({item}) =>{
                        return (
                            <AgendaItem 
                                key={item.dataHora}
                                status={item.status}
                                tipo={item.tipo}
                                paciente_nome={item.paciente_nome}
                                dataHora={item.dataHora}
                            />
                        )} 
                    }
                /> 
            }

            { !loading && agendamentos.length <= 0 &&
                <Wrap>
                    <TextoSemAgendamentos>Nenhum agendamento encontrado</TextoSemAgendamentos>
                </Wrap>
            }
                    
        </Iscroll>
        </Container>
    )
}