import styled, {css} from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";


export const Container = styled.TouchableOpacity`
    background-color: ${({theme}) => theme.colors.shape};
    margin-left: ${({theme}) => theme.margin.lateral}px;
    margin-right: ${({theme}) => theme.margin.lateral}px;
    border-radius: ${({theme}) => theme.bordas.padrao}px;
    flex-direction:column;
    padding: 10px 15px;
    margin-bottom: ${({theme}) => theme.margin.bottom}px;
    border-width: 1;
    border-color: #f5f5f5;
    border-bottom-width: 1;
    shadow-color: #000;
    shadow-offset: {width: 0};
    shadow-offset: {height: 2};
    shadow-opacity: 0.8;
    shadow-radius: 1px;
    elevation: 1;
`;

export const Icone = styled(FontAwesome5)`
    font-size: ${RFValue(12)}px;
    color: ${({theme}) => theme.colors.secondary};
    padding: 0 5px 0 0;
`;

export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding: 5px 0 0 0;
`;

export const Company = styled.Text`
    font-size: ${RFValue(12)}px;
    color: ${({theme}) => theme.colors.text};
    font-family: ${({theme}) => theme.fonts.thin};

`;

export const LastDate = styled.Text`
    font-size: ${RFValue(12)}px;
    color: ${({theme}) => theme.colors.text};
    font-family: ${({theme}) => theme.fonts.thin};

`;

export const PersonWrap = styled.View``;

export const PersonName = styled.Text`
    font-family: ${({theme}) => theme.fonts.bold};
    font-size: ${RFValue(18)}px;
    color: #000000;
`;

export const AddressWrap = styled.View``;

export const Address = styled.Text`
    font-size: ${RFValue(14)}px;
    color: ${({theme}) => theme.colors.text};
    font-family: ${({theme}) => theme.fonts.regular};
`;



