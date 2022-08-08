import styled, {css} from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { FontAwesome5 } from "@expo/vector-icons";
import { DefaultAppValues } from "../../global/styles/theme";

export const Container = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin: ${RFValue(10)}px  ${({theme}) => theme.margin.lateral_half}px;
    padding: ${RFValue(10)}px;
    background-color: ${({theme}) => theme.colors.secondary};
    border-radius: ${({theme}) => theme.bordas.padrao}px;
`;

export const Picture = styled(FontAwesome5)`
    font-size: ${RFValue(20)}px;
    color: ${({theme}) => theme.colors.secondary};
    padding: ${RFValue(10)}px;
    background-color: ${({theme}) => theme.colors.shape};
    border-radius: ${({theme}) => theme.bordas.padrao};
    margin-right: ${RFValue(5)}px;
`;

export const InfosWrapper = styled.View`
    justify-content: flex-start;
    align-items: flex-start;
    margin-left: ${RFValue(5)}px;
`;

export const IconeTipo = styled(FontAwesome5)`
    color: ${({theme}) => theme.colors.shape};
`;

export const Tipo = styled.Text`
    color: ${({theme}) => theme.colors.shape};
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(DefaultAppValues.fontSize.um)}px;
`;

export const Nome = styled.Text`
  color: ${({theme}) => theme.colors.shape};
    font-family: ${({theme}) => theme.fonts.bold};
    font-size: ${RFValue(DefaultAppValues.fontSize.tres)}px;
`;



