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
    InfoTexto
} from './styles';

import { Cabecalho } from '../../../components/Cabecalho';
import { PacienteHeader } from '../../../components/PacienteHeader';
import { BottomSpacer } from '../../../components/BottomSpacer';
// API
import { api } from '../../../global/api';
// REDUX
import { useSelector } from 'react-redux';
import { State } from '../../../state';

//import { AppointmentSimple } from '../../../components/AppointmentSimple'; 


interface IRoute{
    id: number;
}

interface IPctInfos{
    id: number,
    cpf: string,
    nome: string,
    email: string,
    bairro: string,
    celular: string,
    user_id: string,
    excluido: boolean,
    logradouro: string,
    referencia: string,
    updated_at: string,
    created_at:  string, 
    comorbidades: string,
    diagnosticos: string,
    queixamotivo: string,
    dataNascimento: string, 
    telefoneRecado: string,
    temComorbidade: boolean,
    tipoAtendimento: string,
}

export function PacientePerfil(){

    const navigation = useNavigation();
    const [refreshing, setRefresh] = useState(false);

    const route = useRoute();
    const [routeId, setRouteId] = useState(route.params);

    const apiState = useSelector((state: State) => state.apiReducer);

    const [pctInfos, setPctInfos] = useState<IPctInfos>(null);
    
    function handleNavigate(){
        navigation.navigate('Home' as never);
    }

    async function GetPacienteInfos(id: number){

        await api(apiState.token).get('/paciente/'+ id).then(res => {

            console.log("ok?");
            console.log(res.data);
            setPctInfos(res.data);

        }).catch(err => {
            console.log(err);
        });
    }

    useEffect(()=>{
        console.log(routeId);
        GetPacienteInfos(routeId.id);
    }, []);

    useEffect(()=>{
        if(pctInfos?.queixamotivo){
            console.log(pctInfos.queixamotivo);
            console.log(pctInfos.queixamotivo.length);

        }
    },[pctInfos]);


    let listaAgenda = [
        {
            diaSemana: 1,
            dataAgendamento: new Date(2021,10,8),//"08/11/2021",
            horario: "09:00AM",
            tipoAgendamento:0,
            DataLimite:"11/11/2023",
        },
        {
            diaSemana: 2,
            dataAgendamento: new Date(2021,10,9),//"09/11/2021",
            horario: "09:00AM",
            tipoAgendamento:1,
            DataLimite:"11/11/2023",
        },
        {
            diaSemana: 3,
            dataAgendamento: new Date(2021,10,8),// "08/11/2021",
            horario: "09:00AM",
            tipoAgendamento:0,
            DataLimite:"11/11/2023",
        },
        {
            diaSemana: 5,
            dataAgendamento: new Date(2021,10,8),//"08/11/2021",
            horario: "09:00AM",
            tipoAgendamento:0,
            DataLimite:"11/11/2023",
        }
    ];

    return(
        <Container refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>{}}/>}>
            
            <Cabecalho 
                titulo="Perfil do Paciente"
                onPress={handleNavigate}
            />
        
            { pctInfos && 
                <>

                <PacienteHeader 
                    iconeTipo="hospital"
                    tipo="Plano Unimed SP"
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

            <WrapGroup>
                <Title>Informações de Médicas</Title>
                
                { pctInfos.temComorbidade && 
                    <WrapInfo>
                        <Icone name="star-of-life"/>
                        <InfoArea>
                            <Description>Comorbidade</Description>
                            <InfoTexto>{ pctInfos.comorbidades }</InfoTexto>
                        </InfoArea>
                    </WrapInfo>
                }

                { pctInfos.queixamotivo && 
                    <WrapInfo>
                        <Icone name="star-of-life"/>
                        <InfoArea>
                            <Description>Queixa/Motivo do atendimento</Description>
                            <InfoTexto>{ pctInfos.queixamotivo }</InfoTexto>
                        </InfoArea>
                    </WrapInfo>
                }

                { pctInfos.diagnosticos && 
                    <WrapInfo>
                        <Icone name="star-of-life"/>
                        <InfoArea>
                            <Description>Diagnóstico Inicial</Description>
                            <InfoTexto>{ pctInfos.diagnosticos }</InfoTexto>
                        </InfoArea>
                    </WrapInfo>
                }
            </WrapGroup>

            <WrapGroup>
                <Title>Agendamentos do Paciente</Title>

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
            

            <BottomSpacer/>
              

        </Container>
    )
}