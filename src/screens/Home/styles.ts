import styled from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const Container = styled.ScrollView.attrs({
    vertical: true,
    showsVerticalScrollIndicator: false,
    contentContainerStyle: { paddingVertical: 24 }
})`
    flex: 1;
    background-color: ${({theme}) => theme.colors.primary};
`;

export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding-top: ${RFValue(12)}px;
    padding: 15px ${({theme}) => theme.padding.lateral}px;
    align-items: center;
`;

export const Titulo = styled.Text`
    font-size: ${RFValue(22)}px;
    color: #ffffff;
    font-family: ${({theme}) => theme.fonts.bold};
`;

export const Icon = styled(FontAwesome5)`
    color: #ffffff;
    font-size: ${RFValue(22)}px;
`;



