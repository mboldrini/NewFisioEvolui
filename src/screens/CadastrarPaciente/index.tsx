import React from 'react';
import { Text } from 'react-native';
import { Input } from '../../components/Forms/Input';
import { 
    Container
} from './styles';

export function CadastrarPaciente(){
    return(
        <Container>
            <Text>Favorites</Text>
            <Input placeholder="Nome"/>
            <Input placeholder="Telefone"/>
            <Input placeholder="Email"/>
            <Input placeholder="Endereco"/>
        </Container>
    )
}