import styled from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";

export const Container = styled(RectButton)`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: ${({theme}) => theme.margin.bottom}px;
    background-color: ${({theme}) => theme.colors.shape};
    border-radius: ${({theme}) => theme.bordas.padrao}px;
`;

export const AreaIcone = styled.View`
    align-items: center;
    justify-content: center;
    padding: ${RFValue(10)}px 0;
    padding-left: ${RFValue(10)}px;
`;

export const Icone = styled(FontAwesome5)`
    font-size: ${RFValue(18)}px;
    color: ${({theme}) => theme.colors.secondary};
`;

export const Titulo = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.secondary};
    font-size: ${RFValue(14)}px;
    padding: 0 0 0 ${RFValue(10)}px;
`;

