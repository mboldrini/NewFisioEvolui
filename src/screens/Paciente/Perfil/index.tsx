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
} from './styles';

import { Cabecalho } from '../../../components/Cabecalho';
import { PacienteHeader } from '../../../components/PacienteHeader';
import { BottomSpacer } from '../../../components/BottomSpacer';
//import { AppointmentSimple } from '../../../components/AppointmentSimple'; 

export function PacientePerfil(){

    const navigation = useNavigation();
    const route = useRoute();
    const [refreshing, setRefresh] = useState(false);

    const [routeId, setRouteId] = useState(route.params);
    
    function handleNavigate(){
        navigation.navigate('Home' as never);
    }

    useEffect(()=>{
        console.log(`Recebeu via URL: ${route.params}`);
    }, []);


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

            <PacienteHeader 
                iconeTipo="hospital"
                tipo="Plano Unimed SP"
                nome="Paulo Muzzy"
            />

            <WrapGroup>
                <Title>Informações Pessoais</Title>

                <WrapInfo>
                    <Icone name="user"/>
                    <InfoArea>
                        <Description>Nome</Description>
                        <Info>Descricao</Info>
                    </InfoArea>
                </WrapInfo>

                <Spacer/>

                <WrapInfo>
                    <Icone name="calendar-day"/>
                    <InfoArea>
                        <Description>Data de Nascimento</Description>
                        <Info>01/01/2001</Info>
                    </InfoArea>
                </WrapInfo>

                <Spacer/>

                <WrapInfo>
                    <Icone name="id-card"/>
                    <InfoArea>
                        <Description>CPF</Description>
                        <Info>777.888.777-99</Info>
                    </InfoArea>
                </WrapInfo>

            </WrapGroup>

            <WrapGroup>
                <Title>Informações de Contato</Title>
                
                <WrapInfo>
                    <Icone name="whatsapp"/>
                    <InfoArea>
                        <Description>Celular</Description>
                        <Info>(27) 98888-5555</Info>
                    </InfoArea>
                </WrapInfo>

                <Spacer/>

                <WrapInfo>
                    <Icone name="phone"/>
                    <InfoArea>
                        <Description>Tel. Recado</Description>
                        <Info>(27) 98888-5555</Info>
                    </InfoArea>
                </WrapInfo>

                <Spacer/>

                <WrapInfo>
                    <Icone name="envelope"/>
                    <InfoArea>
                        <Description>E-mail</Description>
                        <Info>contato@birinelson.com</Info>
                    </InfoArea>
                </WrapInfo>

                <Spacer/>

                <WrapInfo>
                    <Icone name="map-pin"/>
                    <InfoArea>
                        <Description>Endereço</Description>
                        <Info>Rua dos Alfeneiros Nº 156</Info>
                    </InfoArea>
                </WrapInfo>

            </WrapGroup>

            <WrapGroup>
                <Title>Informações de Médicas</Title>
                
                <WrapInfo>
                    <Icone name="star-of-life"/>
                    <InfoArea>
                        <Description>Comorbidade</Description>
                        <Info>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer bibendum libero sit amet orci pretium ultrices. Maecenas vitae nunc eget est pretium ullamcorper. Vestibulum eu metus in velit bibendum venenatis sit amet quis est. In molestie varius aliquam. Nam tempor pulvinar lorem. Suspendisse venenatis fringilla tortor vel varius.</Info>
                    </InfoArea>
                </WrapInfo>

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

            

            <BottomSpacer/>
              

        </Container>
    )
}