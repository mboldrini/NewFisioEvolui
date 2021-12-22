import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { TouchableOpacityProps } from 'react-native';
import {
    Container,
    Title,
    Photo,
} from './styles';

interface Props extends TouchableOpacityProps{
    onPress: () => void;
}

export function ButtonGoogle({ onPress,...rest}: Props){
    return(
        <Container onPress={onPress} {...rest} >
            {/* <Icone name="google"/> */}
            <Photo source={require('../../../assets/g-logo.png')}/>
            <Title>Entrar com Google</Title>
        </Container>
    );
}

