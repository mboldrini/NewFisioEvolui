import React from 'react';
import { HighlightCard } from '../../components/HighlightCard';
import { 
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    Logout,
    HighlightCards,
    Body
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
                    <Logout name="power"/>
                </UserWrapper>
            </Header>

            <HighlightCards>
                <HighlightCard 
                    icone="edit"
                    titulo="Perfil"
                    type="enabled"
                />
                <HighlightCard 
                    icone="search-dollar"
                    titulo="Financeiro"
                    type="disabled"
                />
                <HighlightCard 
                    icone="chart-line"
                    titulo="Estatísticas"
                    type="disabled"
                />
                <HighlightCard 
                    icone="user-cog"
                    titulo="Configurações"
                    type="enabled"
                />
                 <HighlightCard 
                    icone="question-circle"
                    titulo="Sobre o app"
                    type="disabled"
                />
            </HighlightCards>

            <Body></Body>

        </Container>
    )
}