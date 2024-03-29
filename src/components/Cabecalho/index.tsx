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
    onPressIcon?: 'chevron-up' | 'chevron-right' | 'chevron-down' | 'chevron-left';
    onPressSecond?: () => void;
    onPressSecondIcon?: string;
}

export function Cabecalho({titulo, onPress, onPressIcon = 'chevron-left', onPressSecond, onPressSecondIcon = 'trash', ...rest}: Props){

    return(
        <Container arrowSide={onPressIcon}>
            <WrapLeft>
                <WrapIcon onPress={onPress} {...rest}>
                    <IconeLeft name={ onPressIcon }/>
                </WrapIcon>
                <WrapTitle exist={ !onPress ? true : false }>
                    <Titulo>{titulo}</Titulo>
                </WrapTitle>
            </WrapLeft>
            { onPressSecond &&
                <WrapIcon onPress={onPressSecond} {...rest}>
                    <IconeRight name={ onPressSecondIcon }/>
                </WrapIcon>
            }
            
        </Container>
    )
}