import styled, {css} from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { FontAwesome5 } from "@expo/vector-icons";

export const Container = styled.ScrollView`
    flex: 1;
    background-color: ${({theme}) => theme.colors.primary};
`;

export const WrapDiaAtendimento = styled.View`
    /* border: 1px solid red; */
    align-items: center;
    justify-content: center;
`;

export const WrapBorder = styled.View`
    border-bottom-width: 1px;
    padding: 0 ${RFValue(15)}px;
    border-bottom-color: ${({theme}) => theme.colors.text_dark};
`;

export const Dia = styled.Text`
    font-family: ${({theme}) => theme.fonts.bold};
`;

export const DiaAtendimento = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.text_dark};
`;

export const WrapContent = styled.View`
    margin-top: ${RFValue(15)}px;
`;

