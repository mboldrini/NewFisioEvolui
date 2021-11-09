import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { 
    Container,
    WrapIcon,
    Icone,
    Titulo
} from './styles';

interface Props extends RectButtonProps{
    titulo: string,
    onPress: () => void;
}

export function Cabecalho({titulo, onPress, ...rest}: Props){
    return(
        <Container>
            <WrapIcon onPress={onPress} {...rest}>
                <Icone name="chevron-left"/>
            </WrapIcon>
            <Titulo>{titulo}</Titulo>
        </Container>
    )
}