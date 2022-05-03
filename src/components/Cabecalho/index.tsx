import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { 
    Container,
    WrapLeft,
    WrapIcon,
    IconeLeft,
    IconeRight,
    Titulo
} from './styles';

interface Props extends RectButtonProps{
    titulo: string,
    onPress: () => void;
    onPressDel?: () => void;
}

export function Cabecalho({titulo, onPress, onPressDel, ...rest}: Props){
    return(
        <Container>
            <WrapLeft>
            <WrapIcon onPress={onPress} {...rest}>
                <IconeLeft name="chevron-left"/>
            </WrapIcon>
            <Titulo>{titulo}</Titulo>
            </WrapLeft>
            { onPressDel &&
            <WrapIcon onPress={onPressDel} {...rest}>
                <IconeRight name="trash"/>
            </WrapIcon>
            }
            
        </Container>
    )
}