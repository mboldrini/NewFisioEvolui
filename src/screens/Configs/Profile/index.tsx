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
    Quantidade,
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
import { Text } from 'react-native';

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

    const [profileStatistics, setProfileStatistics] = useState<IProfileStats>(null);
    const [showStatistic, setShowStatistic] = useState(false);

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
        console.group("GetProfileStatistics");

        setShowStatistic(false);

        await api(apiState.token).get('users/infos/statistic').then(res =>{
            
            console.log(res.data);
            setProfileStatistics(res.data);
            console.log("setou as estatisticas!");

            setShowStatistic(true);

        }).catch(err => {
            setProfileStatistics(null);
        });

        console.groupEnd();
    }

    useEffect(()=>{
       GetProfileStatistics();
    },[]);

    useEffect(()=>{
        if(profileStatistics?.qtdAtendimentos != 0){
            setShowStatistic(true);
        }
    }, [profileStatistics]);

    return(
        <Container>
            { usrState.name &&
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
            }

            { showStatistic &&
                <InfosWrap>
                    <Infos>
                        <Quantidade>{profileStatistics?.qtdPacientes}</Quantidade>
                        <InfoDesc>Pacientes</InfoDesc>
                    </Infos>

                    <Infos>
                         <Quantidade>{ profileStatistics?.qtdAtendimentos }</Quantidade>
                         <InfoDesc>Atendimentos</InfoDesc>
                     </Infos>

                     <Infos>
                         <Quantidade>{ profileStatistics?.qtdEvolucoes }</Quantidade>
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