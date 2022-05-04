import React, {useEffect, useState}from 'react';
import {RefreshControl} from 'react-native';
import {useNavigation, useRoute } from '@react-navigation/native';
import { 
    Container,
    WrapGroup,
    Title,
    WrapInfo,
    Spacer,
    Icone,
    InfoArea,
    Description,
    Info,
    InfoTexto,
    WrapLoadingPctInfos,
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
import { ButtonSimple } from '../../../components/Forms/ButtonSimple/Index';


interface IPctInfos{
    id: number,
    nome: string,
    cpf: string,
    dataNascimento: string,
    celular: string,
    email: string,
    tipoAtendimento: string,
    temComorbidade: boolean,
    logradouro: string,
    queixamotivo: string,
    diagnosticos: string,
    comorbidades: string
}

interface IAgendamentos{
    id: number,
    hora: number,
    data: string,
    tipo: number,
    status: number
}

interface IAgendamentosApi{
    id: number,
    dataHora: string,
    data: string,
    tipo: number,
    status: number
}

interface IRoute{
    id: number
}

export function PacientePerfil(){

    const navigation = useNavigation();
    const [refreshing, setRefresh] = useState(false);

    const route = useRoute();
    const { id } = route.params as IRoute;
    /// Redux
    const apiState = useSelector((state: State) => state.apiReducer);

    const [loading, setLoading] = useState(true);
    const [pctInfos, setPctInfos] = useState<IPctInfos>(null);
    // Agendamentos do paciente
    const [loadingAgendamentos, setLoadingAgendamentos] = useState(true);
    const [pctAgendamentos, setPctAgendamentos] = useState<IAgendamentos[]>([]);
    
    const [selectedYear, setSelectedYear] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState(0);


    const [ isAgendamentoVisible, setIsAgendamentoVisible] = useState(false);
    // Appointment received from Modal
    const [appointment, setAppointment] = useState({} as IApointment | null);

    
    function handleNavigate(){ navigation.goBack(); }

    async function GetPacienteInfos(){

        setLoading(true);

        await api(apiState.token).get('/paciente/'+ id ).then(res => {

            setPctInfos(res.data);

            setLoading(false);

        }).catch(err => {
            console.log(err);

            Toast.show({
                type: 'error',
                text1: 'OPS! erro ao obter informações do paciente.',
                text2: `${err}`
            });

            setTimeout(() => {
                navigation.goBack();
            }, 3000);

        });
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

    function GetDateRange(id: number){
        let data = new Date(selectedYear, selectedMonth);
        let startDate = format(data, 'yyyy/MM/dd');
        let endDate = format(lastDayOfMonth( data ), 'yyyy/MM/dd');

        let agendaSelecionada = {
            "paciente_id": id,
            "dataInicio": startDate,
            "dataFim": endDate
        }
        return agendaSelecionada
    }

    function MontaListaAgendamentos(listaAgendamentos: IAgendamentosApi[]){

        function FormatHoraAgendamento(dtHora: string){
            let [ data, horario] = dtHora.split("T");
            return parseInt( horario.split(":")[0] );
        }
    
        function FormatDataAgendamento(dtHora: string){
            let [ data, horario] = dtHora.split("T");
            return data;
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
                hora: FormatHoraAgendamento(agendamento.dataHora),
                data: FormatDataAgendamento(agendamento.dataHora)
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

        function DefineDataHoje(){
            let d = new Date();
            setSelectedMonth(getMonth(d));
            setSelectedYear(getYear(d));
        }

        if(!id){
            console.log("Sem route ID");
        }else{
            GetPacienteInfos();
            DefineDataHoje();
        }   

    }, []);

    useEffect(()=>{
        if(pctInfos?.nome.length > 2 && id){
            GetAgendamentos();
        }
    }, [selectedMonth]);


    useEffect(()=>{
        if(appointment?.data){
            CadastraAgendamento();
        }
    },[appointment]);



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
                    tipo={pctInfos.tipoAtendimento}
                    nome={pctInfos.nome}
                />

                <WrapGroup>
                    <Title>Informações Pessoais</Title>

                    <Spacer/>

                    <WrapInfo>
                        <Icone name="calendar-day"/>
                        <InfoArea>
                            <Description>Data de Nascimento</Description>
                            <Info>{ pctInfos?.dataNascimento }</Info>
                        </InfoArea>
                    </WrapInfo>

                    <Spacer/>

                    <WrapInfo>
                        <Icone name="id-card"/>
                        <InfoArea>
                            <Description>CPF</Description>
                            <Info>{ pctInfos?.cpf}</Info>
                        </InfoArea>
                    </WrapInfo>

                </WrapGroup>

                <WrapGroup>
                    <Title>Informações de Contato</Title>
                    
                    <WrapInfo>
                        <Icone name="whatsapp"/>
                        <InfoArea>
                            <Description>Celular</Description>
                            <Info>{ pctInfos.celular }</Info>
                        </InfoArea>
                    </WrapInfo>

                    <Spacer/>

                    { pctInfos?.telefoneRecado && 
                        <WrapInfo>
                            <Icone name="phone"/>
                            <InfoArea>
                                <Description>Tel. Recado</Description>
                                <Info>{ pctInfos.telefoneRecado }</Info>
                            </InfoArea>
                        </WrapInfo>
                    }

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
                            <Info>{ pctInfos.logradouro }</Info>
                        </InfoArea>
                    </WrapInfo>
                </WrapGroup>

                { (pctInfos.temComorbidade || pctInfos?.queixamotivo?.length > 1 || pctInfos?.diagnosticos?.length > 1) && 
                <WrapGroup>
                    <Title>Informações de Médicas</Title>
                    
                    { pctInfos.temComorbidade && 
                        <WrapInfo>
                            <Icone name="star-of-life"/>
                            <InfoArea>
                                <Description>Comorbidade</Description>
                                <InfoTexto>{ pctInfos?.comorbidades }</InfoTexto>
                            </InfoArea>
                        </WrapInfo>
                    }

                    { pctInfos?.queixamotivo?.length > 1 && 
                        <WrapInfo>
                            <Icone name="star-of-life"/>
                            <InfoArea>
                                <Description>Queixa/Motivo do atendimento</Description>
                                <InfoTexto>{ pctInfos?.queixamotivo }</InfoTexto>
                            </InfoArea>
                        </WrapInfo>
                    }

                    { pctInfos?.diagnosticos?.length > 1 && 
                        <WrapInfo>
                            <Icone name="star-of-life"/>
                            <InfoArea>
                                <Description>Diagnóstico Inicial</Description>
                                <InfoTexto>{ pctInfos?.diagnosticos }</InfoTexto>
                            </InfoArea>
                        </WrapInfo>
                    }
                </WrapGroup>
                }

                <WrapGroup>
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
                    { pctAgendamentos.length >= 1 && pctAgendamentos.map( (item, key) => {
                            return(
                                <AppointmentList
                                    key={key}
                                    status={item.status}
                                    hour={item.hora}
                                    date={item.data}
                                    type={item.tipo}
                                    onPress={()=>{ navigation.navigate('PacienteAtendimento' as never, { id: item.id} as never) }}
                                />   
                            )
                        })
                    }
                    </WrapAgendamentos>
                </WrapGroup>

                <WrapGroup>
                    <ButtonSimple
                        type="default"
                        title="Agendar Atendimento" 
                        onPress={()=> setIsAgendamentoVisible(true) }
                    />
                </WrapGroup>


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