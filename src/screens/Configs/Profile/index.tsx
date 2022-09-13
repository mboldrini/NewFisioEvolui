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
    qtdPacientes: number
}

export function Profile(){

    const navigation = useNavigation();

    const dispatch = useDispatch();
    const { setUserInfos, setApiInfos } = bindActionCreators(actionCreators, dispatch);
    const usrState = useSelector((state: State) => state.user);

    const [profileStatistics, setProfileStatistics] = useState<IProfileStats>();

    async function handleLogoff(){

        // setUserInfos({
        //     id: -1,
        //     name: '',
        //     email: null,
        //     family_name: '',
        //     given_name: '',
        //     picture: '',
        //     token: '',
        // });

        // navigation.navigate('SignIn' as never);
    }

    async function GetProfileStatistics(){
        // await api(usrState.token).get('/users/profileStatistics').then(res =>{
            
        //     setProfileStatistics(res.data);

        // }).catch(err => {
        //     setProfileStatistics(null);
        // });
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