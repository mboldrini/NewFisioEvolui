import React, {useEffect, useState}from 'react';
import {RefreshControl, Alert } from 'react-native';
import {useNavigation, useRoute } from '@react-navigation/native';
import { 
    Container,
    Iscrol,
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
    WrapAppointment

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
import { ModalAgendamento } from '../../../components/Modal/ModalAgendamento';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Modal } from 'react-native-ui-lib';
import { months, daysLong} from '../../../global/variaveis/Dates';
// Date-fns
import { getMonth, getYear, parseISO, format } from 'date-fns';
/// Interfaces 
import {IAppointments, parametrosDoTipo} from './Interfaces';

import Toast from 'react-native-toast-message';
import { List_PacienteItens } from '../../../components/List_Items/PacienteItens';
import { CabecalhoMenu } from '../../../components/CabecalhoMenu';


interface IRouteInfos{
    idPaciente: number,
    nomePaciente: string,
    tipo: string,
}

interface IListInfos{
    id: number,
    about: string,
    comments: string,
    date: Date,
    client_id: number,
    user_id: number,
    created_at: Date,
    updated_at: Date,
}

export function ListInfosPaciente(){

    const navigation = useNavigation();
    const [refreshing, setRefresh] = useState(false);

    /// Route Params
    const route = useRoute();
    const { idPaciente, nomePaciente, tipo } = route.params as IRouteInfos;
    /// Redux
    const apiState = useSelector((state: State) => state.apiReducer);

    const [loading, setLoading] = useState(true);
    const [menuVisible, setMenuVisible] = useState(false);

    const [dataHoje, setDataHoje] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);

    /// Infos do Paciente
    const [infosList, setInfosList] = useState<IListInfos[]>(null);
    const [agendamentosList, setAgendamentosList] = useState<IAppointments[]>(null);

    /// MENU
    const [menuEscolhido, setMenuEscolhido] = useState(null);
    const listaMenuPerfil = [ { title: 'Criar '+ parametrosDoTipo[tipo].title, slug:'criar', icone: 'plus' } ]

    const handleDateClick = (side: String) => {
        let mountDate = new Date(selectedYear, selectedMonth, 1);
        if(side == "left"){
            mountDate.setMonth( mountDate.getMonth() -1 );
        }else{
            mountDate.setMonth( mountDate.getMonth() +1 );
        }

        setSelectedYear( getYear(mountDate) );
        setSelectedMonth( getMonth(mountDate) );
    }

    function SetDefaultDate(){
        let today = new Date();
        setSelectedYear( getYear(today) );
        setSelectedMonth( getMonth(today) );
        setDataHoje(`${daysLong[today.getDay()]} - ${today.getDate()}/${months[today.getMonth()]}/${today.getFullYear()}`);
    }

    async function GetListInfos(tipo: string){

        let url = '';

        if(tipo != "agendamentos"){
            url = parametrosDoTipo[tipo].urlList + idPaciente;
        }else{
            url = parametrosDoTipo[tipo].urlList + idPaciente +"&"+ format(new Date(selectedYear, selectedMonth), 'yyyy-M-dd') ;
            console.log("url: "+ url);
        }

        console.log("URL: " + url);

        setLoading(true);
        setInfosList([]);
        setAgendamentosList([]);
   
        await api(apiState.token).get(url).then(res =>{

            console.log(res.data);

            if(tipo != "agendamentos"){
                setInfosList(res.data);
            }else{
                setAgendamentosList(res.data);
                console.log("salva os agendamentos");
            }


        }).catch(err =>{

            console.log("erro ao obter informações");
            console.log(err.data);

            Toast.show({
                type: 'error',
                text1: '❌ Ops! Erro ao obter lista de informações',
            });


        });

        setLoading(false);
    }

    function HandleVaiEditar(id: number){
        navigation.navigate('EditPacienteInfos' as never, { 
            id: id,
            id_paciente: idPaciente,
            tipo: tipo,
            status: 'editar'
        } as never)      
    }

    function HandleCriarNovo(){
        navigation.navigate('EditPacienteInfos' as never, { 
            id: 0,
            id_paciente: idPaciente,
            tipo: tipo,
            status: 'novo'
        } as never);  
    }

    useEffect(()=>{
        SetDefaultDate();
    },[]);

    useEffect(()=>{
        if(selectedMonth && tipo){
            GetListInfos(tipo);
        }
    }, [selectedMonth]);

    useEffect(()=>{
        if(menuEscolhido){
            HandleCriarNovo();
            console.log("Tipo: "+ tipo);
        }
    },[menuEscolhido]);


 


    return(
<Container >
    <SafeAreaView>
        <Iscrol refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>{  GetListInfos(tipo) }}/>}>

            <CabecalhoMenu titulo={ parametrosDoTipo[tipo].title } onPress={()=> navigation.goBack() } setMenuEscolhido={setMenuEscolhido} menuList={listaMenuPerfil} />

            { nomePaciente && loading == false &&
                <PacienteHeader nome={nomePaciente} tipo={"Hoje é "+ dataHoje} />
            }

            { loading == true && 
                <WrapLoadingPctInfos>
                    <LoadingIcon size="large" color="#FFFFFF"/>  
                </WrapLoadingPctInfos>
            }

            { !loading && infosList?.length > 0 &&
                infosList.map( (item, key) => {
                    return(
                        <List_PacienteItens data={item.date} about={item.about} key={key} onPress={()=>
                             Alert.alert(
                                "Deseja Editar esse item?",
                                parametrosDoTipo[tipo].title,
                                [
                                    { text: "Editar", onPress: () => HandleVaiEditar(item.id) },
                                    { text: "Cancelar", style: "cancel" }
                                ]
                            )
                        } />
                    )
                })
            }

            { !loading && tipo == "agendamentos" &&
                <DateWrapper>
                    {/* <Today>Hoje é {dataHoje}</Today> */}
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

            { !loading && tipo == 'agendamentos' && agendamentosList.length > 0 && agendamentosList.map( (item, key) => {
                return(
                    <WrapAppointment>
                        <AppointmentList
                            key={key}
                            status={item.status}
                            type={item.type}
                            date_scheduled={ item.date_scheduled.toString() }
                            start_hour={item.start_hour}
                            end_hour={item.end_hour}
                            onPress={()=>{ HandleVaiEditar(item.id) }}
                        />   
                    </WrapAppointment>
                )
            })}


            <BottomSpacer/>
              
        </Iscrol>
    </SafeAreaView>
</Container>
    )
}