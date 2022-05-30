import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { TouchableOpacityProps } from 'react-native';
import {
    Container,
    Title
} from './styles';

interface Props extends TouchableOpacityProps{
    title: string;
    onPress: () => void;
    type: 'default' | 'cancel';
}

export function ButtonSimple({title, onPress, type, ...rest}: Props){
    return(
        <Container onPress={onPress} {...rest} type={type}>
            <Title>
                { title }
            </Title>
        </Container>
    );
}

