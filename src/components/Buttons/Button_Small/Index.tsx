import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { TouchableOpacityProps } from 'react-native';
import {
    WrapAction,
    ButtonSmallBd,
    TitleBtn,
    IconeBtn,
    WrapTitle
} from './styles';

interface Props extends TouchableOpacityProps{
    onPress: () => void;
    icone: string;
    titulo: string;
}

export function ButtonSmall({ onPress, icone, titulo}: Props){
    return(
        <WrapAction>
            <ButtonSmallBd onPress={onPress}>
                <WrapTitle>
                    <IconeBtn name={icone} />
                    <TitleBtn>{titulo}</TitleBtn>
                </WrapTitle>
            </ButtonSmallBd>
        </WrapAction>
    );
}

