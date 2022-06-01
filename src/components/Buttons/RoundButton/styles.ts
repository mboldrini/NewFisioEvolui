import { FontAwesome5 } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, {css} from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { RectButton } from "react-native-gesture-handler";

interface Props{
    type?: string;
}

export const Container = styled.TouchableOpacity<Props>`
    background-color: ${({theme}) => theme.colors.button_ok};
    border-radius: 50px;
    align-items: center;
    justify-content: center;
    width: ${RFValue(60)}px;
    height: ${RFValue(60)}px;

    ${({ type }) => type === "ok" && css `
        background-color: ${({theme}) => theme.colors.success};
    `};

    ${({ type }) => type === "cancel" && css `
        background-color: ${({theme}) => theme.colors.status_cancelado};
    `};

`;

export const Icon = styled(FontAwesome5)`
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(30)}px;
`;

