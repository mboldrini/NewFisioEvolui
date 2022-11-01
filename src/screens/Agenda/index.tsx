import React, {useEffect, useRef, useState}from 'react';
import {Button, FlatList, RefreshControl} from 'react-native';
import {useNavigation, validatePathConfig } from '@react-navigation/native';
import { months, days, daysLong} from '../../global/variaveis/Dates';
import { ITipoAgendamento } from '../../global/interfaces';
import { 
    Container,
    Iscroll,
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
// API
import { api } from '../../global/api';
// REDUX
import { useSelector } from 'react-redux';
import { State } from '../../state';
// Item de agenda
import { AgendaItem } from '../../components/AgendaItem';
// Date-fns
import { getDay, getMonth, getYear, getDaysInMonth, getDate, format } from 'date-fns';
import { toast } from '@backpackapp-io/react-native-toast';
import { Toasts } from '@backpackapp-io/react-native-toast';

///Hooks
import useVerificaVersao from '../../hooks/useVerificaVersao';


export function Agenda(){

    const { forcaUpdate, recomendaUpdate } = useVerificaVersao(false);


    const navigation = useNavigation();

    const [ref, setRef] = useState(null);

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
    const [agendamentos, setAgendamentos] = useState<ITipoAgendamento[]>(null);

    const carrosselRef = useRef();
 
    useEffect(()=>{
        if(forcaUpdate){
            console.log("ForcaUpdate: "+ forcaUpdate);
            toast.error('ATENÇÃO: Uma nova versão do Fisio Evolui está disponível!', {duration: 6000, icon: '⏫'});
        }
    }, [forcaUpdate, recomendaUpdate]);

    useEffect(()=>{
           if(recomendaUpdate && !forcaUpdate){
            console.log("Recomenda Update: "+ recomendaUpdate);
            toast.success('Uma nova versão do Fisio Evolui está disponível!', {duration: 6000, icon: '⏫'});
        }
    }, [recomendaUpdate]);
 
 
    function HandleVaiEditar(idAgendamento: number, idPaciente: number){
        navigation.navigate('Home' as never, { 
            screen: 'EditPacienteInfos',
            params: {
                id: idAgendamento,
                id_paciente: idPaciente,
                tipo: "agendamentos",
                status: 'editar'
            }
          
        } as never)      
    }


    function getAtualDay(){
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

    async function GetAgendaDia(){
        // console.group("GetAgendaDia");
        setLoading(true);

        let rangeData = {
            date: format(new Date(selectedYear, selectedMonth, selectedDay ), 'yyyy-MM-dd') +"T00:00:00.000-03:00"
        }
        
        await api(apiState.token).post('/appointments/day', rangeData).then(res => {

            // console.log(res.data);

            setAgendamentos(res.data);

        }).catch(err =>{
            console.log("ERRO!");
            console.log(err.message);
            toast.error('Ops! Erro ao obter a lista de agendamentos', {duration: 6000, icon: '❌'});
        });

        setLoading(false);

        // console.groupEnd();
    }

    useEffect(() => {
        getAtualDay();

        if(listdias.length > 5){
            setTimeout(()=>{
                ref.scrollToIndex({
                    animated: true,
                    index: selectedDay -1,
                    viewPosition: 0
                });
                console.log("setou a posicao do dia");
            },300);
        }

        
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

            GetAgendaDia();

            if(listdias.length > 5 && selectedDay > 0){
                setTimeout(()=>{
                    ref.scrollToIndex({
                        animated: true,
                        index: selectedDay -1,
                        viewPosition: 0
                    });
                },300);
            }
        }

    }, [selectedDay]);



    return(
    <Container >

        <Toasts/>

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

            <FlatList
                data={listdias}
                keyExtractor={(item) => item.name}
                horizontal={true}
                renderItem={({item}) =>{
                    return (
                        <DateItem 
                            key={item.key} 
                            onPress={()=>{ item.status ? setSelectedDay(item.number) : null}} 
                            style={{backgroundColor: item.number === selectedDay ? '#4EADBE' : '#FFFFFF' }}
                        >
                            <DateItemWeekDay style={{color: item.number === selectedDay ? '#FFFFFF' : '#000000'}}>{item.weekday}</DateItemWeekDay>
                            <DateItemWeekNumber style={{ color: item.number === selectedDay ? '#FFFFFF' : '#000000'}}>{item.number}</DateItemWeekNumber>
                        </DateItem>   
                    )} 
                }
                ref={(ref) => { setRef(ref); }}
            />
        </DateWrapper>


        { loading &&
            <Wrap>
                <LoadingIcon size="large" color="#FFFFFF"/>   
            </Wrap>
        }

        { !loading && agendamentos?.length < 1 &&
            <Wrap>
                <TextoSemAgendamentos>Nenhum agendamento encontrado</TextoSemAgendamentos>
            </Wrap> 
        }   

        { loading == false && agendamentos &&
            <FlatList
                data={agendamentos}
                keyExtractor={(item, index) => item.id +"_"+ item.client_name}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=> {getAtualDay(); GetAgendaDia() } }/>}
                renderItem={ ({item}) =>{
                    return (
                        <AgendaItem 
                            key={item.id}
                            client_name={item.client_name}
                            status={item.status}
                            date_scheduled={item.date_scheduled}
                            start_hour={item.start_hour}
                            end_hour={item.end_hour}
                            duration={item.duration}
                            type={item.type}
                            onPress={()=> HandleVaiEditar(item.id, item.client_id) }
                        />
                    )} 
                }
            /> 
        } 

                    
    </Container>
    )
}