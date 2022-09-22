import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { 
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    AreaLogout,
    Logout,

    InfosWrap,
    Infos,
    QtdInfos,
    InfoDesc,

    Body,
    WrapIcone,
    Icone,
    BtnList,
    TituloList,

} from './styles';
// /// REDUX
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators, State } from '../../../state';
import { api } from '../../../global/api';
import Toast from 'react-native-toast-message';

interface IProfileStats{
    qtdAtendimentos: number,
    qtdPacientes: number,
    qtdEvolucoes: number
}

export function Profile(){

    const navigation = useNavigation();

    const dispatch = useDispatch();
    const { setUserInfos, setPacientes, setAtendimentos, setFormasPgto, setUserConfigs } = bindActionCreators(actionCreators, dispatch);
    const usrState = useSelector((state: State) => state.user);
    const apiState = useSelector((state: State) => state.apiReducer);

    const [profileStatistics, setProfileStatistics] = useState<IProfileStats>();

    async function handleLogoff(){

        setUserInfos({
            user_code: null,
            name: null,
            family_name: null,
            given_name: null,
            picture: null,
            email: null,
            enabled: null,
            created_at: null,
            address: null, 
            configs: null, 
            personal_infos: {
                professional_mail: null,
                celphone: null,
            }
        });
        setPacientes([]);
        setAtendimentos([]);
        setFormasPgto([]);
        setUserConfigs({
            start_workHour: null, 
            end_workHour: null, 
            allow_retroactiveDate: null, 
            allow_notifications: null, 
            schedule_startDay: null, 
            user_premium: null, 
            premium_type: null,
            premium_until: null,
        })

        navigation.navigate('SignIn' as never);
    }

    async function GetProfileStatistics(){
        await api(apiState.token).get('users/infos/statistic').then(res =>{
            
            setProfileStatistics(res.data);
            console.log("setou as estatisticas!");

        }).catch(err => {
            setProfileStatistics(null);
        });
    }

    useEffect(()=>{
        GetProfileStatistics();
    },[]);

    return(
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo source={{ uri: usrState.picture }}/> 
                        <User>
                            <UserGreeting>Olá</UserGreeting>
                            <UserName>{ usrState.name }</UserName>
                        </User>
                    </UserInfo>
                    <AreaLogout onPress={()=>{handleLogoff()}}>
                        <Logout source={require('../../../assets/icons/logout.png')}/>
                    </AreaLogout>
                </UserWrapper>
            </Header>

            { profileStatistics?.qtdAtendimentos &&
                <InfosWrap>
                    <Infos>
                        <QtdInfos>{ profileStatistics.qtdPacientes }</QtdInfos>
                        <InfoDesc>Pacientes</InfoDesc>
                    </Infos>
                    
                    <Infos>
                        <QtdInfos>{ profileStatistics.qtdAtendimentos }</QtdInfos>
                        <InfoDesc>Atendimentos</InfoDesc>
                    </Infos>

                    <Infos>
                        <QtdInfos>{ profileStatistics.qtdEvolucoes }</QtdInfos>
                        <InfoDesc>Evoluções</InfoDesc>
                    </Infos>
                </InfosWrap>
            }
           


            <Body>
                <BtnList enabled={false}>
                    <TituloList enabled={false}>Meu Perfil</TituloList>
                    <WrapIcone><Icone name="chevron-right" enabled={false}/></WrapIcone>
                </BtnList>

                <BtnList onPress={()=> navigation.navigate('ListarFormasPagamento' as never)}>
                    <TituloList>Formas de Pagamento</TituloList>
                    <WrapIcone><Icone name="chevron-right" enabled={true}/></WrapIcone>
                </BtnList>

                <BtnList onPress={()=> navigation.navigate('ListarTiposAtendimento' as never)}>
                    <TituloList>Tipos de Atendimento</TituloList>
                    <WrapIcone><Icone name="chevron-right" enabled={true}/></WrapIcone>
                </BtnList>

                <BtnList enabled={true} onPress={()=> navigation.navigate('DiaHoraTrabalho' as never)}>
                    <TituloList enabled={true}>Dia/Hora de Trabalho</TituloList>
                    <WrapIcone><Icone name="chevron-right" enabled={true}/></WrapIcone>
                </BtnList>

                <BtnList  enabled={true} onPress={() => navigation.navigate('ConfiguracoesPessoais' as never) }>
                    <TituloList enabled={true}>Configurações</TituloList>
                    <WrapIcone><Icone name="chevron-right" enabled={true}/></WrapIcone>
                </BtnList>

                <BtnList enabled={false}>
                    <TituloList enabled={false}>Sobre</TituloList>
                    <WrapIcone><Icone name="chevron-right" enabled={false}/></WrapIcone>
                </BtnList>
            </Body>

        </Container>
    )
}