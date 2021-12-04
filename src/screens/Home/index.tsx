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
        navigation.navigate('PacientePerfil' as number,{
            id: 1
        });
    }

    // useEffect(()=>{
    //     handleNavigate(1);
    // }, []);

    let pacienteList = [
        {
            companyIcon:"hospital",
            companyName:"Plano Amil 500FG",
            lastConsult:"01/11/2021",
            personName:"Armelio Silva Boetchi",
            address:"Rua Jataí Nº 358"
        },{
            companyIcon:"hospital",
            companyName:"Plano Amil 500FG",
            lastConsult:"01/11/2021",
            personName:"Armelio Silva Boetchi",
            address:"Rua Jataí Nº 358",
        },
        {        
            companyIcon:"money-bill-wave",
            companyName:"Particular",
            lastConsult:"08/09/2021",
            personName:"John Cena",
            address:"Avenida Carlos Lindemberg",
        },
        {
            companyIcon:"hospital",
            companyName:"Plano Unimed",
            lastConsult:"28/07/2021",
            personName:"Senor Abravanel",
            address:"Rua Roberto Schwartzmann",
        },
        {
            companyIcon:"hospital",
            companyName:"Plano Unimed",
            lastConsult:"28/07/2021",
            personName:"Senor Abravanel",
            address:"Rua Roberto Schwartzmann",
        }
    ];

    return(
        <Container>

            <Header>
                <Titulo>Pesquisar nome do paciente</Titulo>
                <Icon name="search"/>
            </Header>

            
            { pacienteList.length > 0 && pacienteList.map((item, key) =>{
                return(
                    <PacienteList
                        companyIcon={item.companyIcon}
                        companyName={item.companyName}
                        lastConsult={item.lastConsult}
                        personName={item.personName}
                        address={item.address}
                        onPress={()=>{console.log(key)}}
                    />
                )
            }) }

        </Container>
    )
}