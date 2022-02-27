import { FontAwesome5 } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
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
    Footer,
    WrapBtn,


    View
    
} from './styles';

import { 
    Calendar as CustomCalendar, 
    Agenda,
    LocaleConfig
} from 'react-native-calendars';
import { ILocalesPtBr } from './localeConfig';
import { format } from 'date-fns';
import { api } from '../../../global/api';

interface Props{
    closeSelectCategory: () => void;
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

export function ModalAgendamento({ closeSelectCategory }: Props){

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

    async function GetScheduledHours(){

        if(selectedDate){

            console.log("API - obtendo lista de horas");
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

        console.log( horas );

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

            {/* <WrapCalendar>
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

                    // markedDates={{ 
                    //     '2022-02-19': {disabled: false,  color: '#4EADBE',  },
                    //     '2022-02-20': {disabled: false,  color: '#4EADBE',   }
                    // }}

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

                    onMonthChange={month => {
                        console.log('month changed', month);
                    }}
                />
            </WrapCalendar> */}

            <WrapCalendar>
            <Agenda
  // The list of items that have to be displayed in agenda. If you want to render item as empty date
  // the value of date key has to be an empty array []. If there exists no value for date key it is
  // considered that the date in question is not yet loaded
  items={{
    '2012-05-22': [{name: 'item 1 - any js object'}],
    '2012-05-23': [{name: 'item 2 - any js object', height: 80}],
    '2012-05-24': [],
    '2012-05-25': [{name: 'item 3 - any js object'}, {name: 'any js object'}]
  }}
  // Callback that gets called when items for a certain month should be loaded (month became visible)
  loadItemsForMonth={month => {
    console.log('trigger items loading');
  }}
  // Callback that fires when the calendar is opened or closed
  onCalendarToggled={calendarOpened => {
    console.log(calendarOpened);
  }}
  // Callback that gets called on day press
  onDayPress={day => {
    console.log('day pressed');
  }}
  // Callback that gets called when day changes while scrolling agenda list
  onDayChange={day => {
    console.log('day changed');
  }}
  // Initially selected day
  selected={'2012-05-16'}
  // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
  minDate={'2012-05-10'}
  // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
  maxDate={'2012-05-30'}
  // Max amount of months allowed to scroll to the past. Default = 50
  pastScrollRange={50}
  // Max amount of months allowed to scroll to the future. Default = 50
  futureScrollRange={50}
  // Specify how each item should be rendered in agenda
  renderItem={(item, firstItemInDay) => {
    return <View />;
  }}
  // Specify how each date should be rendered. day can be undefined if the item is not first in that day
  renderDay={(day, item) => {
    return <View />;
  }}
  // Specify how empty date content with no items should be rendered
  renderEmptyDate={() => {
    return <View />;
  }}
  // Specify how agenda knob should look like
  renderKnob={() => {
    return <View />;
  }}
  // Specify what should be rendered instead of ActivityIndicator
  renderEmptyData={() => {
    return <View />;
  }}
  // Specify your item comparison function for increased performance
  rowHasChanged={(r1, r2) => {
    return r1.text !== r2.text;
  }}
  // Hide knob button. Default = false
  hideKnob={true}
  // When `true` and `hideKnob` prop is `false`, the knob will always be visible and the user will be able to drag the knob up and close the calendar. Default = false
  showClosingKnob={false}
  // By default, agenda dates are marked if they have at least one item, but you can override this if needed
  markedDates={{
    '2012-05-16': {selected: true, marked: true},
    '2012-05-17': {marked: true},
    '2012-05-18': {disabled: true}
  }}
  // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false
  disabledByDefault={true}
  // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly
  onRefresh={() => console.log('refreshing...')}
  // Set this true while waiting for new data from a refresh
  refreshing={false}
  // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView
  refreshControl={null}
  // Agenda theme
  theme={{
    agendaDayTextColor: 'yellow',
    agendaDayNumColor: 'green',
    agendaTodayColor: 'red',
    agendaKnobColor: 'blue'
  }}
  // Agenda container style
  style={{}}
/>
            </WrapCalendar>

{/* 
            {  availableTimesList.length <= 0 &&
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
 */}

            {/* { listHours &&
                <Wrap>
                    <TimeList>
                        {listHours.map((item, key)=>(
                            <TimeItem
                                escolhido={item.hora == selectedHour}
                                ativo={item.disponivel}
                                key={key}
                                onPress={()=>{
                                    if(item.disponivel == true){
                                        setSelectedHour(item.hora)
                                    }
                                }}
                            >
                                <TimeItemText
                                    escolhido={item.hora == selectedHour}
                                    ativo={item.disponivel}
                                >
                                    {item.hora}
                                </TimeItemText>
                            </TimeItem>
                        ))}
                    </TimeList>
                </Wrap>
            } */}
        </Body>

            {/* <Footer>
                <WrapBtn>
                    <ButtonSimple
                        title="Agendar Horario"
                        onPress={()=>{}}
                        type="default"
                    />
                </WrapBtn>

                <ButtonSimple
                    title="Cancelar"
                    onPress={closeSelectCategory}
                    type="cancel"
                />
            </Footer> */}

        </Container>
    )
}