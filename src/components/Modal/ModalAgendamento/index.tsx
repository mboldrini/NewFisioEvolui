import { FontAwesome5 } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useTheme } from 'styled-components';
import Checkbox from 'expo-checkbox';
import Modal from 'react-native-modal';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '../../../state';
import {
    Container,
    Body,
    Header,
    WrapIcone,
    Icone,
    WrapTitulo,
    Titulo,
    Wrap,
    WrapCalendar,

    TextCarregandoHoras,

    TimeList,
    TimeItem,
    TimeItemText,

    WrapIsEvaluation,
    TextEvaluation,

    WrapButtons,
    Button,
    Title,

} from './styles';
// Calendar
import { Calendar as CustomCalendar, LocaleConfig } from 'react-native-calendars';
import { ILocalesPtBr } from './localeConfig';
import { format, parseISO } from 'date-fns';
// API
import { api } from '../../../global/api';
// Interfaces
import IApointment from '../../../global/DTO/Apointment';
// Received Props on This Modal
interface Props{
    isVisible: boolean;
    setIsVisible: () => void;
    setSelectedApointment: ({data, hora, status, tipo}: IApointment) => void;
}

//Configs Locale - Calendar
LocaleConfig.locales['pt-br'] = ILocalesPtBr;
LocaleConfig.defaultLocale = 'pt-br';
interface ISelectedDayConfigs{
    marked: boolean;
    textColor: string;
    selected: boolean
}
interface ISelectedDay{
    [iDate: string]: ISelectedDayConfigs;
}

// List of Scheduled Objects
interface IHorariosApi{
    id: number,
    hora: number,
    indisponivel: boolean
}

export function ModalAgendamento({ isVisible, setIsVisible, setSelectedApointment }: Props){

    /* CSS Theme */
    const theme = useTheme();

    /* User Redux */
    const dispatch = useDispatch();
    const { setUserInfos } = bindActionCreators(actionCreators, dispatch);
    const apiState = useSelector((state: State) => state.apiReducer);

    // Permit to choose a retroactive date
    const [retroactive, setRetroactive] = useState(null);
    // Day selected by the user
    const [selectedDate, setSelectedDate] = useState<ISelectedDay>(null);

    // Available times - LIST
    const [availableTimesList, setAvailableTimesList] = useState([]);
    // Hour Selected by the user
    const [selectedHour, setSelectedHour] = useState(null);

    // Is an Avaliation
    const [isAnEvaluation, setIsAnEvaluation] = useState(false);


    async function GetScheduledHours(){

        if(selectedDate){

            console.log("API - obtendo lista de horas");
            setAvailableTimesList([]);
            setSelectedHour(null);

            try{

                const dtInicio = Object.keys(selectedDate)[0] + "T00:01";
                const dtFim = Object.keys(selectedDate)[0] + "T23:59";

                await api(apiState.token).post('/agendamento/allhoursday', {
                    dataInicio: dtInicio,
                    dataFim: dtFim,
                }).then(res =>{

                    ShowScheduledHours(res.data);

                }).catch(err =>{
                    console.log("Nenhum horario agendado p/ esse dia!");
                    console.log(err.response);
                });
        

            }catch(err){
                console.log("ERR");
                console.log(err);
                alert(err);
            }

        }
     
    }

    function ShowScheduledHours(horarios: IHorariosApi[]){

        let horas = horarios.filter( (horario) => {
            if( horario.hora >= 8 && horario.hora <= 20 ){
                return horario;
            }
        });
        
        setAvailableTimesList(horas);

    }

    function HandleApointment(){
        if(!selectedDate){
            Alert.alert( "Ops!", "Você precisa escolher uma data", [ { text: "Ok"} ] );
            return;
        }
        if(!selectedHour){
            Alert.alert( "Ops!", "Você precisa escolher um horário", [ { text: "Ok"} ] );
            return;
        }

        let [ano, mes, dia] = Object.keys(selectedDate)[0].split('-');
        let dt = new Date( parseInt(ano), parseInt(mes), parseInt(dia));
            dt.setHours(selectedHour, 0.20 );

        console.log(dt);

        const apointment = {
            timestamp: dt.getTime(),
            tipo: isAnEvaluation == true ? 1 : 0,
            status: 1
        }

        console.log( apointment );


        //setSelectedApointment(apointment);
        //setIsVisible();

    }
  
    useEffect(()=>{
        function EnableRetroactiveDate(){
            if(retroactive == null){
                setRetroactive( format(new Date(), 'yyyy-M-dd') );
            }
        }
        //EnableRetroactiveDate();     
    }, []);

    useEffect(()=>{
        GetScheduledHours();
    },[selectedDate]);

    useEffect(()=>{
        setAvailableTimesList([]);
        setSelectedDate(null);
    },[isVisible]);
    

    return(
        <Modal 
            isVisible={isVisible} 
            animationIn='slideInUp' 
            animationOut='slideOutDown' 
            animationInTiming={700} 
            style={{width: '100%', margin: 0}}
        >
        <Container>
            <Body>

                <Header isActive={true} /*isActive={ temDtPrevia() }*/>
                    <WrapIcone>
                        <Icone name="chevron-down" onPress={()=> setIsVisible() }/>
                    </WrapIcone>
                    <WrapTitulo>
                        <Titulo>Agendar Atendimento</Titulo>
                    </WrapTitulo>
                    {/* {   dataEscolhida && */}
                        {/* <WrapIcone>
                            <Icone name="trash-alt" onPress={()=>{ console.log("FF") } }/>
                        </WrapIcone> */}
                    {/* } */}
                </Header>

                <WrapCalendar>
                    <CustomCalendar
                        renderArrow={
                            (direction) =>
                            <FontAwesome5
                                name={direction == 'left' ? 'chevron-left' : 'chevron-right'}
                                size={24}
                                color={theme.colors.primary}
                            />
                        }

                        headerStyle={{
                            borderBottomWidth: 0.5,
                            borderBottomColor: "#cfcfcf",
                            paddingBottom: 2,
                            marginBottom: 2,
                        }}

                        style={{
                            marginRight: theme.margin.lateral,
                            marginLeft: theme.margin.lateral,
                            borderRadius: theme.bordas.padrao,
                        }}

                        theme={{
                            textDayFontFamily: theme.fonts.regular,
                            textDayHeaderFontFamily: theme.fonts.bold,
                            textMonthFontSize: 14,
                            textDayFontSize: 15,
                            textSectionTitleColor: '#000000',
                            textMonthFontFamily: theme.fonts.bold,

                            todayTextColor: '#00adf5',
                            selectedDayBackgroundColor: '#4EADBE',
                            dotColor: '#4EADBE',
                        }}

                        minDate={retroactive}
                        hideExtraDays={true}
                        markingType="dot"

                        markedDates={selectedDate}

                    disabledDaysIndexes={[0,6]}

                        // Handler which gets executed on day long press. Default = undefined
                        onDayLongPress={day => {
                            const diaSelecionado: ISelectedDay = {};
                            diaSelecionado[day.dateString] = {
                                marked: true,
                                textColor: 'white',
                                selected: true
                            };
                            setSelectedDate(diaSelecionado);
                        }}

                        onDayPress={day=>{
                            const diaSelecionado: ISelectedDay = {};
                            diaSelecionado[day.dateString] = {
                                marked: true,
                                textColor: 'white',
                                selected: true
                            };
                            setSelectedDate(diaSelecionado);
                        }}

                        // onMonthChange={month => {
                        //     console.log('month changed', month);
                        // }}
                    />
                </WrapCalendar>


                {  availableTimesList.length <= 0 && selectedDate != null &&
                    <Wrap>
                        <TextCarregandoHoras>Procurando Horarios Disponíveis...</TextCarregandoHoras>
                    </Wrap>
                } 
                { availableTimesList.length > 0 &&
                    <Wrap>
                    <TimeList>
                        {availableTimesList.map((item, key)=>(
                            <TimeItem
                                escolhido={item.hora == selectedHour}
                                ativo={!item.indisponivel}
                                key={key}
                                onPress={()=>{
                                    if(item.indisponivel == false){
                                        setSelectedHour(item.hora)
                                    }
                                }}
                            >
                                <TimeItemText
                                    escolhido={item.hora == selectedHour}
                                    ativo={!item.indisponivel}
                                >
                                    {item.hora}
                                </TimeItemText>
                            </TimeItem>
                        ))}
                    </TimeList>
                    </Wrap>
                }

                { selectedHour != null && 
                    <WrapIsEvaluation>
                        <TextEvaluation>Avaliação: </TextEvaluation>
                        <Checkbox
                            //style={styles.checkbox}
                            value={isAnEvaluation}
                            onValueChange={setIsAnEvaluation}
                            color={isAnEvaluation ? '#8338ec' : undefined}
                        />
                    </WrapIsEvaluation>
                }
            
                <WrapButtons>

                    <Button type="ok" onPress={()=> HandleApointment() } >
                        <Title>Agendar</Title>
                    </Button>

                    <Button type="cancel" onPress={()=> setIsVisible() } >
                        <Title>Cancelar</Title>
                    </Button>

                </WrapButtons>

            </Body>
        </Container>
        </Modal>
    )
}