import styled, {css} from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";

export const Container = styled(RectButton)`
    background-color: ${({theme}) => theme.colors.shape};
    margin: 0 ${({theme}) => theme.margin.lateral_half}px;
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

`;

export const Icone = styled(FontAwesome5)`
    font-size: ${RFValue(10)}px;
    color: ${({theme}) => theme.colors.secondary};
    padding: 0 5px 0 0;
`;

export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding: 2px 0 0 0;
`;

export const Company = styled.Text`
    font-size: ${RFValue(10)}px;
    color: ${({theme}) => theme.colors.text};
    font-family: ${({theme}) => theme.fonts.thin};

`;

export const LastDate = styled.Text`
    font-size: ${RFValue(10)}px;
    color: ${({theme}) => theme.colors.text};
    font-family: ${({theme}) => theme.fonts.thin};

`;

export const PersonWrap = styled.View``;

export const PersonName = styled.Text`
    font-family: ${({theme}) => theme.fonts.bold};
    font-size: ${RFValue(14)}px;
    color: #000000;
`;

export const AddressWrap = styled.View``;

export const Address = styled.Text`
    font-size: ${RFValue(10)}px;
    color: ${({theme}) => theme.colors.text};
    font-family: ${({theme}) => theme.fonts.regular};
    
`;



