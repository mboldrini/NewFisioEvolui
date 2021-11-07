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

export function Profile(){
    return(
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo source={{ uri: "https://i.pinimg.com/564x/a1/2b/56/a12b562237ca785697e50573cec31bef.jpg" }}/>
                        <User>
                            <UserGreeting>Olá</UserGreeting>
                            <UserName>Bartolomeu Santos</UserName>
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
                        />
                        <BotoesPerfil 
                            icone="user-cog"
                            titulo="Configurações de Atendimento"
                        />
                         <BotoesPerfil 
                            icone="file-medical-alt"
                            titulo="Tipos de Atendimento"
                        />
                    </WrapperGroup>

                    <WrapperGroup>
                        <BotoesPerfil 
                            icone="search-dollar"
                            titulo="Informações Financeiras"
                        />
                        <BotoesPerfil 
                            icone="chart-line"
                            titulo="Estatísticas de Atendimentos"
                        />
                    </WrapperGroup>
                   
                    <WrapperGroup>
                        <BotoesPerfil 
                            icone="wrench"
                            titulo="Configurações do Aplicativo"
                        />
                        <BotoesPerfil 
                            icone="question-circle"
                            titulo="Sobre o app"
                        />
                    </WrapperGroup>

                </HighlightCards>


        </Container>
    )
}