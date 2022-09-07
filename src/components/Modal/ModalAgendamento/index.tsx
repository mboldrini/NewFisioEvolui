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
    WrapCentral,
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
    setSelectedApointment: ({date_scheduled, start_hour, end_hour, type, status, serviceType_id, description, comments}: IApointment) => void;
    idServiceType: number;
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
    start_hour: string,
    end_hour: string,
    duration: string,
    date_scheduled: Date,
    user_id: number,
    serviceType_id: number
}

export function ModalAgendamento({ isVisible, setIsVisible, setSelectedApointment, idServiceType }: Props){

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
    const [selectedEndHour, setSelectedEndHour] = useState(null);

    // Is an Avaliation
    const [isAnEvaluation, setIsAnEvaluation] = useState(false);

    function FormatHour(hour: string){
        const [hora, minuto, segundo] = hour.split(":");
        return hora +":"+ minuto;
    }

    async function GetScheduledHours(){

        if(selectedDate){

            console.group("API - obtendo lista de horas");

            setAvailableTimesList([]);
            setSelectedHour(null);
            setSelectedEndHour(null);
            setIsAnEvaluation(false);

            let params = {
                "serviceType_id": idServiceType,
                "date_scheduled": Object.keys(selectedDate)[0] +"T00:00:00.000-03:00",
                "start_hour": "00:00:01"
            }

            try{

                await api(apiState.token).post('/appointments/availability', params).then(res =>{

                    let listaHoras = res.data.hours_availabled.map( (item: any) => {
                        return({
                            indisponivel: false,
                            start_hour: FormatHour(item.start_hour),
                            end_hour: FormatHour(item.end_hour)
                        });
                    });

                    setAvailableTimesList(listaHoras);


                }).catch(err =>{
                    console.log("Nenhum horario agendado p/ esse dia!");
                    console.log(err.response);
                });
        

            }catch(err){
                console.log("ERR");
                console.log(err);
                alert(err);
            }

            console.groupEnd();

        }
     
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
        let dt = ano +"-"+ mes +"-"+ dia +"T00:00:00.000-03:00";

        const apointment = {
            date_scheduled: dt,
            start_hour: selectedHour,
            end_hour: selectedEndHour,
            type: isAnEvaluation == true ? 1 : 0,
            status: 1,
            serviceType_id: idServiceType,
            description: "",
            comments: "",
        }

        console.log(apointment);

        setSelectedApointment(apointment);
        setIsVisible();

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
        if(idServiceType){
            setAvailableTimesList([]);
            setSelectedDate(null);
            setSelectedHour(null);
            setSelectedEndHour(null);
            setIsAnEvaluation(false);
        }
    },[isVisible]);
    

    return(
        <Modal 
            isVisible={isVisible} 
            animationIn='slideInUp' 
            animationOut='slideOutDown' 
            animationInTiming={700} 
            style={{width: '100%', margin: 0, justifyContent: 'space-between', flex: 1, flexDirection: 'column'}}
        >
        <Container>
            <Body>

            <WrapCentral>


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
                            marginRight: theme.margin.lateral_half,
                            marginLeft: theme.margin.lateral_half,
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
                                escolhido={item.start_hour == selectedHour}
                                ativo={!item.indisponivel}
                                key={key}
                                onPress={()=>{
                                    if(item.indisponivel == false){
                                        setSelectedHour(item.start_hour);
                                        setSelectedEndHour(item.end_hour);
                                    }
                                }}
                            >
                                <TimeItemText
                                    escolhido={item.start_hour == selectedHour}
                                    ativo={!item.indisponivel}
                                >
                                    {item.start_hour}
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

</WrapCentral>

            
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