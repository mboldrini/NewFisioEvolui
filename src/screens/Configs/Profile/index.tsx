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

interface IProfileStats{
    qtdAtendimentos: number,
    qtdPacientes: number
}

export function Profile(){

    const navigation = useNavigation();

    const dispatch = useDispatch();
    const { setUserInfos, setApiInfos } = bindActionCreators(actionCreators, dispatch);
    const usrState = useSelector((state: State) => state.user);

    const [profileStatistics, setProfileStatistics] = useState<IProfileStats>();

    async function handleLogoff(){

        setUserInfos({
            id: null,
            name: '',
            email: null,
            family_name: '',
            given_name: '',
            picture: '',
            token: '',
        });

        navigation.navigate('SignIn' as never);
    }

    async function GetProfileStatistics(){
        await api(usrState.token).get('/users/profileStatistics').then(res =>{
            
            setProfileStatistics(res.data);

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
                </InfosWrap>
            }
           


            <Body>
                <BtnList enabled={false}>
                    <WrapIcone><Icone name="address-card" enabled={false}/></WrapIcone>
                    <TituloList enabled={false}>Meu Perfil</TituloList>
                </BtnList>

                <BtnList onPress={()=> navigation.navigate('ListarTiposAtendimentos' as never)}>
                    <WrapIcone><Icone name="address-book"/></WrapIcone>
                    <TituloList>Tipo de Atendimento</TituloList>
                </BtnList>

                <BtnList enabled={false}>
                    <WrapIcone><Icone name="chart-bar" enabled={false}/></WrapIcone>
                    <TituloList enabled={false}>Estatísticas</TituloList>
                </BtnList>

                <BtnList onPress={() => navigation.navigate('ConfiguracoesPessoais' as never) }>
                    <WrapIcone><Icone name="wrench"/></WrapIcone>
                    <TituloList>Configurações</TituloList>
                </BtnList>

                <BtnList enabled={false}>
                    <WrapIcone><Icone name="question" enabled={false}/></WrapIcone>
                    <TituloList enabled={false}>Sobre</TituloList>
                </BtnList>
            </Body>

        </Container>
    )
}