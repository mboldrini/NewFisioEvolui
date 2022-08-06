import { FontAwesome5 } from "@expo/vector-icons";
import styled, {css} from "styled-components/native";
import { RFValue } from 'react-native-responsive-fontsize';
import theme from "../../../global/styles/theme";

interface Props{
    isActive: number;
}


export const Container = styled.TouchableOpacity.attrs({
    activeOpacity: 0.7
})`
    background-color: ${({theme}) => theme.colors.input_background};
    border-radius: ${({theme}) => theme.bordas.padrao}px;
    height: ${RFValue(40)}px;
    margin: 0 ${({theme}) => theme.padding.lateral_half}px;
    margin-bottom: ${({theme}) => theme.margin.input_bottom}px;
    padding: 0 ${RFValue(10)}px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const Category = styled.Text<Props>`

    ${({ isActive }) => isActive !== -1 && css `
        color: #000000;
    `};

    ${({ isActive }) => isActive === -1 && css `
        color: ${({theme}) => theme.colors.secondary};
    `};

`;

export const Icon = styled(FontAwesome5)<Props>`
    font-size: ${RFValue(18)}px;
    ${({ isActive }) => isActive !== -1 && css `
        color: #000000;
    `};

    ${({ isActive }) => isActive === -1 && css `
        color: #ffffff;
    `};

    
`;





