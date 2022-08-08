import React, {useEffect, useState}from 'react';
import {RefreshControl} from 'react-native';
import {useNavigation, useRoute } from '@react-navigation/native';
import { 
    Container,
    WrapGroup,
    WrapGroupBtn,
    Title,
    WrapInfo,
    Spacer,
    Icone,

    WrapIconeEdit,
    IconeItemEdit,
    InfoArea,
    Description,
    Info,
    InfoTexto,
    WrapLoadingPctInfos,

    SectionExpandable,
    WrapExpandTitle,
    ExpandableTitle,
    Line,
    WrapInfoList,

    DateWrapper,
    SelectDateWrapper,
    IconeChangeMonth,
    ChangeMonthLeft,
    ChangeMonthRight,
    Month,
    WrapAgendamentos,
    WrapToast,
    LoadingIcon,
    TextSemAgendamentos
} from './styles';
import Toast from 'react-native-toast-message';

import { Cabecalho } from '../../../components/Cabecalho';
import { PacienteHeader } from '../../../components/PacienteHeader';
import { BottomSpacer } from '../../../components/BottomSpacer';
// API
import { api } from '../../../global/api';
// REDUX
import { useSelector } from 'react-redux';
import { State } from '../../../state';
// Imports
import { months} from '../../../global/variaveis/Dates';
import { getMonth, getYear, lastDayOfMonth, format } from 'date-fns';
import { AppointmentList } from '../../../components/AppointmentList';
import { Iscrol } from '../../CadastrarPaciente/styles';
import { ModalAgendamento } from '../../../components/Modal/ModalAgendamento';
import IApointment from '../../../global/DTO/Apointment';
import { ButtonSimple } from '../../../components/Buttons/ButtonSimple/Index';
import { IPctInfos, IAgendamentos, IRoute, IAgendamentosApi, IPctInfosList } from './Interfaces';


export function PacientePerfil(){

    const navigation = useNavigation();
    const [refreshing, setRefresh] = useState(false);

    const route = useRoute();
    const { id } = route.params as IRoute;
    /// Redux
    const apiState = useSelector((state: State) => state.apiReducer);

    const [loading, setLoading] = useState(true);
    /// Infos do Paciente
    const [pctInfos, setPctInfos] = useState<IPctInfos>(null);
    const [infosList, setInfosList] = useState<IPctInfosList>(null);

    // // Agendamentos do paciente
    // const [loadingAgendamentos, setLoadingAgendamentos] = useState(true);
    // const [pctAgendamentos, setPctAgendamentos] = useState<IAgendamentos[]>([]);
    // const [selectedYear, setSelectedYear] = useState(0);
    // const [selectedMonth, setSelectedMonth] = useState(0);


    const [ isAgendamentoVisible, setIsAgendamentoVisible] = useState(false);
    // Appointment received from Modal
    const [appointment, setAppointment] = useState({} as IApointment | null);


    const [exp1, setExp1] = useState(true);

    const [expandables, setExpandables] = useState({
        complaint: false,
        hda: false
    });

    
    function handleNavigate(){ navigation.goBack(); }


    async function GetPacienteInfos(){
        console.group("GetPacienteInfos");

        setLoading(true);

        await api(apiState.token).get('/clients/'+ id ).then(res => {

            setPctInfos(res.data);

            setLoading(false);

            console.log(res.data);

            GetPacienteInfosList(id);

        }).catch(err => {
            console.log(err);

            Toast.show({
                type: 'error',
                text1: 'OPS! erro ao obter informações do paciente.',
                text2: `${err}`
            });

        });
        console.groupEnd();
    }

    async function GetPacienteInfosList(id: number){
        console.group("GetPacienteInfosList");

        const params = {
            "client_id": id,
            "date": new Date()
        }

        await api(apiState.token).post('/clients/infos', params ).then(res => {

            console.log(res.data);

            setInfosList(res.data);

        }).catch(err => {
            console.log(err);

            Toast.show({
                type: 'error',
                text1: 'OPS! erro ao obter a lista informações do paciente.',
                text2: `${err}`
            });

        });

        console.groupEnd();
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
    }

    function MontaListaAgendamentos(listaAgendamentos: IAgendamentosApi[]){

        function FormatHoraAgendamento(dtHora: string){
            let horario = new Date(parseInt(dtHora));
            let horarioString = horario.getHours() +":"+ horario.getMinutes();
            return horarioString;
        }
    
        function FormatDataAgendamento(dtHora: string){
            return format(new Date(parseInt(dtHora)), 'dd/M/yyyy');
        }

        if(listaAgendamentos?.length < 1){
            Toast.show({
                type: 'info',
                text1: 'Sem agendamentos para o mês escolhido',
            });    

            setLoadingAgendamentos(false);

        }else{

            let agendamentoFormatado = listaAgendamentos.map( agendamento => ({
                id: agendamento.id,
                status: agendamento.status,
                tipo: agendamento.tipo,
                timestamp: parseInt(agendamento.timestamp)
            }));

            setPctAgendamentos(agendamentoFormatado);
            setLoadingAgendamentos(false);

        }
    }

    async function GetAgendamentos(){

        setPctAgendamentos([]);
        setLoadingAgendamentos(true);
        
        await api(apiState.token).post('/agendamento/all', GetDateRange(id) ).then(res =>{
            
            MontaListaAgendamentos(res.data);

        }).catch(err => {

            console.log("erro?");
            console.log(err);     
            
            Toast.show({
                type: 'error',
                text1: 'OPS! erro ao obter agendamentos do paciente.',
                text2: `${err}`
            });    

            setLoadingAgendamentos(false);

        });

    }

    async function CadastraAgendamento(){
        console.log("Cadastra novo agendamento p/ o pct");

        let infos = {
            "paciente_id": id,
            "agendamentos":[ appointment ]
        }
        await api(apiState.token).post('agendamento/', infos).then(res =>{

            console.log("cadastrou");
            console.log(res);

            Toast.show({
                type: 'success',
                text1: '😄 Agendamento cadastrado com sucesso',
                text2: 'É só atualizar a lista novamente'
            });

        }).catch(err =>{

            console.log("erro ao cadastrar");
            console.log(err);

            Toast.show({
                type: 'error',
                text1: '❌ Erro ao cadastrar atendimento',
            });

            setAppointment(null);

        });
    }


    useEffect(()=>{
        if(!id){
            console.log("Sem route ID");
        }else{
            GetPacienteInfos();
        }   
    }, []);

    // useEffect(()=>{
    //     if(pctInfos?.name.length > 2 && id){
    //         GetAgendamentos();
    //     }
    // }, [selectedMonth]);


    // useEffect(()=>{
    //     if(appointment?.data){
    //         CadastraAgendamento();
    //     }
    // },[appointment]);



    return(
        <Container >
            <WrapToast>
                <Toast position={'top'}  autoHide={true} visibilityTime={6000} onPress={()=>Toast.hide()}/>
            </WrapToast>
        <Iscrol refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>{ GetPacienteInfos() }}/>}>

            <Cabecalho 
                titulo="Perfil do Paciente"
                onPress={handleNavigate}
            />
        
            { pctInfos && loading == false &&
            <>

                <PacienteHeader 
                    iconeTipo="hospital"
                    tipo={pctInfos.serviceType.name}
                    nome={pctInfos.name}
                />

                <WrapGroup>
                    <Title>Informações Pessoais</Title>

                    <Spacer/>

                    <WrapInfo>
                        <Icone name="calendar-day"/>
                        <InfoArea>
                            <Description>Data de Nascimento</Description>
                            <Info>{ format( new Date(pctInfos?.dataNascimento), 'dd/MM/yyyy') }</Info>
                        </InfoArea>
                    </WrapInfo>

                    <Spacer/>

                    <WrapInfo>
                        <Icone name="id-card"/>
                        <InfoArea>
                            <Description>CPF</Description>
                            <Info>{ pctInfos?.document}</Info>
                        </InfoArea>
                    </WrapInfo>

                </WrapGroup>

                <WrapGroup>
                    <Title>Informações de Contato</Title>
                    
                    <WrapInfo>
                        <Icone name="whatsapp"/>
                        <InfoArea>
                            <Description>Celular</Description>
                            <Info>{ pctInfos.celphone }</Info>
                        </InfoArea>
                    </WrapInfo>

                    <Spacer/>

                    { pctInfos.email && 
                        <WrapInfo>
                            <Icone name="envelope"/>
                            <InfoArea>
                                <Description>E-mail</Description>
                                <Info>{ pctInfos.email }</Info>
                            </InfoArea>
                        </WrapInfo>
                    }

                    <Spacer/>

                    <WrapInfo>
                        <Icone name="map-pin"/>
                        <InfoArea>
                            <Description>Endereço</Description>
                            <Info>{ pctInfos.address }</Info>
                        </InfoArea>
                    </WrapInfo>
                </WrapGroup>


                { infosList?.complaints && 
                    <SectionExpandable top={false} expanded={expandables.complaint}
                        sectionHeader={
                            <WrapExpandTitle>
                                <ExpandableTitle>Queixa Principal</ExpandableTitle>
                                <Icone name={expandables.complaint ? 'chevron-up' : 'chevron-down'} onPress={() => setExpandables({...expandables, complaint: !expandables.complaint})}/>
                            </WrapExpandTitle>
                        }
                    >
                        { infosList?.complaints.length >= 1 && 
                            infosList.complaints.map( (item, key) => {
                                return(
                                    <WrapInfoList key={key +"-"+ item.date}>
                                        <InfoArea>
                                            <Description>{ format(new Date(item.date), 'dd/MM/yyyy' ) }</Description>
                                            <InfoTexto>{ item.complaint }</InfoTexto>
                                        </InfoArea>
                                        <WrapIconeEdit onPress={()=> console.log(item)}>
                                            <IconeItemEdit name="ellipsis-v" />
                                        </WrapIconeEdit>
                                    </WrapInfoList>
                                )
                            })
                        }
                        <Line />
                    </SectionExpandable>
                } 

                {infosList?.hda &&
                    <SectionExpandable top={false} expanded={expandables.hda}
                        sectionHeader={
                            <WrapExpandTitle>
                                <ExpandableTitle>HDA - História da Doença Atual</ExpandableTitle>
                                <Icone name={expandables.hda ? 'chevron-up' : 'chevron-down'} onPress={() => setExpandables({...expandables, hda: !expandables.hda})}/>
                            </WrapExpandTitle>
                        }
                    >
                        { infosList?.hda.length >= 1 && 
                            infosList.hda.map( (item, key) => {
                                return(
                                    <WrapInfoList key={key +"-"+ item.date}>
                                        <InfoArea>
                                            <Description>{ format(new Date(item.date), 'dd/MM/yyyy' ) }</Description>
                                            <InfoTexto>{ item.hda }</InfoTexto>
                                        </InfoArea>
                                        <WrapIconeEdit onPress={()=> console.log(item)}>
                                            <IconeItemEdit name="ellipsis-v" />
                                            </WrapIconeEdit>
                                        </WrapInfoList>
                                )
                            })
                        }
                        <Line />
                    </SectionExpandable>
                }




                {/*

                { infosList?.hpp && 
                    <WrapGroup>
                        <Title>HPP - História Patológico Pregresso</Title>

                        { infosList?.hpp.length >= 1 && 
                            infosList.hpp.map( (item, key) => {
                                return(
                                    <WrapInfo  key={key + item.date}>
                                        <InfoArea>
                                            <Description>{ format(new Date(item.date), 'dd/MM/yyyy' ) }</Description>
                                            <InfoTexto>{ item.hpp }</InfoTexto>
                                        </InfoArea>
                                    </WrapInfo>

                                )
                            })
                        }
                    </WrapGroup>
                } 

                { infosList?.functional && 
                    <WrapGroup>
                        <Title>Diagnóstico Funcional</Title>

                        { infosList?.functional.length >= 1 && 
                            infosList.functional.map( (item, key) => {
                                return(
                                    <WrapInfo key={key + item.date}>
                                        <InfoArea>
                                            <Description>{ format(new Date(item.date), 'dd/MM/yyyy' ) }</Description>
                                            <InfoTexto>{ item.diagnosis }</InfoTexto>
                                        </InfoArea>
                                    </WrapInfo>

                                )
                            })
                        }
                    </WrapGroup>
                } 

                { infosList?.physical && 
                    <WrapGroup>
                        <Title>Avaliação Física</Title>

                        { infosList?.physical.length >= 1 && 
                            infosList.physical.map( (item, key) => {
                                return(
                                    <WrapInfo key={key + item.date}>
                                        <InfoArea>
                                            <Description>{ format(new Date(item.date), 'dd/MM/yyyy' ) }</Description>
                                            <InfoTexto>{ item.evaluation }</InfoTexto>
                                        </InfoArea>
                                    </WrapInfo>

                                )
                            })
                        }
                    </WrapGroup>
                } 

                { infosList?.respiratory && 
                    <WrapGroup>
                        <Title>Avaliação Respiratória</Title>

                        { infosList?.respiratory.length >= 1 && 
                            infosList.respiratory.map( (item, key) => {
                                return(
                                    <WrapInfo key={key + item.date}>
                                        <InfoArea>
                                            <Description>{ format(new Date(item.date), 'dd/MM/yyyy' ) }</Description>
                                            <InfoTexto>{ item.evaluation }</InfoTexto>
                                        </InfoArea>
                                    </WrapInfo>

                                )
                            })
                        }
                    </WrapGroup>
                } 

                { infosList?.objectives && 
                    <WrapGroup>
                        <Title>Objetivos e Metas</Title>

                        { infosList?.objectives.length >= 1 && 
                            infosList.objectives.map( (item, key) => {
                                return(
                                    <WrapInfo key={key + item.date}>
                                        <InfoArea>
                                            <Description>{ format(new Date(item.date), 'dd/MM/yyyy' ) }</Description>
                                            <InfoTexto>{ item.objectives }</InfoTexto>
                                        </InfoArea>
                                    </WrapInfo>

                                )
                            })
                        }
                    </WrapGroup>
                }  */}





                {/* <WrapGroup>
                    <Title>Agendamentos do Paciente</Title>

                    <DateWrapper>
                        <SelectDateWrapper>
                            <ChangeMonthLeft onPress={ ()=> {handleDateClick("left")} }>
                                <IconeChangeMonth name="chevron-left"/>
                            </ChangeMonthLeft>
                            <Month>{ months[selectedMonth] } - { selectedYear }</Month>
                            <ChangeMonthRight onPress={ ()=> {handleDateClick("right")} }>
                                <IconeChangeMonth name="chevron-right"/>
                            </ChangeMonthRight>
                        </SelectDateWrapper>
                    </DateWrapper>

                    { (pctAgendamentos.length < 1 && loadingAgendamentos == true) &&
                        <WrapAgendamentos>
                            <LoadingIcon size="large" color="#FFFFFF"/>                    
                        </WrapAgendamentos>
                    }

                    { (pctAgendamentos.length < 1 && loadingAgendamentos === false) &&
                        <WrapAgendamentos>
                            <TextSemAgendamentos>Nenhum agendamento encontrado</TextSemAgendamentos>
                        </WrapAgendamentos>
                    }

                    <WrapAgendamentos>
                    { pctAgendamentos.length >= 1 && 
                        pctAgendamentos.map( (item, key) => {
                            return(
                                <AppointmentList
                                    key={key}
                                    status={item.status}
                                    type={item.tipo}
                                    timestamp={item.timestamp}
                                    onPress={()=>{ navigation.navigate('PacienteAtendimento' as never, { id: item.id} as never) }}
                                />   
                            )
                        })
                    }
                    </WrapAgendamentos>
                </WrapGroup> */}

                <WrapGroupBtn>
                    <ButtonSimple
                        type="default"
                        title="Agendar Atendimento" 
                        onPress={()=> setIsAgendamentoVisible(true) }
                    />
                </WrapGroupBtn>


            </>
            }

            { loading == true && 
            <WrapLoadingPctInfos>
                <LoadingIcon size="large" color="#FFFFFF"/>  
            </WrapLoadingPctInfos>
            }

            <BottomSpacer/>
              
            <ModalAgendamento 
                isVisible={isAgendamentoVisible} 
                setIsVisible={()=> setIsAgendamentoVisible(false) }
                setSelectedApointment={setAppointment}
            />

        </Iscrol>
        </Container>
    )
}