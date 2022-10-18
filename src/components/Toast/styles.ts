import styled, {css} from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";
import { DefaultAppValues } from "../../global/styles/theme";

interface ITipo{
    tipo: string,
    widt: number,
}

export const Container = styled.View<ITipo>`
    background-color: ${({theme}) => theme.colors.shape};
    margin: 0 ${({theme}) => theme.margin.lateral_half}px;
    margin-right: ${({theme}) => theme.margin.lateral_half}px;
    border-radius: ${({theme}) => theme.bordas.padrao}px;
    flex-direction:column;
    padding: ${RFValue(5)}px ${RFValue(15)}px;
    margin-bottom: ${({theme}) => theme.margin.bottom}px;

    shadow-color: #000;
    shadow-offset: {width: 0px};
    shadow-offset: {height: 2px};
    shadow-opacity: 0.8;
    shadow-radius: 1px;
    elevation: 5;


    min-height: ${RFValue(50)}px;

    border-left-width: ${RFValue(5)}px;

    ${({ tipo }) => !tipo && css ` border-left-width: 0; `};
    ${({ tipo }) => tipo == "success" && css ` border-left-color: ${({theme}) => theme.colors.toast_success}; `};
    ${({ tipo }) => tipo == "info"    && css ` border-left-color: ${({theme}) => theme.colors.toast_info};    `};
    ${({ tipo }) => tipo == "warning" && css ` border-left-color: ${({theme}) => theme.colors.toast_warning}; `};
    ${({ tipo }) => tipo == "error"   && css ` border-left-color: ${({theme}) => theme.colors.toast_error};   `};

`;

export const Wrap = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
`;

export const WrapTitle = styled.View`
    flex-direction: column;
    margin-left: ${RFValue(10)}px;
    margin-right: ${RFValue(2)}px;
`;

export const Icone = styled.Text`
    font-size: ${RFValue(16)}px;
`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(12)}px;
`;

export const Description = styled.Text`
    font-family: ${({theme}) => theme.fonts.thin};
    font-size: ${RFValue(10)}px;
`;





