import React from 'react';
import { Text } from 'react-native';
import { PacienteList } from '../../components/PacienteList';
import { 
    Container,
    Header,
    Titulo,
    Icon
} from './styles';

export function Home(){
    return(
        <Container>

            <Header>
                <Titulo>Pesquisar nome do paciente</Titulo>
                <Icon name="search"/>
            </Header>

            <PacienteList
                companyIcon="hospital"
                companyName="Plano Amil 500FG"
                lastConsult="01/11/2021"
                personName="Armelio Silva Boetchi"
                address="Rua Jataí Nº 358"
            />

            <PacienteList
                companyIcon="money-bill-wave"
                companyName="Particular"
                lastConsult="08/09/2021"
                personName="John Cena"
                address="Avenida Carlos Lindemberg"
            />

            <PacienteList
                companyIcon="hospital"
                companyName="Plano Unimed"
                lastConsult="28/07/2021"
                personName="Senor Abravanel"
                address="Rua Roberto Schwartzmann"
            />

            <PacienteList
                companyIcon="hospital"
                companyName="Plano Unimed"
                lastConsult="28/07/2021"
                personName="Senor Abravanel"
                address="Rua Roberto Schwartzmann"
            />
             <PacienteList
                companyIcon="hospital"
                companyName="Plano Unimed"
                lastConsult="28/07/2021"
                personName="Senor Abravanel"
                address="Rua Roberto Schwartzmann"
            />
            <PacienteList
                companyIcon="hospital"
                companyName="Plano Unimed"
                lastConsult="28/07/2021"
                personName="Senor Abravanel"
                address="Rua Roberto Schwartzmann"
            />
             <PacienteList
                companyIcon="hospital"
                companyName="Plano Unimed"
                lastConsult="28/07/2021"
                personName="Senor Abravanel"
                address="Rua Roberto Schwartzmann"
            />


        </Container>
    )
}