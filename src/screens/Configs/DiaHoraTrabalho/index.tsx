import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RefreshControl, Switch} from 'react-native';
/// Redux e States
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators, State } from '../../../state';
/// Estética - Timer Picker
import Toast from 'react-native-toast-message';
import { TimePickerModal } from 'react-native-paper-dates';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
    Container,
    Iscrol,
    Wrap,
    BtnList,
    TituloList,
    TextoBtn,
    WrapFooterCadastro,
    LoadingIcon, 
    WrapInfos,
    WrapHoras,
    WrapTempo,
    TituloHora,

} from './styles';
/// API
import { api } from '../../../global/api';
import { InputFake } from '../../../components/Forms/InputFake';
import { FlatList } from 'react-native-gesture-handler';
import { CabecalhoMenu } from '../../../components/CabecalhoMenu';

interface IDiaSemana{
    ativo: boolean,
    inicio: string,
    fim: string,
    dia: string,
    id: number
}
interface IDiaEscolhido{
    id: number,
    periodo: "inicio"|"fim"
}



export function DiaHoraTrabalho(){
    
    const navigation = useNavigation();
    const [refreshing, setRefresh] = useState(false);

    let [loading, setLoading] = useState(false);

    ///Reducer
    // const dispatch = useDispatch();
    // const apiState = useSelector((state: State) => state.apiReducer);
    // const { setUserConfigs } = bindActionCreators(actionCreators, dispatch);

    const [showModalHora, setShowModalHora] = useState(false);
    const [diaEscolhido, setDiaEscolhido] = useState<IDiaEscolhido>(null);
    const [horaMinutoPadrao, setHoraMinutoPadrao] = useState({
        hora: 0,
        minuto: 0        
    });

    const [diasTrabalha, setDiasTrabalha] = useState<IDiaSemana[]>([
        { id: 0, ativo: true ,  inicio: "08:00", fim: "18:30", dia: "Segunda"   },
        { id: 1, ativo: false,  inicio: "08:00", fim: "08:00", dia: "Terça"     },
        { id: 2, ativo: false,  inicio: "08:00", fim: "08:00", dia: "Quarta"    },
        { id: 3, ativo: false,  inicio: "08:00", fim: "08:00", dia: "Quinta"    },
        { id: 4, ativo: false,  inicio: "08:00", fim: "08:00", dia: "Sexta"     },
        { id: 5, ativo: false,  inicio: "08:00", fim: "08:00", dia: "Sabado"    },
        { id: 6, ativo: false,  inicio: "08:00", fim: "08:00", dia: "Domingo"   },
    ]);

    async function GetConfigs(){

        // setLoading(true);
       
        // await api(apiState.token).get('users/configs').then(res =>{

        //     setConfigs(res.data);
        //     setUserConfigs(res.data);

        // }).catch(err => {
        //     console.log("ERRO");
        //     console.log(err);

        //     Toast.show({
        //         type: 'error',
        //         text1: '⚠️ Erro ao obter informações atualizadas',
        //         text2: 'tenta de novo, quem sabe dessa vez, acaba funcionando...'
        //     });

        // });

        // setLoading(false);
    }

    const onConfirm = React.useCallback(
        ({ hours, minutes }) => {
            HandleSetHoraEscolhida(hours, minutes);
        },
        [showModalHora]
    );


    function HandleCheck(id: number){
        console.group("HandleDisableCheck");

        let dias = [...diasTrabalha];

        dias[id] = {
            ativo: !diasTrabalha[id].ativo,     
            inicio: diasTrabalha[id].inicio, 
            fim: diasTrabalha[id].fim, 
            dia: diasTrabalha[id].dia, 
            id: id
        }
        setDiasTrabalha(dias);

        console.groupEnd();
    }

    function HandleHoraEscolhida(id: number, periodo: "inicio"|"fim"){
        if(!diasTrabalha[id].ativo) return;

        setDiaEscolhido({
            id: id,
            periodo: periodo
        });

        const [hora, minuto] = periodo == "inicio" ? diasTrabalha[id].inicio.split(":") : diasTrabalha[id].fim.split(":")

        setHoraMinutoPadrao({
            hora: parseInt(hora),
            minuto: parseInt(minuto)
        });
        setShowModalHora(true);
    }
    
    function HandleSetHoraEscolhida(hora: number, minuto: number){
        console.group("HandleSetHoraEscolhida");

        let nhora: string
        let  nminuto: string;
        
        hora < 10 ? nhora = "0"+ hora : nhora = hora +""
        minuto < 10 ? nminuto = "0"+ minuto : nminuto = minuto +""

        let dias = [...diasTrabalha];

        if(diaEscolhido.periodo == "inicio"){
            dias[diaEscolhido.id] = {
                ativo: diasTrabalha[diaEscolhido.id].ativo,     
                inicio: nhora +":"+ nminuto, 
                fim: diasTrabalha[diaEscolhido.id].fim, 
                dia: diasTrabalha[diaEscolhido.id].dia, 
                id: diaEscolhido.id
            }
        }else{
            dias[diaEscolhido.id] = {
                ativo: diasTrabalha[diaEscolhido.id].ativo,     
                inicio: diasTrabalha[diaEscolhido.id].inicio, 
                fim: nhora +":"+ nminuto, 
                dia: diasTrabalha[diaEscolhido.id].dia, 
                id: diaEscolhido.id
            }
        }
        setDiaEscolhido(null);
        setDiasTrabalha(dias);
        setShowModalHora(false);

        console.groupEnd();
    }


    return(
<SafeAreaView style={{flex: 1, backgroundColor: '#63C2D1'}}>
    <Container >
        <Iscrol refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>{ GetConfigs() }}/> } contentContainerStyle={{flexGrow: 1}}>

        <CabecalhoMenu titulo="Dia/Horário de Trabalho" onPress={()=> navigation.goBack() }   />


        { loading &&
            <LoadingIcon size="large" color="#FFFFFF"/>            
        }

        { !loading && 
            <Wrap>

                <FlatList
                    data={diasTrabalha}
                    keyExtractor={(item) => item.dia +""}
                    horizontal={false}
                    renderItem={({item}) =>{
                    return (
                        <BtnList>
                            <WrapInfos>
                                <TituloList>{item.dia}</TituloList>
                                <Switch value={item.ativo}  onValueChange={() => HandleCheck(item.id) } trackColor={{ false:'#000000', true: '#3a86ff' }} thumbColor="#268596" />
                            </WrapInfos>
                            {/* { item.ativo && */}
                                <WrapHoras>
                                    <WrapTempo>
                                        <TituloHora>Início:</TituloHora>
                                        <InputFake title={item.inicio} onPress={()=>{ HandleHoraEscolhida(item.id, "inicio") }} enabled={item.ativo}/>
                                    </WrapTempo>
                                    <WrapTempo>
                                        <TituloHora>Fim:</TituloHora>
                                        <InputFake title={item.fim} onPress={()=>{ HandleHoraEscolhida(item.id, "fim") }} enabled={item.ativo}/>
                                    </WrapTempo>
                                </WrapHoras>
                            {/* } */}
                        </BtnList>  
                    )} }
                />

                
                <TimePickerModal
                    visible={showModalHora}
                    onDismiss={()=> { setShowModalHora(false) }}
                    onConfirm={onConfirm}
                    hours={horaMinutoPadrao.hora} // default: current hours
                    minutes={horaMinutoPadrao.minuto} // default: current minutes
                    label="Selecione a Duração" // optional, default 'Select time'
                    cancelLabel="Cancelar" // optional, default: 'Cancel'
                    confirmLabel="Ok" // optional, default: 'Ok'
                    animationType="fade" // optional, default is 'none'
                    locale={'pt-BR'} // optional, default is automically detected by your system
                />

            </Wrap>
        }

        


        {/* { !loading &&
            <WrapFooterCadastro>
                <Button 
                    title="Salvar" 
                    onPress={ () => { SaveConfigs() }}
                    type="ok"
                />
            </WrapFooterCadastro>
        } */}


       
        

       </Iscrol>
    </Container>
</SafeAreaView>
)}