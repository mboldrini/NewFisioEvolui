import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { TouchableOpacityProps } from 'react-native';
import {
    Container,
    Icon,
} from './styles';

interface Props extends TouchableOpacityProps{
    type?: 'ok' | 'cancel';
    onPress: () => void;
}

function IconType(type: string){
    if( type == "ok"){
        return "plus"
    }
    if( type == "cancel"){
        return "trash"
    }
}

export function RoundButton({type, onPress, ...rest}: Props){
    return(
        <Container onPress={onPress} {...rest} type={type}>
            <Icon name={ IconType(type) } />
        </Container>
    );
}

