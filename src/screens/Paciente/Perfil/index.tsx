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
    WrapAnimation,
    TextLoadingPctInfos,
    
    DateWrapper,
    Today,
    SelectDateWrapper,
    IconeChangeMonth,
    ChangeMonthLeft,
    ChangeMonthRight,
    Month,

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
import LottieView from 'lottie-react-native';
import { months, days, daysLong} from '../../../global/variaveis/Dates';
import { getDayOfYear, getDay, getMonth, getYear, addMonths, getDaysInMonth, getDate } from 'date-fns';

//import { AppointmentSimple } from '../../../components/AppointmentSimple'; 


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

export function PacientePerfil(){

    const navigation = useNavigation();
    const [refreshing, setRefresh] = useState(false);

    const route = useRoute();
    const [routeId, setRouteId] = useState(route.params);

    const apiState = useSelector((state: State) => state.apiReducer);

    const [loading, setLoading] = useState(true);
    const [pctInfos, setPctInfos] = useState<IPctInfos>(null);
    const [pctAgendamentos, setPctAgendamentos] = useState(null);

    
    const [atualDate, setAtualDate] = useState(null);
    const [dtHojeExtenso, setDtHojeExtenso] = useState(null);
    const [selectedYear, setSelectedYear] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState(0);
    
    function handleNavigate(){ navigation.goBack(); }

    async function GetPacienteInfos(){

        setLoading(true);

        await api(apiState.token).get('/paciente/'+ routeId.id).then(res => {

            setPctInfos(res.data);

            setLoading(false);

        }).catch(err => {
            console.log(err);

            Toast.show({
                type: 'error',
                text1: 'OPS! erro ao obter informações do paciente.',
               // text2: `${err}` // 'This is some something 👋'
            });
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

    useEffect(()=>{
        if(!routeId.id){
            console.log("Sem route ID");
        }else{
            GetPacienteInfos();
        }

        function DefineDataHoje(){
            let d = new Date();
            setDtHojeExtenso(`${daysLong[d.getDay()]} - ${d.getDate()}/${months[d.getMonth()]}/${d.getFullYear()}`);
            setAtualDate(d);
            setSelectedMonth(getMonth(d));
        }
        DefineDataHoje();
    }, []);



    return(
        <Container refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>{ GetPacienteInfos() }}/>}>
            
            <Cabecalho 
                titulo="Perfil do Paciente"
                onPress={handleNavigate}
            />
            <Toast position={'top'}  autoHide={true} visibilityTime={6000} onPress={()=>Toast.hide()}/>
        
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
                        <Today>Hoje é {dtHojeExtenso}</Today>
                        <SelectDateWrapper>
                            <ChangeMonthLeft onPress={ ()=> {handleDateClick("left")} }>
                                <IconeChangeMonth name="chevron-left"/>
                            </ChangeMonthLeft>
                            <Month>{ months[selectedMonth] }</Month>
                            <ChangeMonthRight onPress={ ()=> {handleDateClick("right")} }>
                                <IconeChangeMonth name="chevron-right"/>
                            </ChangeMonthRight>
                        </SelectDateWrapper>
                    </DateWrapper>

                    

                    {/* { listaAgenda.length > 0 && listaAgenda.map((item, key) =>{
                        return(
                            <AppointmentSimple 
                                diaSemana={item.diaSemana}
                                dataAgendamento={item.dataAgendamento}
                                horario={item.horario}
                                tipoAgendamento={item.tipoAgendamento}
                                dataLimite={item.DataLimite}
                                onPress={()=>{console.log(key)}}
                            />
                        )
                    }) } */}
                </WrapGroup>
            </>
            }

            { loading == true && 
            <WrapLoadingPctInfos>
                <WrapAnimation>
                <LottieView
                    source={require('../../../assets/loadingAnimado250.json')}
                    autoSize={false}
                    autoPlay
                    loop
                />
                </WrapAnimation>
                <TextLoadingPctInfos>Carregando informações do paciente...</TextLoadingPctInfos>
            </WrapLoadingPctInfos>
            }

            <BottomSpacer/>
              

        </Container>
    )
}