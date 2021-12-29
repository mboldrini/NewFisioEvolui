import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { BotoesPerfil } from '../../components/BotoesPerfil';
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
    Body,
    WrapperGroup,
    HighlightCards
} from './styles';

//import { useAuth } from '../../hooks/auth';

import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '../../state';


export function Profile(){

//    const { user, signInWithGoogle } = useAuth();

    const navigation = useNavigation();

  const dispatch = useDispatch();
  const { setUserInfos } = bindActionCreators(actionCreators, dispatch);
  const usrState = useSelector((state: State) => state.user);



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
                    <AreaLogout onPress={()=>{navigation.navigate('Login')}}>
                        <Logout name="power"/>
                    </AreaLogout>
                </UserWrapper>
            </Header>

            <HighlightCards>
                <WrapperGroup>
                    <BotoesPerfil 
                        icone="user-edit"
                        titulo="Editar Perfil"
                        onPress={()=>(console.log("aAa"))}
                    />
                    <BotoesPerfil 
                        icone="user-cog"
                        titulo="Configurações de Atendimento"
                        onPress={()=>(console.log("aAa"))}
                    />
                        <BotoesPerfil 
                        icone="file-medical-alt"
                        titulo="Tipos de Atendimento"
                        onPress={()=>(console.log("aAa"))}
                    />
                </WrapperGroup>

                <WrapperGroup>
                    <BotoesPerfil 
                        icone="search-dollar"
                        titulo="Informações Financeiras"
                        onPress={()=>(console.log("aAa"))}
                    />
                    <BotoesPerfil 
                        icone="chart-line"
                        titulo="Estatísticas de Atendimentos"
                        onPress={()=>(console.log("aAa"))}
                    />
                </WrapperGroup>
                
                <WrapperGroup>
                    <BotoesPerfil 
                        icone="wrench"
                        titulo="Configurações do Aplicativo"
                        onPress={()=>(console.log("aAa"))}
                    />
                    <BotoesPerfil 
                        icone="question-circle"
                        titulo="Sobre o app"
                        onPress={()=>(console.log("aAa"))}
                    />
                </WrapperGroup>

            </HighlightCards>

            

        </Container>
    )
}