import React, {useEffect, useState}from 'react';
import {RefreshControl} from 'react-native';
import {useNavigation, useRoute } from '@react-navigation/native';
import { 
    Container,
    WrapLoadingPctInfos,
    LoadingIcon,
    /// Cabeçalho
    ContainerCabecalho,
    WrapLeft,
    IconeLeft,
    IconeRight,
    WrapTitle,
    Titulo,
    /// MENU
    ViewBtn,
    AreaMenu,
    BtnMenuList,
    TituloMenu,
    IconeMenu,

    /// Area Data
    DateWrapper,
    Today,
    SelectDateWrapper,
    IconeChangeMonth,
    ChangeMonthLeft,
    ChangeMonthRight,
    Month,


} from './styles';

import { PacienteHeader } from '../../../components/PacienteHeader';
import { BottomSpacer } from '../../../components/BottomSpacer';
// API
import { api } from '../../../global/api';
// REDUX
import { useSelector } from 'react-redux';
import { State } from '../../../state';
// Imports
import { AppointmentList } from '../../../components/AppointmentList';
import { Iscrol } from '../../CadastrarPaciente/styles';
import { ModalAgendamento } from '../../../components/Modal/ModalAgendamento';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Modal } from 'react-native-ui-lib';
import { months, days, daysLong} from '../../../global/variaveis/Dates';
// Date-fns
import { getDay, getMonth, getYear, getDaysInMonth, getDate, format } from 'date-fns';

interface IRouteInfos{
    idPaciente: number,
    nomePaciente: string,
    tipo: string,
}

export function ListInfosPaciente(){

    const navigation = useNavigation();
    const [refreshing, setRefresh] = useState(false);

    /// Route Params
    const route = useRoute();
    const { idPaciente, nomePaciente, tipo } = route.params as IRouteInfos;
    /// Redux
    const apiState = useSelector((state: State) => state.apiReducer);

    const [loading, setLoading] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);

    const [dataHoje, setDataHoje] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);


    const parametrosDoTipo: any = {
        diagnosticoClinico: { title: 'Diagnóstico Clínico' }, 
        queixaPrincipal: { title: 'Queixa Principal' }, 
        hda: { title: 'HDA' },
        hpp: { title: 'HPP' },
        avaliacaoFisica: { title: 'Avaliação Física' },
        avaliacaoRespiratoria: { title: 'Avaliação Respiratória' },
        diagnosticoFuncional: { title: 'Diagnóstico Funcional' },
        objetivos: { title: 'Objetivos e Metas' },
        evolucoes: { title: 'Evoluções' },
        orientacoes: { title: 'Orientações' },
        agendamentos: { title: 'Agendamentos' },
    };

    let mountDate = new Date(selectedYear, selectedMonth, 1);

    
    const handleDateClick = (side: String) => {

        if(side == "left"){
            mountDate.setMonth( mountDate.getMonth() -1 );
        }else{
            mountDate.setMonth( mountDate.getMonth() +1 );
        }

        console.log(mountDate);

        setSelectedYear( getYear(mountDate) );
        setSelectedMonth( getMonth(mountDate) );
    }

    function SetDefaultDate(){
        let today = new Date();
        setSelectedYear( getYear(today) );
        setSelectedMonth( getMonth(today) );
        setDataHoje(`${daysLong[today.getDay()]} - ${today.getDate()}/${months[today.getMonth()]}/${today.getFullYear()}`);
    }

    useEffect(()=>{
        SetDefaultDate();
    },[]);




    return(
<Container >
    <SafeAreaView>
        <Iscrol refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>{ SetDefaultDate() }}/>}>

            <ContainerCabecalho >
                <WrapLeft>
                    <IconeLeft name="chevron-left" onPress={() => navigation.goBack() }/>
                    <WrapTitle>
                        <Titulo>{ parametrosDoTipo[tipo].title }</Titulo>
                    </WrapTitle>
                </WrapLeft>

                <IconeRight name="cog" onPress={() => setMenuVisible(true) } />

                <Modal transparent visible={menuVisible} style={{position: 'absolute'}}>
                    <SafeAreaView style={{flex: 1, zIndex: -2}} onTouchEnd={() => setMenuVisible(false)}>
                        <AreaMenu style={{zIndex: 3}}>
                            <BtnMenuList onPress={() => console.log(parametrosDoTipo[tipo].title) } >
                                <IconeMenu name="plus" />
                                <TituloMenu>Criar {parametrosDoTipo[tipo].title}</TituloMenu>
                            </BtnMenuList>
                        </AreaMenu>
                    </SafeAreaView>
                </Modal>
                
            </ContainerCabecalho>

            { nomePaciente && loading == false &&
                <PacienteHeader nome={nomePaciente} />
            }

            { loading == true && 
                <WrapLoadingPctInfos>
                    <LoadingIcon size="large" color="#FFFFFF"/>  
                </WrapLoadingPctInfos>
            }

            { !loading &&
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
                </DateWrapper>
            }


            <BottomSpacer/>
              
        </Iscrol>
    </SafeAreaView>
</Container>
    )
}