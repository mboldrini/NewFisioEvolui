import { FontAwesome5 } from "@expo/vector-icons";
import styled, {css} from "styled-components/native";
import { RFValue } from 'react-native-responsive-fontsize';
import theme, { DefaultAppValues } from "../../../global/styles/theme";

interface IProp{
    enabled?: boolean;
}

export const VW = styled.View`
    flex-direction: column;
`;

export const Container = styled.TouchableOpacity.attrs({
    activeOpacity: 0.7
})<IProp>`
    background-color: ${({theme}) => theme.colors.input_background};
    border-radius: ${({theme}) => theme.bordas.padrao}px;
    height: ${RFValue(40)}px;
    margin: 0 ${({theme}) => theme.padding.lateral_half}px;
    margin-bottom: ${({theme}) => theme.margin.input_bottom}px;
    padding: 0 ${RFValue(10)}px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const Category = styled.Text<IProp>`
    ${({ enabled }) => enabled == false && css `
        color:#c3c3c3;
    `};
`;

export const Icon = styled(FontAwesome5)`
    font-size: ${RFValue(18)}px;
    padding-right: ${RFValue(5)}px;

    ${({ enabled }) => enabled == false && css `
        color:#c3c3c3;
    `};

`;

export const PlaceHolder = styled.Text`
    color: #ffffff;
    font-size: ${RFValue(12)}px;
    padding-left: ${RFValue(DefaultAppValues.padding.lateral_half)}px;
`;







