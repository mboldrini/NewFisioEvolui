import { RFValue } from 'react-native-responsive-fontsize';
import styled, {css} from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";

interface Props{
    tipoAtendimento: number;
}

export const Container = styled.View`
    background-color: ${({theme}) => theme.colors.shape};
    border-radius: ${({theme}) => theme.bordas.padrao};
    flex-direction: row;
    margin-bottom: ${({theme}) => theme.margin.bottom}px;
`;

export const WraperData = styled.View<Props>`
    align-items: center;
    justify-content: center;
    border-top-left-radius: ${({theme}) => theme.bordas.padrao}px;
    border-bottom-left-radius: ${({theme}) => theme.bordas.padrao}px;
    background-color: ${({theme}) => theme.colors.secondary};
    /*margin: ${RFValue(5)}px;*/
    padding: 0 ${RFValue(10)}px;
    min-width: ${RFValue(65)}px;

    ${({ tipoAtendimento }) => tipoAtendimento == 0 && css `
        background-color: ${({theme}) => theme.colors.status_recorrente};
    `};

    ${({ tipoAtendimento }) => tipoAtendimento == 1 && css `
        background-color: ${({theme}) => theme.colors.status_default};
    `};

    ${({ tipoAtendimento }) => tipoAtendimento == 2 && css `
        background-color: ${({theme}) => theme.colors.status_avaliacao};
        color: #ffffff;
    `};

`;

export const DiaSemana = styled.Text<Props>`
    font-size: ${RFValue(18)}px;
    font-family: ${({theme}) => theme.fonts.bold};
    color: ${({theme}) => theme.colors.shape};
    text-transform: uppercase;

    ${({ tipoAtendimento }) => tipoAtendimento == 1 && css `
        color: #000000;
    `};

`;

export const Icone = styled(FontAwesome5)<Props>`
   color: #ffffff;
   font-size: ${RFValue(20)}px;
   padding-bottom: ${RFValue(5)}px;

   ${({ tipoAtendimento }) => tipoAtendimento == 1 && css `
        color: #000000;
    `};

`;

export const DiaMes = styled.Text<Props>`
    font-size: ${RFValue(18)}px;
    font-family: ${({theme}) => theme.fonts.bold};
    color: ${({theme}) => theme.colors.shape};

    ${({ tipoAtendimento }) => tipoAtendimento == 1 && css `
        color: #000000;
    `};
`;

export const WraperInfos = styled.View`
    flex-direction: column;
    padding-top: ${RFValue(5)}px;
    align-items: flex-start;
    padding: 0 ${RFValue(5)}px;
    justify-content:center;
`;


export const Horario = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(16)}px;
    color: #000000;
`;

export const Limite = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(16)}px;
    color: #000000;
`;

export const LimiteBold = styled.Text`
    font-family: ${({theme}) => theme.fonts.bold};
    font-size: ${RFValue(16)}px;
    color: #000000;
`;





