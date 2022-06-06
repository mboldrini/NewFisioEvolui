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
    onPressSecond?: () => void;
    onPressSecondIcon?: string;
}

export function Cabecalho_Modal({titulo, onPress, onPressSecond, onPressSecondIcon = 'trash', ...rest}: Props){

    return(
        <Container>
            <WrapLeft>
                <WrapIcon onPress={()=>{ onPress() } }  {...rest}>
                    <IconeLeft name='chevron-down' />
                </WrapIcon>
                <WrapTitle exist={ !onPress ? true : false }>
                    <Titulo>{titulo}</Titulo>
                </WrapTitle>
            </WrapLeft>
            { onPressSecond &&
                <WrapIcon onPress={()=> onPressSecond() } {...rest}>
                    <IconeRight name={ onPressSecondIcon }/>
                </WrapIcon>
            }
        </Container>
    )
}