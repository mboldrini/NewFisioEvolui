import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { BotoesPerfil } from '../../components/BotoesPerfil';
import { StorageUserKey } from '../../global/variaveis/globais';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
    WrapList,
    BtnList,
    IconeList,
    TituloList,

} from './styles';

import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '../../state';


export function Profile(){

    const navigation = useNavigation();

    const dispatch = useDispatch();
    const { setUserInfos } = bindActionCreators(actionCreators, dispatch);
    const usrState = useSelector((state: State) => state.user);

    function handleLogoff(){
        AsyncStorage.removeItem(StorageUserKey);
        navigation.navigate('SignIn');
    }


    return(
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo source={{ uri: usrState.picture }}/> 
                        <User>
                            <UserGreeting>Olá</UserGreeting>
                            <UserName>{ usrState.given_name }</UserName>
                        </User>
                    </UserInfo>
                    <AreaLogout onPress={()=>{handleLogoff()}}>
                        <Logout source={require('../../../src/assets/icons/logout.png')}/>
                    </AreaLogout>
                </UserWrapper>
            </Header>

            <InfosWrap>
                <Infos>
                    <QtdInfos>150</QtdInfos>
                    <InfoDesc>Pacientes</InfoDesc>
                </Infos>
               
                <Infos>
                    <QtdInfos>230</QtdInfos>
                    <InfoDesc>Atendimentos</InfoDesc>
                </Infos>
            </InfosWrap>


            <Body>
                <WrapList>
                    <BtnList>
                        <IconeList source={require('../../../src/assets/icons/profile.png')}/>
                        <TituloList>Meu Perfil</TituloList>
                    </BtnList>

                    <BtnList>
                        <IconeList source={require('../../../src/assets/icons/check_list.png')}/>
                        <TituloList>Tipo de Atendimento</TituloList>
                    </BtnList>

                    <BtnList>
                        <IconeList source={require('../../../src/assets/icons/graph.png')}/>
                        <TituloList>Estatísticas</TituloList>
                    </BtnList>

                    <BtnList>
                        <IconeList source={require('../../../src/assets/icons/config.png')}/>
                        <TituloList>Configurações</TituloList>
                    </BtnList>

                    <BtnList>
                        <IconeList source={require('../../../src/assets/icons/question.png')}/>
                        <TituloList>Sobre</TituloList>
                    </BtnList>
                </WrapList>


            </Body>

        </Container>
    )
}