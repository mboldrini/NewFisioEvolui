import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { 
    Container,
    WrapLeft,
    WrapIcon,
    IconeLeft,
    IconeRight,
    WrapTitle,
    Titulo
} from './styles';

interface Props extends RectButtonProps{
    titulo: string,
    onPress: () => void;
    onPressDel?: () => void;
    arrowSide?: string;
}

export function Cabecalho({titulo, onPress, onPressDel, arrowSide, ...rest}: Props){
    return(
        <Container>
            <WrapLeft>
                <WrapIcon onPress={onPress} {...rest}>
                    <IconeLeft name={ arrowSide ? arrowSide : 'chevron-left' }/>
                </WrapIcon>
                <WrapTitle exist={ !onPress ? true : false }>
                    <Titulo>{titulo}</Titulo>
                </WrapTitle>
            </WrapLeft>
            { onPressDel &&
                <WrapIcon onPress={onPressDel} {...rest}>
                    <IconeRight name="trash"/>
                </WrapIcon>
            }
            
        </Container>
    )
}