import React from "react";
import { Text, TextInputProps } from "react-native";

import {
    Container
} from './styles';

type Props = TextInputProps;

export function Input({...rest}: Props){

    return(
        <Container {...rest} placeholderTextColor="#4EADBE" />
    )
}

