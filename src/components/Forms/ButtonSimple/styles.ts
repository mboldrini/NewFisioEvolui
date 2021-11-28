import { RFValue } from 'react-native-responsive-fontsize';
import styled, {css} from "styled-components/native";
import { TouchableOpacity } from 'react-native';
import { RectButton } from "react-native-gesture-handler";

interface Props{
    type: 'default' | 'cancel';
}

export const Container = styled(TouchableOpacity)<Props>`
    border-radius: ${({theme}) => theme.bordas.padrao}px;
    align-items: center;
    justify-content: center;
    height: ${RFValue(60)}px;

    ${({ type }) => type == 'default' && css `
        background-color: ${({theme}) => theme.colors.button_ok};
    `}; 

    ${({ type }) => type == 'cancel' && css `
        background-color: ${({theme}) => theme.colors.attention};
    `}; 

`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.bold};
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(18)}px;
`;


