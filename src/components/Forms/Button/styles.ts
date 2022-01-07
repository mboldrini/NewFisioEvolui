import { RFValue } from 'react-native-responsive-fontsize';
import styled, {css} from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { RectButton } from "react-native-gesture-handler";

interface Props{
    type?: string;
}

export const Container = styled(TouchableOpacity)<Props>`
    background-color: ${({theme}) => theme.colors.button_ok};
    border-radius: ${({theme}) => theme.bordas.padrao}px;
    align-items: center;
    justify-content: center;
    height: ${RFValue(45)}px;

    ${({ type }) => type === "ok" && css `
        background-color: ${({theme}) => theme.colors.success};
        height: ${RFValue(55)}px;
    `};

    ${({ type }) => type === "cancel" && css `
        background-color: ${({theme}) => theme.colors.status_cancelado};
        height: ${RFValue(55)}px;
    `};

`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.bold};
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(18)}px;
`;


