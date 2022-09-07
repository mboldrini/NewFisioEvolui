import React, { useEffect, useContext, useState } from 'react';
import { PacienteList } from '../../components/PacienteList';
import {useNavigation} from '@react-navigation/native';
import {FlatList, RefreshControl} from 'react-native';
// API
import { api } from '../../global/api';
// REDUX
import { useSelector } from 'react-redux';
import { State } from '../../state';
import LottieView from 'lottie-react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

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
    id: number,
    name: string,
    dataNascimento: Date,
    document: string,
    email: string,
    celphone: string,
    address: string,
    serviceType_id: number,
    serviceType_name: string,
}


export function Home(){

    const navigation = useNavigation();

    const apiState = useSelector((state: State) => state.apiReducer);

    const [refreshing, setRefresh] = useState(false);

    const [patientList, setPatientList] = useState<IPatient[]>([]);

    function HandleNavigate(id: number){
        navigation.navigate('PacientePerfil' as never,{
            id: id
        } as never);
    }

    async function GetPatientList(){
        console.group("GetPatientList()");

        console.log(apiState);

        setPatientList([]);

        await api(apiState.token).get('/clients/user/all').then(res=>{

            setPatientList(res.data);
            console.log("ok?");
            console.log(res.data);

        }).catch(err=>{
            console.log(err);

            Toast.show({
                type: 'error',
                text1: 'Ops!',
                text2: `Erro ao obter a lista de pacientes` 
            });
        })

        console.groupEnd();
    }

    useEffect(()=>{
       GetPatientList();

        // navigation.navigate('PacienteAtendimento' as never, { id: 13} as never)
            // navigation.navigate('EditPacienteInfos' as never, { 
            //     id: 0,
            //     id_paciente: 73,
            //     tipo: 'agendamentos',
            //     status: 'novo'
            // } as never)    
    },[]);

    return(
        <Container refreshControl={<RefreshControl refreshing={refreshing} onRefresh={ ()=> GetPatientList() }/>}>


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
                            companyName={ item.serviceType_name }
                            personName={ item.name }
                            address={ item.address }
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