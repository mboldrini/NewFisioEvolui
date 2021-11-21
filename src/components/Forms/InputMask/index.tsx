import React from "react";
import { TextInputProps } from "react-native";

import { TextInputMaskProps  } from "react-native-masked-text";

import {
    Container
} from './styles';

type Props = TextInputMaskProps;

export function InputMask({...rest}: Props){

    return(
        <Container {...rest} placeholderTextColor="#4EADBE" />
    )
}

