import { FontAwesome5 } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, {css} from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { RectButton } from "react-native-gesture-handler";

interface Props{
    type?: string;
}

export const Container = styled(RectButton)<Props>`
    background-color: ${({theme}) => theme.colors.button_ok};
    border-radius: ${({theme}) => theme.bordas.padrao}px;
    align-items: center;
    justify-content: center;
    height: ${RFValue(45)}px;
    flex-direction: row;

    ${({ type }) => type === "ok" && css `
        background-color: ${({theme}) => theme.colors.success};
        height: ${RFValue(45)}px;
    `};

    ${({ type }) => type === "cancel" && css `
        background-color: ${({theme}) => theme.colors.status_cancelado};
        /* height: ${RFValue(55)}px; */
        /* margin-top: ${RFValue(10)}px; */
    `};

    justify-content: space-between;
`;

export const WrapTitle = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const Title = styled.Text<Props>`
    font-family: ${({theme}) => theme.fonts.bold};
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(18)}px;
`;

export const LeftIcon = styled(FontAwesome5)`
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(18)}px;
    margin-Left: ${RFValue(10)}px;
`;

export const RightIcon = styled(FontAwesome5)`
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(18)}px;
    margin-right: ${RFValue(10)}px;
`;

