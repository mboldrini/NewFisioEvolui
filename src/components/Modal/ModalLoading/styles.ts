import { RFValue } from "react-native-responsive-fontsize";
import styled, {css} from "styled-components/native";
import {GestureHandlerRootView} from 'react-native-gesture-handler';

interface Props{
    tipo: "erro" | "loading" | "info" | "ok";
}

export const Container = styled(GestureHandlerRootView)`
    flex: 1;
    background-color: ${({theme}) => theme.colors.primary}; 
    align-items: center;
    justify-content: center;
    margin-top: ${RFValue(40)}px;
`;

export const Mensagem = styled.Text<Props>`
    font-size: ${RFValue(25)}px;
    color: #000000; //${({theme}) => theme.colors.text_dark};
    font-family: ${({theme}) => theme.fonts.bold};
    margin: 0 ${RFValue(15)}px;
    margin-top: ${RFValue(10)}px;

`;

export const Bloco = styled.View<Props>`
    width: ${RFValue(400)}px;
    height: ${RFValue(400)}px;

    ${({ tipo }) => tipo == 'erro' && css `
        width: ${RFValue(200)}px;
        height: ${RFValue(200)}px;
    `}; 

    ${({ tipo }) => tipo == 'info' && css `
        width: ${RFValue(250)}px;
        height: ${RFValue(250)}px;
    `}; 

    ${({ tipo }) => tipo == 'ok' && css `
        width: ${RFValue(250)}px;
        height: ${RFValue(250)}px;
    `}; 

    ${({ tipo }) => tipo == 'loading' && css `
        width: ${RFValue(250)}px;
        height: ${RFValue(250)}px;
    `}; 

`;
