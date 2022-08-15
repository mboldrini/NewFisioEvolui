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
    WrapAgendamentos,
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
import { format } from 'date-fns';
import { AppointmentList } from '../../../components/AppointmentList';
import { Iscrol } from '../../CadastrarPaciente/styles';
import { ModalAgendamento } from '../../../components/Modal/ModalAgendamento';
import IApointment from '../../../global/DTO/Apointment';
import { ButtonSimple } from '../../../components/Buttons/ButtonSimple/Index';
import { IPctInfos, IRoute, IAgendamentosApi, IPctInfosList, IExpandablesShow } from './Interfaces';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Modal } from 'react-native-ui-lib';
import { List_PacienteItens } from '../../../components/List_Items/PacienteItens';


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

    const [menuVisible, setMenuVisible] = useState(false);

    const [ isAgendamentoVisible, setIsAgendamentoVisible] = useState(false);
    // Appointment received from Modal
    const [appointment, setAppointment] = useState({} as IApointment | null);

    const [expandables, setExpandables] = useState<IExpandablesShow>({
        clinicalDiagnostic: false,
        complaint: false,
        hda: false,
        hpp: false,
        functional: false,
        physical: false,
        respiratory: false,
        objectives: false,
        evolution: false,
        guideline: false,
        appointments: false,
    });

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

        console.log("Paramsn:");
        console.log(JSON.stringify(params));

        await api(apiState.token).post('/clients/infos', params ).then(res => {

            console.log("Retorno:");
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

    function HandleInfosPage(tipo: string){
        navigation.navigate('ListaInfosPaciente' as never, { 
            idPaciente: pctInfos.id,
            nomePaciente: pctInfos.name,
            tipo: tipo,
        } as never)
        
    }

    const listaMenuPerfil = [
        { title: 'Diagnóstico Clínico',     action: () => HandleInfosPage("diagnosticoClinico") }, 
        { title: 'Queixa Principal',        action: () => HandleInfosPage("queixaPrincipal") }, 
        { title: 'HDA',                     action: () => HandleInfosPage("hda") },
        { title: 'HPP',                     action: () => HandleInfosPage("hpp") },
        { title: 'Avaliação Física',        action: () => HandleInfosPage("avaliacaoFisica") },
        { title: 'Avaliação Respiratória',  action: () => HandleInfosPage("avaliacaoRespiratoria") },
        { title: 'Diagnóstico Funcional',   action: () => HandleInfosPage("diagnosticoFuncional") },
        { title: 'Objetivos/Metas',         action: () => HandleInfosPage("objetivos") },
        { title: 'Evoluções',               action: () => HandleInfosPage("evolucoes") },
        { title: 'Orientações',             action: () => HandleInfosPage("orientacoes") },
        { title: 'Agendamentos',            action: () => HandleInfosPage("agendamentos") },
    ]



    useEffect(()=>{
        if(!id){
            console.log("Sem route ID");
        }else{
            GetPacienteInfos();
        }   
    }, []);

    useEffect(()=>{
        if(appointment?.date_scheduled){
            CadastraAgendamento();
        }
    },[appointment]);



    return(
        <Container >
        <SafeAreaView>
        <Iscrol refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>{ GetPacienteInfos() }}/>}>

            <ContainerCabecalho >
                <WrapLeft>
                    <IconeLeft name="chevron-left" onPress={() => navigation.goBack() }/>
                    <WrapTitle>
                        <Titulo>Perfil do Paciente</Titulo>
                    </WrapTitle>
                </WrapLeft>

                <IconeRight name="cog" onPress={() => setMenuVisible(true)} />

                <Modal transparent visible={menuVisible} style={{position: 'absolute'}}>
                    <SafeAreaView style={{flex: 1, zIndex: -2}} onTouchEnd={() => setMenuVisible(false)}>
                        <AreaMenu style={{zIndex: 3}}>
                            {listaMenuPerfil.map((op, i) => (
                                <BtnMenuList key={i} onPress={op.action } lastItem={ i === listaMenuPerfil.length -1 }>
                                    <IconeMenu name="list-ul" />
                                    <TituloMenu>{ op.title }</TituloMenu>
                                </BtnMenuList>
                            ))}
                        </AreaMenu>
                    </SafeAreaView>
                </Modal>
                
            </ContainerCabecalho>

            {/* <Cabecalho 
                titulo="Perfil do Paciente"
                onPress={handleNavigate}
            /> */}

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


 
                { infosList?.clinicalDiagnostic && infosList?.clinicalDiagnostic.length > 0 && 
                    <SectionExpandable top={false} expanded={expandables.clinicalDiagnostic}
                        sectionHeader={
                            <WrapExpandTitle>
                                <ExpandableTitle>Diagnóstico Clínico</ExpandableTitle>
                                <Icone name={expandables.clinicalDiagnostic ? 'chevron-up' : 'chevron-down'} onPress={() => setExpandables({...expandables, clinicalDiagnostic: !expandables.clinicalDiagnostic})}/>
                            </WrapExpandTitle>
                        }
                    >
                        { infosList?.clinicalDiagnostic.length >= 1 && 
                            infosList.clinicalDiagnostic.map( (item, key) => {
                                return(
                                    <List_PacienteItens data={item.date} about={item.about} key={key} onPress={()=> console.log(item.about)} />
                                )
                            })
                        }
                        <Line />
                    </SectionExpandable>
                } 

                { infosList?.complaints && infosList?.complaints.length > 0 && 
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
                                    <List_PacienteItens data={item.date} about={item.about} key={key} onPress={()=> console.log(item.about)} />
                                )
                            })
                        }
                        <Line />
                    </SectionExpandable>
                } 

                {infosList?.hda && infosList?.hda.length > 0 &&
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
                                    <List_PacienteItens data={item.date} about={item.about} key={key} onPress={()=> console.log(item.about)} />
                                )
                            })
                        }
                        <Line />
                    </SectionExpandable>
                }

                {infosList?.hpp && infosList?.hpp.length > 0 &&
                    <SectionExpandable top={false} expanded={expandables.hpp}
                        sectionHeader={
                            <WrapExpandTitle>
                                <ExpandableTitle>HPP - História Patológico Pregresso</ExpandableTitle>
                                <Icone name={expandables.hpp ? 'chevron-up' : 'chevron-down'} onPress={() => setExpandables({...expandables, hpp: !expandables.hpp})}/>
                            </WrapExpandTitle>
                        }
                    >
                        { infosList?.hpp.length >= 1 && 
                            infosList.hpp.map( (item, key) => {
                                return(
                                    <List_PacienteItens data={item.date} about={item.about} key={key} onPress={()=> console.log(item.about)} />
                                )
                            })
                        }
                        <Line />
                    </SectionExpandable>
                }

                {infosList?.physicalEvaluation && infosList?.physicalEvaluation.length > 0 &&
                    <SectionExpandable top={false} expanded={expandables.physical}
                        sectionHeader={
                            <WrapExpandTitle>
                                <ExpandableTitle>Avaliação Física</ExpandableTitle>
                                <Icone name={expandables.physical ? 'chevron-up' : 'chevron-down'} onPress={() => setExpandables({...expandables, physical: !expandables.physical})}/>
                            </WrapExpandTitle>
                        }
                    >
                        { infosList?.physicalEvaluation.length >= 1 && 
                            infosList.physicalEvaluation.map( (item, key) => {
                                return(
                                    <List_PacienteItens data={item.date} about={item.about} key={key} onPress={()=> console.log(item.about)} />
                                )
                            })
                        }
                        <Line />
                    </SectionExpandable>
                }

                {infosList?.respiratoryEvaluation && infosList?.respiratoryEvaluation.length > 0 &&
                    <SectionExpandable top={false} expanded={expandables.respiratory}
                        sectionHeader={
                            <WrapExpandTitle>
                                <ExpandableTitle>Avaliação Respiratória</ExpandableTitle>
                                <Icone name={expandables.respiratory ? 'chevron-up' : 'chevron-down'} onPress={() => setExpandables({...expandables, respiratory: !expandables.respiratory})}/>
                            </WrapExpandTitle>
                        }
                    >
                        { infosList?.respiratoryEvaluation.length >= 1 && 
                            infosList.respiratoryEvaluation.map( (item, key) => {
                                return(
                                    <List_PacienteItens data={item.date} about={item.about} key={key} onPress={()=> console.log(item.about)} />
                                )
                            })
                        }
                        <Line />
                    </SectionExpandable>
                }


                {infosList?.functionalDiagnostic && infosList?.functionalDiagnostic.length > 0 &&
                    <SectionExpandable top={false} expanded={expandables.functional}
                        sectionHeader={
                            <WrapExpandTitle>
                                <ExpandableTitle>Diagnóstico Funcional</ExpandableTitle>
                                <Icone name={expandables.functional ? 'chevron-up' : 'chevron-down'} onPress={() => setExpandables({...expandables, functional: !expandables.functional})}/>
                            </WrapExpandTitle>
                        }
                    >
                        { infosList?.functionalDiagnostic.length >= 1 && 
                            infosList.functionalDiagnostic.map( (item, key) => {
                                return(
                                    <List_PacienteItens data={item.date} about={item.about} key={key} onPress={()=> console.log(item.about)} />
                                )
                            })
                        }
                        <Line />
                    </SectionExpandable>
                }

                
                {infosList?.objectives && infosList?.objectives.length > 0 &&
                    <SectionExpandable top={false} expanded={expandables.objectives}
                        sectionHeader={
                            <WrapExpandTitle>
                                <ExpandableTitle>Objetivos e Metas</ExpandableTitle>
                                <Icone name={expandables.objectives ? 'chevron-up' : 'chevron-down'} onPress={() => setExpandables({...expandables, objectives: !expandables.objectives})}/>
                            </WrapExpandTitle>
                        }
                    >
                        { infosList?.objectives.length >= 1 && 
                            infosList.objectives.map( (item, key) => {
                                return(
                                    <List_PacienteItens data={item.date} about={item.about} key={key} onPress={()=> console.log(item.about)} />
                                )
                            })
                        }
                        <Line />
                    </SectionExpandable>
                }

                {infosList?.guideline && infosList?.guideline.length > 0 &&
                    <SectionExpandable top={false} expanded={expandables.objectives}
                        sectionHeader={
                            <WrapExpandTitle>
                                <ExpandableTitle>Orientações</ExpandableTitle>
                                <Icone name={expandables.guideline ? 'chevron-up' : 'chevron-down'} onPress={() => setExpandables({...expandables, guideline: !expandables.guideline})}/>
                            </WrapExpandTitle>
                        }
                    >
                        { infosList?.guideline.length >= 1 && 
                            infosList.guideline.map( (item, key) => {
                                return(
                                    <List_PacienteItens data={item.date} about={item.about} key={key} onPress={()=> console.log(item.about)} />
                                )
                            })
                        }
                        <Line />
                    </SectionExpandable>
                }

                {infosList?.appointment &&
                    <SectionExpandable top={false} expanded={expandables.appointments}
                        sectionHeader={
                            <WrapExpandTitle>
                                <ExpandableTitle>Agendamentos do Mês</ExpandableTitle>
                                <Icone name={expandables.appointments ? 'chevron-up' : 'chevron-down'} onPress={() => setExpandables({...expandables, appointments: !expandables.appointments})}/>
                            </WrapExpandTitle>
                        }
                    >
                        { infosList?.appointment.length >= 1 && 
                            infosList.appointment.map( (item, key) => {
                                return(
                                    <List_PacienteItens data={item.date} about={item.about} key={key} onPress={()=> console.log(item.about)} />
                                )
                            })
                        }

                        <WrapGroupBtn>
                    <ButtonSimple
                        type="default"
                        title="Agendar Atendimento" 
                        onPress={()=> setIsAgendamentoVisible(true) }
                    />
                </WrapGroupBtn>

                    <Line />

                    </SectionExpandable>
                }


                {/*


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

            


            </>
            }

            { loading == true && 
            <WrapLoadingPctInfos>
                <LoadingIcon size="large" color="#FFFFFF"/>  
            </WrapLoadingPctInfos>
            }

            <BottomSpacer/>
              
            { pctInfos?.serviceType &&
                <ModalAgendamento 
                    isVisible={isAgendamentoVisible} 
                    setIsVisible={()=> setIsAgendamentoVisible(false) }
                    setSelectedApointment={setAppointment}
                    idServiceType={pctInfos.serviceType.id}
                />
            }

        </Iscrol>
        </SafeAreaView>
        </Container>
    )
}