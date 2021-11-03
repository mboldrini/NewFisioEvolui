import React from 'react';
import { Text } from 'react-native';
import { Input } from '../../components/Forms/Input';
import { 
    Container,
    Header,
    Titulo,
} from './styles';

export function CadastrarPaciente(){
    return(
        <Container>
            <Header>
                <Titulo>Cadastrar Paciente</Titulo>
            </Header>
            <Input placeholder="Nome"/>
            <Input placeholder="Telefone"/>
            <Input placeholder="Email"/>
            <Input placeholder="Endereco"/>
        </Container>
    )
}