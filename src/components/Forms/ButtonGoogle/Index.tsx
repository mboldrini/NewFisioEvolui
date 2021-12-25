import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { TouchableOpacityProps } from 'react-native';
import {
    Container,
    WrapLogo,
    Logo,
    Title,
} from './styles';

interface Props extends TouchableOpacityProps{
    onPress: () => void;
}

export function ButtonGoogle({ onPress,...rest}: Props){
    return(
        <Container onPress={onPress} {...rest} >
            <WrapLogo>
                <Logo source={require('../../../assets/g-logo.png')}/>
            </WrapLogo>
            <Title>Entrar com Google</Title>
        </Container>
    );
}

