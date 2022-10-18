import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RefreshControl, ScrollView, Switch} from 'react-native';
/// Redux e States
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators, State } from '../../../state';
/// Estetica
import { Cabecalho } from '../../../components/Cabecalho';
import { Button } from '../../../components/Buttons/Button/Index';
/// Estética - Timer Picker
// import { TimePickerModal } from 'react-native-paper-dates';
import { toast } from '@backpackapp-io/react-native-toast';
import { 
    Container,
    Wrap,
    BtnList,
    TituloList,
    WrapFooterCadastro,
    LoadingIcon, 
} from './styles';
/// API
import { api } from '../../../global/api';
import { SafeAreaView } from 'react-native-safe-area-context';


interface IConfigs{
    allow_notifications: boolean,
    allow_retroactiveDate: boolean,
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
    const dispatch = useDispatch();
    const apiState = useSelector((state: State) => state.apiReducer);
    const userState = useSelector((state: State) => state.user);
    const { setUserConfigs } = bindActionCreators(actionCreators, dispatch);

    /// Configs Variables
    const [configs, setConfigs] = useState<IConfigs>({} as IConfigs);

    async function GetConfigs(){

        setLoading(true);
       
        await api(apiState.token).get('users/configs').then(res =>{

            console.log(res.data);

            setConfigs(res.data);
            setUserConfigs(res.data);

        }).catch(err => {
            console.log("ERRO");
            console.log(err);

            toast.error('Ops! Erro ao obter informações atualizadas', {duration: 6000, icon: '❌'});

        });

        setLoading(false);
    }

    async function SaveConfigs(){
        setLoading(true);

        const newConfigs = {
            "allow_retroactiveDate": configs.allow_retroactiveDate,
            "allow_notifications": configs.allow_notifications,
            "schedule_startDay": configs.schedule_startDay,
            "user_premium": configs.user_premium,
            "premium_type":	configs.premium_type,
            "premium_until": configs.premium_until
        };
       
        await api(apiState.token).post('users/configs', newConfigs).then(res =>{

            console.log("SALVOU!");

            setUserConfigs(newConfigs);

            toast.success( 'Informações salvas com sucesso!', {duration: 6000, icon: '✅'});

        }).catch(err => {
            console.log("ERRO");

            console.log( JSON.stringify(err) );

            toast.error('Ops! Erro ao salvar as informações', {duration: 6000, icon: '❌'});

        });

        
        setLoading(false);

    }

    useEffect(()=>{
        GetConfigs();
    },[]);


    return(
<SafeAreaView style={{flex: 1, backgroundColor: '#63C2D1'}}>
    <Container >
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>{ GetConfigs() }}/> } contentContainerStyle={{flexGrow: 1}}>

        <Cabecalho titulo="Configurações do APP" onPress={()=> navigation.goBack() } />


        { loading &&
            <LoadingIcon size="large" color="#FFFFFF"/>            
        }

        { !loading && configs &&
            <Wrap>

                <BtnList>
                    <TituloList>Agendamento Retroativo:</TituloList>

                    <Switch 
                        value={ configs.allow_retroactiveDate ? true : false }  
                        onValueChange={() => setConfigs({ ...configs, allow_retroactiveDate: !configs.allow_retroactiveDate }) } 
                        trackColor={{ false:'#000000', true: '#3a86ff' }} 
                        thumbColor="#268596" 
                    />
                </BtnList>
                
                <BtnList>
                    <TituloList>Exibir notificaçõoes:</TituloList>
                    <Switch 
                        value={ configs.allow_notifications ? true : false }  
                        onValueChange={() => setConfigs({ ...configs, allow_notifications: !configs.allow_notifications }) } 
                        trackColor={{ false:'#000000', true: '#3a86ff' }} 
                        thumbColor="#268596" 
                    />
                </BtnList>

                <BtnList>
                    <TituloList>Agendamentos ao início do dia:</TituloList>
                    <Switch 
                        value={ configs.schedule_startDay ? true : false }  
                        onValueChange={() => setConfigs({ ...configs, schedule_startDay: !configs.schedule_startDay}) } 
                        trackColor={{ false:'#000000', true: '#3a86ff' }} 
                        thumbColor="#268596" 
                    />
                </BtnList>
            
            </Wrap>
        }

        { !loading &&
            <WrapFooterCadastro>
                <Button title="Salvar" onPress={ () => { SaveConfigs() }} type="ok" />
            </WrapFooterCadastro>
        }
        
        </ScrollView>
    </Container>
</SafeAreaView>
    )
}