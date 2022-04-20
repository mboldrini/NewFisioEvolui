import styled from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.primary};
`;

export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding-top: ${RFValue(12)}px;
    padding: 15px ${({theme}) => theme.padding.lateral}px;
    align-items: center;
    margin-top: 20px;
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

export const WrapScroll = styled.ScrollView``;

export const Wrap = styled.View`
    margin-top: ${RFValue(50)}px;
    margin: ${RFValue(50)}px ${({theme}) => theme.margin.lateral}px;
    justify-content: center;
    align-items: center;
    flex-direction: column;

`;

export const WrapLoading = styled.View`
    width: 100%;
    height: ${RFValue(200)}px;
`;

export const TextoLoading = styled.Text`
    font-family: ${({theme}) => theme.fonts.bold};
    color: ${({theme}) => theme.colors.text_dark};
    font-size: ${RFValue(22)}px;
`;


