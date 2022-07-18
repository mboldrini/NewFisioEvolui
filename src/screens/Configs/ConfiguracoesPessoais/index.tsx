import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RefreshControl, ScrollView} from 'react-native';
/// Redux e States
import { useSelector } from 'react-redux';
import { State } from '../../../state';
/// Estetica
import { Cabecalho } from '../../../components/Cabecalho';
import { Button } from '../../../components/Buttons/Button/Index';
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

    function GetHourAmPm(hour: string){
        const [hora, minuto, segundo] = hour.split(":");

        if(parseInt(hora) > 0 && parseInt(hora) < 12){
            return hora +":"+ minuto + " AM";
        }else{
            return hora +":"+ minuto + " PM";
        }
    }

    function SetConfigsBooleans(area: string){
        let tempConfig = configs;

        if(area === "allow_retroactiveDate"){
            setConfigs({
                ...configs,
                allow_retroactiveDate: !configs.allow_retroactiveDate
            });           
            return;
        }else if(area === "allow_notifications"){
            setConfigs({
                ...configs,
                allow_notifications: !configs.allow_notifications
            });
            return;
        }else if(area === "schedule_startDay"){
            setConfigs({
                ...configs,
                schedule_startDay: !configs.schedule_startDay
            });    
            return;
        }
    }

    async function GetConfigs(){

        setLoading(true);
       
        await api(apiState.token).get('users/configs').then(res =>{

            setConfigs(res.data);

        }).catch(err => {
            console.log("ERRO");
            console.log(err);
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
                    <WrapHoras>
                        <TextoBtn>
                            { GetHourAmPm( configs.start_workHour ) }
                        </TextoBtn>
                    </WrapHoras>
                </BtnList>

                <BtnList>
                    <TituloList>Fim dos Atendimentos:</TituloList>
                    <WrapHoras>
                        <TextoBtn>{ GetHourAmPm( configs.end_workHour ) }</TextoBtn>
                    </WrapHoras>
                </BtnList>

                <BtnList>
                    <TituloList>Agendamento Retroativo:</TituloList>
                    <WrapHoras bool={ configs.allow_retroactiveDate ? true : false } onPress={() => SetConfigsBooleans("allow_retroactiveDate") }>
                        <TextoBtn>{ configs.allow_retroactiveDate ? "Sim" : "Não"}</TextoBtn>
                    </WrapHoras>
                </BtnList>
                
                <BtnList>
                    <TituloList>Exibir notificaçõoes:</TituloList>
                    <WrapHoras bool={ configs.allow_notifications ? true : false } onPress={() => { SetConfigsBooleans("allow_notifications") } }>
                        <TextoBtn>{ configs.allow_notifications ? "Sim" : "Não"}</TextoBtn>
                    </WrapHoras>
                </BtnList>

                <BtnList>
                    <TituloList>Agendamentos ao início do dia:</TituloList>
                    <WrapHoras bool={ configs.schedule_startDay ? true : false } onPress={() => { SetConfigsBooleans("schedule_startDay") } }>
                        <TextoBtn>{ configs.schedule_startDay ? "Sim" : "Não"}</TextoBtn>
                    </WrapHoras>
                </BtnList>
            
            </Wrap>
        }

        { !loading &&
            <WrapFooterCadastro>
                <Button 
                    title="Atualizar Informações" 
                    onPress={ () => { console.log('FF') }}
                    type="ok"
                />
            </WrapFooterCadastro>
        }
        
    </ScrollView>
</Container>
    )
}