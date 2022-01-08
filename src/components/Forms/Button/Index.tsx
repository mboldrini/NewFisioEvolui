import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { TouchableOpacityProps } from 'react-native';
import {
    Container,
    Title
} from './styles';

interface Props extends TouchableOpacityProps{
    title: string;
    type?: 'ok' | 'cancel';
    onPress: () => void;
}

export function Button({title, type, onPress, ...rest}: Props){
    return(
        <Container onPress={onPress} {...rest} type={type}>
            <Title type={type}>
                { title }
            </Title>
        </Container>
    );
}

