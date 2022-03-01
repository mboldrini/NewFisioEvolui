import { FontAwesome5 } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useTheme } from 'styled-components';
import Checkbox from 'expo-checkbox';
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
import { format } from 'date-fns';
// API
import { api } from '../../../global/api';
// Interfaces
import IApointment from '../../../global/DTO/Apointment';

// Received Props on This Modal
interface Props{
    closeSelectCategory: () => void;
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

export function ModalAgendamento({ closeSelectCategory, setSelectedApointment }: Props){

    /* CSS Theme */
    const theme = useTheme();

    /* User Redux */
    const dispatch = useDispatch();
    const { setUserInfos } = bindActionCreators(actionCreators, dispatch);
    const usrState = useSelector((state: State) => state.user);

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

        //    console.log("API - obtendo lista de horas");
            setAvailableTimesList([]);
            setSelectedHour(null);
 
            const token = usrState.token;

            try{

                api.interceptors.request.use(
                    config => {
                        config.headers.authorization = `Bearer ${token}`;
                        return config;
                    },
                    error => {
                        return Promise.reject(error);
                    }
                );

                const dtInicio = Object.keys(selectedDate)[0] + "T00:01";
                const dtFim = Object.keys(selectedDate)[0] + "T23:59";

                await api.post('/agendamento/allday', {
                    dataInicio: dtInicio,
                    dataFim: dtFim,
                }).then(res =>{

                    ShowScheduledHours(res.data);

                }).catch(err =>{
                    console.log("Nenhum horario agendado p/ esse dia!");
                    console.log(err.response.data)
                });
        

            }catch(err){
                console.log("ERR");
                console.log(err);
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

      //  console.log( horas );

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

        const apointment = {
            data: Object.keys(selectedDate)[0],
            hora: selectedHour,
            status: 0,
            tipo:  isAnEvaluation == true ? 1 : 0 
        }

        setSelectedApointment(apointment);
        closeSelectCategory();


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

    // useEffect(()=>{
    //     console.log(`Selected Hour: ${selectedHour}`);
    // }, [selectedHour]);
    

    return(
        <Container>
        <Body>

            <Header isActive={true} /*isActive={ temDtPrevia() }*/>
                <WrapIcone>
                    <Icone name="chevron-down" onPress={closeSelectCategory}/>
                </WrapIcone>
                <WrapTitulo>
                    <Titulo>Agendar Atendimento</Titulo>
                </WrapTitulo>
                {/* {   dataEscolhida &&
                    <WrapIcone>
                        <Icone name="trash-alt" onPress={()=>{ excluiAgendamento(dataEscolhida.id) } }/>
                    </WrapIcone>
                } */}
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

                    disabledDaysIndexes={[0, 6]}

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

                <Button type="cancel" onPress={()=> closeSelectCategory() } >
                    <Title>Cancelar</Title>
                </Button>

            </WrapButtons>

        </Body>

        </Container>
    )
}