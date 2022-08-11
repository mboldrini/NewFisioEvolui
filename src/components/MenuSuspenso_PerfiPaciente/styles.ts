import styled, {css} from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { FontAwesome5 } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import { DefaultAppValues } from "../../global/styles/theme";

interface IProp{
    lastItem: boolean
}

export const ViewBtn = styled.TouchableOpacity`
    width: ${RFValue(50)}px;
    height: ${RFValue(50)}px;
    background-color: red; 
`;

export const AreaMenu = styled.View`
    position: absolute;
    background-color: #ffffff;
    top: ${RFValue(15)}px;
    right: ${RFValue(15)}px;
    border-radius: ${RFValue(DefaultAppValues.bordas.padrao)}px;
    border: 2px solid ${({theme}) => theme.colors.text_dark};
`;

export const BtnMenuList = styled.TouchableOpacity<IProp>`

    justify-content: flex-start;
    flex-direction: row;
    align-items: flex-start;
    padding: 5px;

    ${({ lastItem }) => lastItem === false && css `
    border-bottom-color: ${({theme}) => theme.colors.text_dark};
    border-bottom-width: 1px;
    `};

`;

export const TituloMenu = styled.Text`
    font-family: ${({theme}) => theme.fonts.thin};
    font-size: ${RFValue(DefaultAppValues.fontSize.dois)}px;
`;

export const IconeMenu = styled(FontAwesome5)`
    color: #000000;
    font-size: ${RFValue(DefaultAppValues.fontSize.dois)}px;
    padding: ${RFValue(3)}px;
`;

