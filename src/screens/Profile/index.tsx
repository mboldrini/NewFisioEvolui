import React from 'react';
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

import { useAuth } from '../../hooks/auth';

export function Profile(){

    const { user, signInWithGoogle } = useAuth();

    return(
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo source={{ uri: user.photo }}/>
                        <User>
                            <UserGreeting>Olá</UserGreeting>
                            <UserName>{ user.name }</UserName>
                        </User>
                    </UserInfo>
                    <AreaLogout>
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