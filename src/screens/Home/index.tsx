import React, { useEffect, useContext, useState } from 'react';
import { PacienteList } from '../../components/PacienteList';
import {useNavigation} from '@react-navigation/native';
import {FlatList, RefreshControl} from 'react-native';
// API
import { api } from '../../global/api';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators, State } from '../../state';
//Outros
import LottieView from 'lottie-react-native';
import { toast } from '@backpackapp-io/react-native-toast';
import { SafeAreaView } from 'react-native-safe-area-context';

import { 
    Container,
    Iscrol,
    Header,
    Titulo,
    Icon,
    Wrap,
    WrapLoading,
    TextoLoading,

    WrapScroll

} from './styles';
import { ModalLoading } from '../../components/Modal/ModalLoading';
import { bindActionCreators } from 'redux';

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

    const dispatch = useDispatch();
    const { setPacientes, setAtualizaPacientes } = bindActionCreators(actionCreators, dispatch);
    const pacientesReducer = useSelector((state: State) => state.pacientesReducer);

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

        await api(apiState.token).get('/clients/user/allf').then(res=>{

            setAtualizaPacientes(false);
            setPacientes(res.data);
            setPatientList(res.data);

            console.log("ok! obteve a lista dos pacientes");
            console.log(res.data);

        }).catch(err=>{
            console.log(err);

            toast.error('Ops! Erro ao obter a lista de pacientes', {duration: 6000, icon: '❌'});

        })

        console.groupEnd();
    }

    useEffect(()=>{
        if(pacientesReducer.pacientes.length > 0){
           setPatientList(pacientesReducer.pacientes);
            console.log("tem pacientes já salvos no redux");
        }else{
           GetPatientList();
            console.log("não tem pacientes salvos no redux");
        }
    },[]);

    useEffect(()=>{
        if(pacientesReducer.atualiza){
            GetPatientList();
        } 
    },[pacientesReducer.atualiza]);

    return(
<SafeAreaView style={{flex: 1, backgroundColor: '#63C2D1'}}>
    <Container >
        <Iscrol refreshControl={<RefreshControl refreshing={refreshing} onRefresh={ ()=> GetPatientList() }/>}>

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

        </Iscrol>
    </Container>
</SafeAreaView>
)}