import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import {
    Container,
    AreaIcone,
    Icone,
    Titulo
} from './styles';

interface Props extends RectButtonProps{
    icone: string,
    titulo: string;
    onPress: () => void;
}

export function BotoesPerfil({
    icone,
    titulo,
    onPress,
    ...rest
}: Props){
    return(
        <Container onPress={onPress} {...rest}>
            <AreaIcone>
                <Icone name={icone}/>
            </AreaIcone>
            <Titulo>{titulo}</Titulo>
        </Container>
    )
}

