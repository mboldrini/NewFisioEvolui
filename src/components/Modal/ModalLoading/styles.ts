import { FontAwesome5 } from '@expo/vector-icons';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled, {css} from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import {GestureHandlerRootView} from 'react-native-gesture-handler';


export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.primary}; 
    align-items: center;
    justify-content: center;
`;

export const Mensagem = styled.Text`
    font-size: ${RFValue(25)}px;
    color: ${({theme}) => theme.colors.text_dark};
    margin-top: ${RFValue(10)}px;
`;
