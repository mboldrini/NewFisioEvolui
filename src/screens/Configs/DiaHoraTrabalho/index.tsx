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
import { CabecalhoMenu } from '../../../components/CabecalhoMenu';
import { isAfter, isBefore, differenceInHours } from 'date-fns';
import { Footer_Modal } from '../../../components/Footers/Footer_Modal';
import { Footer_CreatedAt } from '../../../components/Footers/Footer_CreatedAt';

interface IDiaEscolhido{
    dia: 'sunday'|'monday'|'tuesday'|'wednesday'|'thursday'|'friday'|'saturday',
    periodo: "inicio"|"fim",
    start: string,
    end: string,
}

interface ICreatedAndUpdated{
    created_at: string;
    updated_at: string;
}
interface IDayRetornoAPi{
    enabled: boolean, 
    start: string, 
    end: string
}
interface IRetornoAPI{
    "created_at": string,
    "updated_at": string,
    "sunday": IDayRetornoAPi,
    "monday": IDayRetornoAPi,
    "tuesday": IDayRetornoAPi,
    "wednesday": IDayRetornoAPi,
    "thursday": IDayRetornoAPi,
    "friday": IDayRetornoAPi,
    "saturday": IDayRetornoAPi,
}
interface IDiasRetornoAPI{
    "sunday": IDayRetornoAPi,
    "monday": IDayRetornoAPi,
    "tuesday": IDayRetornoAPi,
    "wednesday": IDayRetornoAPi,
    "thursday": IDayRetornoAPi,
    "friday": IDayRetornoAPi,
    "saturday": IDayRetornoAPi,
}


export function DiaHoraTrabalho(){
    
    const navigation = useNavigation();
    const [refreshing, setRefresh] = useState(false);

    let [loading, setLoading] = useState(true);

    ///Reducer
    const dispatch = useDispatch();
    const apiState = useSelector((state: State) => state.apiReducer);
    // const { setUserConfigs } = bindActionCreators(actionCreators, dispatch);

    const [showModalHora, setShowModalHora] = useState(false);
    const [diaEscolhido, setDiaEscolhido] = useState<IDiaEscolhido>(null);
    const [horaMinutoPadrao, setHoraMinutoPadrao] = useState({ hora: 0, minuto: 0 });

    const [updateAndCreated, setUpdateAndCreated] = useState<ICreatedAndUpdated>(null);

    const [diasTrabalha, setDiasTrabalha] = useState<IDiasRetornoAPI>(null);


    async function GetConfigs(){
        console.group("GetConfigs");

        setLoading(true);
       
        await api(apiState.token).get('users/workdays').then(res =>{

            let retornoApi: IRetornoAPI = res.data;

            setUpdateAndCreated({
                created_at: res.data.created_at,
                updated_at: res.data.updated_at
            });

            setDiasTrabalha({
                "sunday":    retornoApi.sunday,
                "monday":    retornoApi.monday,
                "tuesday":   retornoApi.tuesday,
                "wednesday": retornoApi.wednesday,
                "thursday":  retornoApi.thursday,
                "friday":    retornoApi.friday,
                "saturday":  retornoApi.saturday,
            })

            setTimeout(()=>{
                setLoading(false);
            }, 300);


        }).catch(err => {
            console.log("ERRO");
            console.log(err);

            Toast.show({
                type: 'error',
                text1: '⚠️ Erro ao obter informações atualizadas',
                text2: 'tenta de novo, quem sabe dessa vez, acaba funcionando...'
            });

        });


        console.groupEnd();
    }

    async function SalvaInfos(){
        console.group("SalvaInfos");

        setLoading(true);
       
        await api(apiState.token).patch('users/workdays', diasTrabalha).then(res =>{

            console.log(res.data);

            Toast.show({
                type: 'success',
                text1: '😃 Informações salvas com sucesso!',
            });
 
            setLoading(false);

        }).catch(err => {
            console.log("ERRO");
            console.log(err);

            Toast.show({
                type: 'error',
                text1: '⚠️ Erro ao salvar as informações',
                text2: 'tenta de novo, quem sabe dessa vez, acaba funcionando...'
            });

            setLoading(false);

        });

        console.groupEnd();
    }

    const onConfirm = React.useCallback(
        ({ hours, minutes }) => {
            HandleSetHoraEscolhida(hours, minutes);
        },
        [showModalHora]
    );


    function HandleCheck(dia: 'sunday'|'monday'|'tuesday'|'wednesday'|'thursday'|'friday'|'saturday'){
        console.group("HandleDisableCheck");

        if(dia == "sunday"){
            setDiasTrabalha({
                ...diasTrabalha,
                "sunday": { enabled: !diasTrabalha.sunday.enabled, start: diasTrabalha.sunday.start, end: diasTrabalha.sunday.end }
            });
            return;
        }else if(dia == 'monday'){
            setDiasTrabalha({
                ...diasTrabalha,
                "monday": { enabled: !diasTrabalha.monday.enabled, start: diasTrabalha.monday.start, end: diasTrabalha.monday.end }
            });
            return;
        }else if(dia == 'tuesday'){
            setDiasTrabalha({
                ...diasTrabalha,
                "tuesday": { enabled: !diasTrabalha.tuesday.enabled, start: diasTrabalha.tuesday.start, end: diasTrabalha.tuesday.end }
            });
            return;
        }else if(dia == 'wednesday'){
            setDiasTrabalha({
                ...diasTrabalha,
                "wednesday": { enabled: !diasTrabalha.wednesday.enabled, start: diasTrabalha.wednesday.start, end: diasTrabalha.wednesday.end }
            });
            return;
        }else if(dia == 'thursday'){
            setDiasTrabalha({
                ...diasTrabalha,
                "thursday": { enabled: !diasTrabalha.thursday.enabled, start: diasTrabalha.thursday.start, end: diasTrabalha.thursday.end }
            });
            return;
        }else if(dia == 'friday'){
            setDiasTrabalha({
                ...diasTrabalha,
                "friday": { enabled: !diasTrabalha.friday.enabled, start: diasTrabalha.friday.start, end: diasTrabalha.friday.end }
            });
            return;
        }else if(dia == 'saturday'){
            setDiasTrabalha({
                ...diasTrabalha,
                "saturday": { enabled: !diasTrabalha.saturday.enabled, start: diasTrabalha.saturday.start, end: diasTrabalha.saturday.end }
            });
            return;
        }

        console.groupEnd();
    }

    function HandleHoraEscolhida(ativo: boolean, dia: any, periodo: "inicio"|"fim", start: string, end: string){
        if(!ativo) return;

        setDiaEscolhido({
            dia: dia,
            periodo: periodo,
            start: start,
            end: end
        });

        let horarioEscolhido;
        if(periodo === 'inicio'){
            if(dia == 'sunday'      ) horarioEscolhido = diasTrabalha.sunday.start;
            if(dia == 'monday'      ) horarioEscolhido = diasTrabalha.monday.start;
            if(dia == 'tuesday'     ) horarioEscolhido = diasTrabalha.tuesday.start;
            if(dia == 'wednesday'   ) horarioEscolhido = diasTrabalha.wednesday.start;
            if(dia == 'thursday'    ) horarioEscolhido = diasTrabalha.thursday.start;
            if(dia == 'friday'      ) horarioEscolhido = diasTrabalha.friday.start;
            if(dia == 'saturday'    ) horarioEscolhido = diasTrabalha.saturday.start;
        }else{
            if(dia == 'sunday'      ) horarioEscolhido = diasTrabalha.sunday.end;
            if(dia == 'monday'      ) horarioEscolhido = diasTrabalha.monday.end;
            if(dia == 'tuesday'     ) horarioEscolhido = diasTrabalha.tuesday.end;
            if(dia == 'wednesday'   ) horarioEscolhido = diasTrabalha.wednesday.end;
            if(dia == 'thursday'    ) horarioEscolhido = diasTrabalha.thursday.end;
            if(dia == 'friday'      ) horarioEscolhido = diasTrabalha.friday.end;
            if(dia == 'saturday'    ) horarioEscolhido = diasTrabalha.saturday.end;
        }

        if(horarioEscolhido.length > 5){
            horarioEscolhido = horarioEscolhido.substring(0,5);
        }

        const [hora, minuto] = horarioEscolhido.split(":");

        setHoraMinutoPadrao({
            hora: parseInt(hora),
            minuto: parseInt(minuto)
        });
        setShowModalHora(true);
    }

    /// Faz as validações de range de horas de trabalho
    function HoraFinalEAntes(inicio: string, fim: string){
        const [horaInicio, minutoInicio] = inicio.split(":");
        const [horaFim, minutoFim] = fim.split(":");

        let dataInicio = new Date(1995,7,1);
            dataInicio.setHours(parseInt(horaInicio));
            dataInicio.setMinutes(parseInt(minutoInicio));

        let dataFim = new Date(1995,7,1);
            dataFim.setHours(parseInt(horaFim));
            dataFim.setMinutes(parseInt(minutoFim));

        if( isBefore(dataFim, dataInicio), isAfter(dataInicio, dataFim) ){
            return true;
        }else{

            if(differenceInHours(dataFim, dataInicio) >= 10){
                Toast.show({
                    type: 'info',
                    text1: '🙃 Eita! você trabalha bastante!',
                    text2: 'lembre-se de fazer uma pausa de vez em quando...'
                });
            }

            return false;
        }


    }
    
    function HandleSetHoraEscolhida(hora: number, minuto: number){
        console.group("HandleSetHoraEscolhida");

        let nhora: string;
        let  nminuto: string;
        
        hora < 10 ? nhora = "0"+ hora : nhora = hora +""
        minuto < 10 ? nminuto = "0"+ minuto : nminuto = minuto +"";

        let tempo = nhora +":"+ nminuto;


        if(diaEscolhido.periodo == "inicio"){

            if(HoraFinalEAntes(tempo, diaEscolhido.end)){
                Toast.show({
                    type: 'error',
                    text1: '⚠️ A hora de início não pode ser depois da hora final',
                });
                setDiaEscolhido(null);
                setShowModalHora(false);
                return;
            }

            for(let dia in diasTrabalha){
                if(dia == diaEscolhido.dia){
                    if(dia == "sunday"){
                        setDiasTrabalha({ ...diasTrabalha, "sunday":{ enabled: diasTrabalha.sunday.enabled, start: tempo, end: diasTrabalha.sunday.end } }) ;
                    }
                    if(dia == "monday"){
                        setDiasTrabalha({ ...diasTrabalha, "monday":{ enabled: diasTrabalha.monday.enabled, start: tempo, end: diasTrabalha.monday.end } }) ;
                    }
                    if(dia == "tuesday"){
                        setDiasTrabalha({ ...diasTrabalha, "tuesday":{ enabled: diasTrabalha.tuesday.enabled, start: tempo, end: diasTrabalha.tuesday.end } }) ;
                    }
                    if(dia == "wednesday"){
                        setDiasTrabalha({ ...diasTrabalha, "wednesday":{ enabled: diasTrabalha.wednesday.enabled, start: tempo, end: diasTrabalha.wednesday.end } }) ;
                    }
                    if(dia == "thursday"){
                        setDiasTrabalha({ ...diasTrabalha, "thursday":{ enabled: diasTrabalha.thursday.enabled, start: tempo, end: diasTrabalha.thursday.end } }) ;
                    }
                    if(dia == "friday"){
                        setDiasTrabalha({ ...diasTrabalha, "friday":{ enabled: diasTrabalha.friday.enabled, start: tempo, end: diasTrabalha.friday.end } }) ;
                    }
                    if(dia == "saturday"){
                        setDiasTrabalha({ ...diasTrabalha, "saturday":{ enabled: diasTrabalha.saturday.enabled, start: tempo, end: diasTrabalha.saturday.end } }) ;
                    }
                }
            }
        }else{

            if(HoraFinalEAntes(diaEscolhido.start, tempo )){
                Toast.show({
                    type: 'error',
                    text1: '⚠️ A hora final não pode ser antes da hora inícial',
                });
                setDiaEscolhido(null);
                setShowModalHora(false);
                return;
            }

            for(let dia in diasTrabalha){
                if(dia == diaEscolhido.dia){
                    if(dia == "sunday"){
                        setDiasTrabalha({ ...diasTrabalha, "sunday":{ enabled: diasTrabalha.sunday.enabled, start: diasTrabalha.sunday.start, end: tempo } }) ;
                    }
                    if(dia == "monday"){
                        setDiasTrabalha({ ...diasTrabalha, "monday":{ enabled: diasTrabalha.monday.enabled, start: diasTrabalha.monday.start, end: tempo } }) ;
                    }
                    if(dia == "tuesday"){
                        setDiasTrabalha({ ...diasTrabalha, "tuesday":{ enabled: diasTrabalha.tuesday.enabled, start: diasTrabalha.tuesday.start, end: tempo } }) ;
                    }
                    if(dia == "wednesday"){
                        setDiasTrabalha({ ...diasTrabalha, "wednesday":{ enabled: diasTrabalha.wednesday.enabled, start: diasTrabalha.wednesday.start, end: tempo } }) ;
                    }
                    if(dia == "thursday"){
                        setDiasTrabalha({ ...diasTrabalha, "thursday":{ enabled: diasTrabalha.thursday.enabled, start: diasTrabalha.thursday.start, end: tempo } }) ;
                    }
                    if(dia == "friday"){
                        setDiasTrabalha({ ...diasTrabalha, "friday":{ enabled: diasTrabalha.friday.enabled, start: diasTrabalha.friday.start, end: tempo} }) ;
                    }
                    if(dia == "saturday"){
                        setDiasTrabalha({ ...diasTrabalha, "saturday":{ enabled: diasTrabalha.saturday.enabled, start: diasTrabalha.saturday.start, end: tempo } }) ;
                    }
                }
            }
        }

        setDiaEscolhido(null);
        setShowModalHora(false);

        console.groupEnd();
    }

    useEffect(()=>{
        GetConfigs();
    },[]);



    return(
<SafeAreaView style={{flex: 1, backgroundColor: '#63C2D1'}}>
    <Container >
        <Iscrol refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>{ GetConfigs() }}/> } contentContainerStyle={{flexGrow: 1}}>

        <CabecalhoMenu titulo="Dia/Horário de Trabalho" onPress={()=> navigation.goBack() }   />


        { loading &&
            <LoadingIcon size="large" color="#FFFFFF"/>            
        }

        { !loading && diasTrabalha.friday &&
            <Wrap>
                
                <BtnList>
                    <WrapInfos>
                        <TituloList>Domingo</TituloList>
                        <Switch value={diasTrabalha.sunday.enabled}  onValueChange={() => HandleCheck("sunday") } trackColor={{ false:'#000000', true: '#3a86ff' }} thumbColor="#268596" />
                    </WrapInfos>
                    <WrapHoras>
                        <WrapTempo>
                            <TituloHora>Início:</TituloHora>
                            <InputFake 
                                title={diasTrabalha.sunday.start} 
                                onPress={()=>{ HandleHoraEscolhida(diasTrabalha.sunday.enabled, "sunday", "inicio", diasTrabalha.sunday.start, diasTrabalha.sunday.end) }} 
                                enabled={diasTrabalha.sunday.enabled}
                            />
                        </WrapTempo>
                        <WrapTempo>
                            <TituloHora>Fim:</TituloHora>
                            <InputFake 
                                title={diasTrabalha.sunday.end} 
                                onPress={()=>{  HandleHoraEscolhida(diasTrabalha.sunday.enabled, "sunday", "fim", diasTrabalha.sunday.start, diasTrabalha.sunday.end) }} 
                                enabled={diasTrabalha.sunday.enabled}
                            />
                        </WrapTempo>
                    </WrapHoras>
                </BtnList>  

                <BtnList>
                    <WrapInfos>
                        <TituloList>Segunda</TituloList>
                        <Switch value={diasTrabalha.monday.enabled}  onValueChange={() => HandleCheck("monday") } trackColor={{ false:'#000000', true: '#3a86ff' }} thumbColor="#268596" />
                    </WrapInfos>
                    <WrapHoras>
                        <WrapTempo>
                            <TituloHora>Início:</TituloHora>
                            <InputFake 
                                title={diasTrabalha.monday.start} 
                                onPress={()=>{ HandleHoraEscolhida(diasTrabalha.monday.enabled, "monday", "inicio", diasTrabalha.monday.start, diasTrabalha.monday.end) }} 
                                enabled={diasTrabalha.monday.enabled}
                            />
                        </WrapTempo>
                        <WrapTempo>
                            <TituloHora>Fim:</TituloHora>
                            <InputFake 
                                title={diasTrabalha.monday.end} 
                                onPress={()=>{  HandleHoraEscolhida(diasTrabalha.monday.enabled, "monday", "fim", diasTrabalha.monday.start, diasTrabalha.monday.end) }} 
                                enabled={diasTrabalha.monday.enabled}
                            />
                        </WrapTempo>
                    </WrapHoras>
                </BtnList>  

                <BtnList>
                    <WrapInfos>
                        <TituloList>Terça</TituloList>
                        <Switch value={diasTrabalha.tuesday.enabled}  onValueChange={() => HandleCheck("tuesday") } trackColor={{ false:'#000000', true: '#3a86ff' }} thumbColor="#268596" />
                    </WrapInfos>
                    <WrapHoras>
                        <WrapTempo>
                            <TituloHora>Início:</TituloHora>
                            <InputFake 
                                title={diasTrabalha.tuesday.start} 
                                onPress={()=>{ HandleHoraEscolhida(diasTrabalha.tuesday.enabled, "monday", "inicio", diasTrabalha.tuesday.start, diasTrabalha.tuesday.end) }} 
                                enabled={diasTrabalha.tuesday.enabled}
                            />
                        </WrapTempo>
                        <WrapTempo>
                            <TituloHora>Fim:</TituloHora>
                            <InputFake 
                                title={diasTrabalha.tuesday.end} 
                                onPress={()=>{  HandleHoraEscolhida(diasTrabalha.tuesday.enabled, "tuesday", "fim", diasTrabalha.tuesday.start, diasTrabalha.tuesday.end) }} 
                                enabled={diasTrabalha.tuesday.enabled}
                            />
                        </WrapTempo>
                    </WrapHoras>
                </BtnList>  

                <BtnList>
                    <WrapInfos>
                        <TituloList>Quarta</TituloList>
                        <Switch value={diasTrabalha.wednesday.enabled}  onValueChange={() => HandleCheck("wednesday") } trackColor={{ false:'#000000', true: '#3a86ff' }} thumbColor="#268596" />
                    </WrapInfos>
                    <WrapHoras>
                        <WrapTempo>
                            <TituloHora>Início:</TituloHora>
                            <InputFake 
                                title={diasTrabalha.wednesday.start} 
                                onPress={()=>{ HandleHoraEscolhida(diasTrabalha.wednesday.enabled, "wednesday", "inicio", diasTrabalha.wednesday.start, diasTrabalha.wednesday.end) }} 
                                enabled={diasTrabalha.wednesday.enabled}
                            />
                        </WrapTempo>
                        <WrapTempo>
                            <TituloHora>Fim:</TituloHora>
                            <InputFake 
                                title={diasTrabalha.wednesday.end} 
                                onPress={()=>{  HandleHoraEscolhida(diasTrabalha.wednesday.enabled, "wednesday", "fim", diasTrabalha.wednesday.start, diasTrabalha.wednesday.end) }} 
                                enabled={diasTrabalha.wednesday.enabled}
                            />
                        </WrapTempo>
                    </WrapHoras>
                </BtnList>  

                <BtnList>
                    <WrapInfos>
                        <TituloList>Quinta</TituloList>
                        <Switch value={diasTrabalha.thursday.enabled}  onValueChange={() => HandleCheck("thursday") } trackColor={{ false:'#000000', true: '#3a86ff' }} thumbColor="#268596" />
                    </WrapInfos>
                    <WrapHoras>
                        <WrapTempo>
                            <TituloHora>Início:</TituloHora>
                            <InputFake 
                                title={diasTrabalha.thursday.start} 
                                onPress={()=>{ HandleHoraEscolhida(diasTrabalha.thursday.enabled, "thursday", "inicio", diasTrabalha.thursday.start, diasTrabalha.thursday.end) }} 
                                enabled={diasTrabalha.thursday.enabled}
                            />
                        </WrapTempo>
                        <WrapTempo>
                            <TituloHora>Fim:</TituloHora>
                            <InputFake 
                                title={diasTrabalha.thursday.end} 
                                onPress={()=>{  HandleHoraEscolhida(diasTrabalha.thursday.enabled, "thursday", "fim", diasTrabalha.thursday.start, diasTrabalha.thursday.end) }} 
                                enabled={diasTrabalha.thursday.enabled}
                            />
                        </WrapTempo>
                    </WrapHoras>
                </BtnList>  

                <BtnList>
                    <WrapInfos>
                        <TituloList>Sexta</TituloList>
                        <Switch value={diasTrabalha.friday.enabled}  onValueChange={() => HandleCheck("friday") } trackColor={{ false:'#000000', true: '#3a86ff' }} thumbColor="#268596" />
                    </WrapInfos>
                    <WrapHoras>
                        <WrapTempo>
                            <TituloHora>Início:</TituloHora>
                            <InputFake 
                                title={diasTrabalha.friday.start} 
                                onPress={()=>{ HandleHoraEscolhida(diasTrabalha.friday.enabled, "friday", "inicio", diasTrabalha.friday.start, diasTrabalha.friday.end) }} 
                                enabled={diasTrabalha.friday.enabled}
                            />
                        </WrapTempo>
                        <WrapTempo>
                            <TituloHora>Fim:</TituloHora>
                            <InputFake 
                                title={diasTrabalha.friday.end} 
                                onPress={()=>{  HandleHoraEscolhida(diasTrabalha.friday.enabled, "friday", "fim", diasTrabalha.friday.start, diasTrabalha.friday.end) }} 
                                enabled={diasTrabalha.friday.enabled}
                            />
                        </WrapTempo>
                    </WrapHoras>
                </BtnList>  

                <BtnList>
                    <WrapInfos>
                        <TituloList>Sábado</TituloList>
                        <Switch value={diasTrabalha.saturday.enabled}  onValueChange={() => HandleCheck("saturday") } trackColor={{ false:'#000000', true: '#3a86ff' }} thumbColor="#268596" />
                    </WrapInfos>
                    <WrapHoras>
                        <WrapTempo>
                            <TituloHora>Início:</TituloHora>
                            <InputFake 
                                title={diasTrabalha.saturday.start} 
                                onPress={()=>{ HandleHoraEscolhida(diasTrabalha.saturday.enabled, "saturday", "inicio", diasTrabalha.saturday.start, diasTrabalha.saturday.end) }} 
                                enabled={diasTrabalha.saturday.enabled}
                            />
                        </WrapTempo>
                        <WrapTempo>
                            <TituloHora>Fim:</TituloHora>
                            <InputFake 
                                title={diasTrabalha.saturday.end} 
                                onPress={()=>{  HandleHoraEscolhida(diasTrabalha.saturday.enabled, "saturday", "fim", diasTrabalha.saturday.start, diasTrabalha.saturday.end) }} 
                                enabled={diasTrabalha.saturday.enabled}
                            />
                        </WrapTempo>
                    </WrapHoras>
                </BtnList>  
                
                
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

                {updateAndCreated?.created_at &&
                    <Footer_CreatedAt created_at={ updateAndCreated.created_at  } updated_at={ updateAndCreated.updated_at } />
                }

                <Footer_Modal onPressOk={()=> SalvaInfos() } onPressCancel={()=> navigation.goBack() } />

            </Wrap>
        }

        

       </Iscrol>
    </Container>
</SafeAreaView>
)}