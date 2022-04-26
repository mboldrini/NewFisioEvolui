import React, { useEffect, useContext, useState } from 'react';
import { PacienteList } from '../../components/PacienteList';
import {useNavigation} from '@react-navigation/native';
import { FlatList } from 'react-native';
// API
import { api } from '../../global/api';
// REDUX
import { useSelector } from 'react-redux';
import { State } from '../../state';
import LottieView from 'lottie-react-native';

import { 
    Container,
    Header,
    Titulo,
    Icon,
    Wrap,
    WrapLoading,
    TextoLoading,

    WrapScroll

} from './styles';
import { ModalLoading } from '../../components/Modal/ModalLoading';

interface IPatient{
    id: number
    nome: string,
    tipoAtendimento: string,
    logradouro: string
}


export function Home(){

    const navigation = useNavigation();

    const apiState = useSelector((state: State) => state.apiReducer);

    const [patientList, setPatientList] = useState<IPatient[]>([]);

    function HandleNavigate(id: number){
        navigation.navigate('PacientePerfil' as never,{
            id: id
        } as never);
    }

    async function GetPatientList(){
        console.group("GetPatientList()");

        console.log(apiState);

        await api(apiState.token).post('/paciente/all', '').then(res=>{

            setPatientList(res.data);
            console.log("ok?");
            console.log(res.data);

        }).catch(err=>{
            console.error(err);
        })

        console.groupEnd();
    }

    useEffect(()=>{
        GetPatientList();

        navigation.navigate('PacienteAtendimento' as never)

    },[]);

    return(
        <Container>

            <Header>
                <Titulo>Pesquisar nome do paciente</Titulo>
                <Icon name="search"/>
            </Header>
 
            { patientList.length > 0 &&
              <FlatList 
                    data={patientList}
                    keyExtractor={pct => pct.id+""}
                    renderItem={({item}) =>(
                        <PacienteList
                            key={item.id}
                            companyIcon={"hospital"}/*{item.companyIcon}*/
                            companyName={ item.tipoAtendimento }
                            // lastConsult={"01/01/2001"}
                            personName={ item.nome }
                            address={ item.logradouro }
                            onPress={()=>{ HandleNavigate(item.id) }}
                        />
                    )}
                    
                />
            }

            { patientList.length < 1 &&
                <Wrap>
                    <WrapLoading>
                        <LottieView
                            source={require('../../assets/loadingAnimado250.json')}
                            autoSize={false}
                            autoPlay
                            loop
                        />
                    </WrapLoading>
                    <TextoLoading>Carregando lista de pacientes...</TextoLoading>
                </Wrap>
            }

        </Container>
    )
}