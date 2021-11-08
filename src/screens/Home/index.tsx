import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { PacienteList } from '../../components/PacienteList';
import {useNavigation} from '@react-navigation/native';
import { 
    Container,
    Header,
    Titulo,
    Icon
} from './styles';

export function Home(){

    const navigation = useNavigation();

    function handleNavigate(numero: number){
        navigation.navigate('PacientePerfil' as never,{
            id: 1
        });
    }

    return(
        <Container>

            <Header>
                <Titulo>Pesquisar nome do paciente</Titulo>
                <Icon name="search"/>
            </Header>

            <PacienteList
                id={1}
                companyIcon="hospital"
                companyName="Plano Amil 500FG"
                lastConsult="01/11/2021"
                personName="Armelio Silva Boetchi"
                address="Rua Jataí Nº 358"
                onPress={()=>{handleNavigate(1)}}
            />

            <PacienteList
                id={2}
                companyIcon="money-bill-wave"
                companyName="Particular"
                lastConsult="08/09/2021"
                personName="John Cena"
                address="Avenida Carlos Lindemberg"
                onPress={()=>{handleNavigate(2)}}
            />

            <PacienteList
                id={3}
                companyIcon="hospital"
                companyName="Plano Unimed"
                lastConsult="28/07/2021"
                personName="Senor Abravanel"
                address="Rua Roberto Schwartzmann"
                onPress={()=>{handleNavigate(3)}}
            />

            <PacienteList
                id={4}
                companyIcon="hospital"
                companyName="Plano Unimed"
                lastConsult="28/07/2021"
                personName="Senor Abravanel"
                address="Rua Roberto Schwartzmann"
                onPress={()=>{handleNavigate(4)}}
            />
          


        </Container>
    )
}