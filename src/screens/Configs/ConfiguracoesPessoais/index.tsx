import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RefreshControl, ScrollView} from 'react-native';
/// Redux e States
import { useSelector } from 'react-redux';
import { State } from '../../../state';
/// Estetica
import { Cabecalho } from '../../../components/Cabecalho';
import { Button } from '../../../components/Buttons/Button/Index';
/// Estética - Timer Picker
import Toast from 'react-native-toast-message';
import { TimePickerModal } from 'react-native-paper-dates';
import { 
    Container,
    Wrap,
    BtnList,
    TituloList,
    WrapHoras,
    TextoBtn,
    WrapFooterCadastro,
    LoadingIcon, 
} from './styles';
/// API
import { api } from '../../../global/api';
import { createIconSetFromFontello } from 'react-native-vector-icons';

interface IConfigs{
    allow_notifications: boolean,
    allow_retroactiveDate: boolean,
    start_workHour: string,
    end_workHour: string,
    schedule_startDay: boolean,
    user_premium: boolean,
    premium_type: number,
    premium_until: string,
    updated_at: string,
    created_at: string,
}

export function ConfiguracoesPessoais(){
    
    const navigation = useNavigation();
    const [refreshing, setRefresh] = useState(false);

    let [loading, setLoading] = useState(false);

    ///Reducer
    const apiState = useSelector((state: State) => state.apiReducer);
    // const usrState = useSelector((state: State) => state.user);

    /// Configs Variables
    const [configs, setConfigs] = useState<IConfigs>({} as IConfigs);

    /// Hour Start AND End
    const [modalHoraStart, setModalHoraStart] = React.useState(false);
    const [modalHoraEnd, setModalHoraEnd] = React.useState(false);
  
    const onConfirmStart = React.useCallback(
        ({ hours, minutes }) => {
            setModalHoraStart(false);
            SetaHoras(hours, minutes, "start");
        },
        [setModalHoraStart]
    );

    const onConfirmEnd = React.useCallback(
        ({ hours, minutes }) => {
            setModalHoraEnd(false);
            SetaHoras(hours, minutes, "end");
        },
        [setModalHoraEnd]
    );

    function SetaHoras(hora: number, minuto: number, type: "start" | "end"){
        let hour = ''+ hora;
        let minute = ''+ minuto;
        if(hora < 10 ){
          hour = "0"+ hora;
        }
        if( minuto < 9 ){
            minute = "0"+ minuto;
        }
        let newHour = hour +':'+ minute +":00";
        if(type == "start"){
            setConfigs({
                ...configs,
                start_workHour: newHour
            });
        }else{
            setConfigs({
                ...configs,
                end_workHour: newHour
            });
        }
       
    }

    function GetDefaultHours(time: string, type: 'hour' | 'minute'){
        const [hora, minuto, segundo] = time.split(":");
        if( type == "hour"){
            return parseInt(hora);
        }else{
            return parseInt(minuto);
        }
    }

    function GetHourAmPm(hour: string){
        const [hora, minuto, segundo] = hour.split(":");

        if(parseInt(hora) > 0 && parseInt(hora) < 12){
            return hora +":"+ minuto + " AM";
        }else{
            return hora +":"+ minuto + " PM";
        }
    }

    async function GetConfigs(){

        setLoading(true);
       
        await api(apiState.token).get('users/configs').then(res =>{

            setConfigs(res.data);

        }).catch(err => {
            console.log("ERRO");
            console.log(err);

            Toast.show({
                type: 'error',
                text1: '⚠️ Erro ao obter informações atualizadas',
                text2: 'tenta de novo, quem sabe dessa vez, acaba funcionando...'
            });

        });

        setLoading(false);
    }

    async function SaveConfigs(){
        setLoading(true);

        const newConfigs = {
            "start_workHour": configs.start_workHour,
            "end_workHour":	configs.end_workHour,
            "allow_retroactiveDate": configs.allow_retroactiveDate,
            "allow_notifications": configs.allow_notifications,
            "schedule_startDay": configs.schedule_startDay,
            "user_premium": configs.user_premium,
            "premium_type":	configs.premium_type,
            "premium_until": configs.premium_until
        };
       
        await api(apiState.token).post('users/configs', newConfigs).then(res =>{

            console.log("SALVOU!");

            Toast.show({
                type: 'success',
                text1: '😄 Informações salvas com sucesso',
                text2: 'uhull!'
            });

        }).catch(err => {
            console.log("ERRO");

            console.log( JSON.stringify(err) );

            Toast.show({
                type: 'error',
                text1: '⚠️ Erro ao salvar as informações',
                text2: 'tenta de novo, quem sabe dessa vez, acaba funcionando...'
            });

        });

        setLoading(false);
    }

    useEffect(()=>{
        GetConfigs();
    },[]);


    useEffect(()=>{
        console.group("CONFIGS");
        console.log(configs);
        console.groupEnd();
    },[configs]);

    return(
<Container>
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>{ GetConfigs() }}/> } contentContainerStyle={{flexGrow: 1}}>

        <Cabecalho titulo="Configurações do APP" onPress={()=> navigation.goBack() } />


        { loading &&
            <LoadingIcon size="large" color="#FFFFFF"/>            
        }

        { !loading && configs && configs.created_at &&
            <Wrap>

                <BtnList>
                    <TituloList>Início dos Atendimentos:</TituloList>
                    <WrapHoras onPress={()=> { setModalHoraStart(true) }}>
                        <TextoBtn>
                            { GetHourAmPm( configs.start_workHour ) }
                        </TextoBtn>
                    </WrapHoras>
                </BtnList>

                <BtnList>
                    <TituloList>Fim dos Atendimentos:</TituloList>
                    <WrapHoras onPress={()=> { setModalHoraEnd(true) }}>
                        <TextoBtn>{ GetHourAmPm( configs.end_workHour ) }</TextoBtn>
                    </WrapHoras>
                </BtnList>

                <BtnList>
                    <TituloList>Agendamento Retroativo:</TituloList>
                    <WrapHoras bool={ configs.allow_retroactiveDate ? true : false } 
                    onPress={() => setConfigs({ ...configs, allow_retroactiveDate: !configs.allow_retroactiveDate }) }>
                        <TextoBtn>{ configs.allow_retroactiveDate ? "Sim" : "Não"}</TextoBtn>
                    </WrapHoras>
                </BtnList>
                
                <BtnList>
                    <TituloList>Exibir notificaçõoes:</TituloList>
                    <WrapHoras bool={ configs.allow_notifications ? true : false } 
                        onPress={() => { setConfigs({ ...configs, allow_notifications: !configs.allow_notifications }); } }>
                        <TextoBtn>{ configs.allow_notifications ? "Sim" : "Não"}</TextoBtn>
                    </WrapHoras>
                </BtnList>

                <BtnList>
                    <TituloList>Agendamentos ao início do dia:</TituloList>
                    <WrapHoras bool={ configs.schedule_startDay ? true : false } 
                        onPress={() => { setConfigs({ ...configs, schedule_startDay: !configs.schedule_startDay}); } } >
                        <TextoBtn>{ configs.schedule_startDay ? "Sim" : "Não"}</TextoBtn>
                    </WrapHoras>
                </BtnList>
            
            </Wrap>
        }

        { !loading &&
            <WrapFooterCadastro>
                <Button 
                    title="Salvar" 
                    onPress={ () => { SaveConfigs() }}
                    type="ok"
                />
            </WrapFooterCadastro>
        }

        { !loading && configs.schedule_startDay &&
            <TimePickerModal
                visible={modalHoraStart}
                onDismiss={()=> {setModalHoraStart(false) } }
                onConfirm={onConfirmStart}
                hours={ GetDefaultHours(configs.start_workHour, "hour") } // default: current hours
                minutes={ GetDefaultHours(configs.start_workHour, "minute") } // default: current minutes
                label="Início do Expediente" // optional, default 'Select time'
                cancelLabel="Cancelar" // optional, default: 'Cancel'
                confirmLabel="Ok" // optional, default: 'Ok'
                animationType="fade" // optional, default is 'none'
                locale={'pt-BR'} // optional, default is automically detected by your system
            />
        }
     
        { !loading && configs.end_workHour &&
            <TimePickerModal
                visible={modalHoraEnd}
                onDismiss={()=> {setModalHoraEnd(false) } }
                onConfirm={onConfirmEnd}
                hours={ GetDefaultHours(configs.end_workHour, "hour") } // default: current hours
                minutes={ GetDefaultHours(configs.end_workHour, "minute") } // default: current minutes
                label="Fim do Expediente" // optional, default 'Select time'
                cancelLabel="Cancelar" // optional, default: 'Cancel'
                confirmLabel="Ok" // optional, default: 'Ok'
                animationType="fade" // optional, default is 'none'
                locale={'pt-BR'} // optional, default is automically detected by your system
            />
        }
       
        
    </ScrollView>
</Container>
    )
}