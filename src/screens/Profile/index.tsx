import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { BotoesPerfil } from '../../components/BotoesPerfil';
import { StorageUserKey } from '../../global/variaveis/variaveis';
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
    WrapArea,
    Linha,
    Btn,
    Icone,
    Titulo
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
        navigation.navigate('Login');
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
                <WrapArea>
                    <Linha>
                        <Btn>
                            <Icone source={require('../../../src/assets/icons/profile.png')}/>
                            <Titulo>Meu Perfil</Titulo>
                        </Btn>
                        <Btn>
                            <Icone source={require('../../../src/assets/icons/check_list.png')}/>
                            <Titulo>Tipo Atend.</Titulo>
                        </Btn>
                        <Btn>
                            <Icone source={require('../../../src/assets/icons/graph.png')}/>
                            <Titulo>Estatísticas</Titulo>
                        </Btn>
                    </Linha>
                    <Linha>
                        <Btn>
                            <Icone source={require('../../../src/assets/icons/config.png')}/>
                            <Titulo>Config.</Titulo>
                        </Btn>
                        <Btn>
                            <Icone source={require('../../../src/assets/icons/question.png')}/>
                            <Titulo>Sobre</Titulo>
                        </Btn>
                    </Linha>
                    
                </WrapArea>
            </Body>

        </Container>
    )
}