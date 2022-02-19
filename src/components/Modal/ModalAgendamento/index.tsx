import { FontAwesome5 } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';

import { StorageKeys } from '../../../global/variaveis/globais';
// import { useDispatch, useSelector } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { actionCreators, State } from '../../../state';

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
    WrapBtn
} from './styles';

import { 
    Calendar as CustomCalendar, 
    LocaleConfig
} from 'react-native-calendars';
import { ILocalesPtBr } from './localeConfig';
import { format } from 'date-fns';
import { api } from '../../../global/api';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface Props{
    closeSelectCategory: () => void;
}

//Configs de locale do calendario
LocaleConfig.locales['pt-br'] = ILocalesPtBr;
LocaleConfig.defaultLocale = 'pt-br';

interface ISelectedDayConfigs{
    marked: boolean;
    color: string;
    textColor: string;
}
interface ISelectedDay{
    [iDate: string]: ISelectedDayConfigs;
}

export function ModalAgendamento({
        closeSelectCategory,
    }: Props){

    const theme = useTheme();

    // const dispatch = useDispatch();
    // const { setUserInfos } = bindActionCreators(actionCreators, dispatch);
    // const usrState = useSelector((state: State) => state.user);

    const [minimDate, setMinimDate] = useState(null);
    const [selectedDate, setSelectedDate] = useState<ISelectedDay>(null);

    const [listaHorasDisponiveis, setListaHorasDisponiveis] = useState([]);

    async function GetHorariosDisponiveis(){

        console.log("obtendo lista de horas");
 
        const token = await AsyncStorage.getItem(StorageKeys.appToken);

        const strHeader = `Bearer ${token}`;

        const cabecalho = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const corpo = {
            "dataInicio": "2022-02-19",
            "dataFim": "2022-02-19",
        }

        try{

            api.interceptors.request.use(
                config => {
                    config.headers.authorization = `Bearer ${token}`;
                    return config;
                },
                error => {
                    return Promise.reject(error);
                }
            )

            await api.post('/agendamento/allday', {
            
                    dataInicio: "2022-02-19T00:00",
                    dataFim: "2022-02-19T00:00",
            }     

            ).then(res =>{
                console.log("ok?");
                console.log(res);
                console.log(res.data);
            }).catch(err =>{
                console.log("ERR!");
                console.log(err.response);
                console.log(err.response.data)
            });
    

        }catch(err){
            console.log("ERR");
            console.log(err);
        }
     
    }
  
    useEffect(()=>{
        function desativaDataRetroativa(){
            if(minimDate == null){
                setMinimDate( format(new Date(), 'yyyy-M-dd') );
            }
        }
        desativaDataRetroativa();       
    }, []);

    useEffect(()=>{
        setListaHorasDisponiveis([]);
        if(selectedDate != null){
            GetHorariosDisponiveis();
        }
    },[selectedDate]);

    // useEffect(()=>{
    //     if(listaHorasDisponiveis.length <= 0 && selectedDate != null){
    //         GetHorariosDisponiveis();
    //     }
    // },[listaHorasDisponiveis]);
    

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
                    }}
                    minDate={minimDate}
                    hideExtraDays={true}
                    markingType='period'
                    markedDates={ selectedDate }
                    // Handler which gets executed on day long press. Default = undefined
                    onDayLongPress={day => {
                        const diaSelecionado: ISelectedDay = {};
                        diaSelecionado[day.dateString] = {
                            marked: true,
                            color: '#4EADBE', 
                            textColor: 'white'
                        };
                        setSelectedDate(diaSelecionado);
                    }}
                    onMonthChange={month => {
                        console.log('month changed', month);
                    }}
                />
            </WrapCalendar>

            <Wrap>
                { listaHorasDisponiveis.length <= 0 &&
                    <TextCarregandoHoras>Procurando Horarios Disponíveis...</TextCarregandoHoras>
                }
            </Wrap>


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