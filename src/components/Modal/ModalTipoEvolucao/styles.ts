import { RFValue } from "react-native-responsive-fontsize";
import styled, {css} from 'styled-components/native';

import {GestureHandlerRootView, RectButton} from 'react-native-gesture-handler';
import theme from '../../../global/styles/theme';
import FontAwesome5 from "@expo/vector-icons/build/FontAwesome5";

interface Props{
    isActive: boolean;
    status: number;
}

export const Container = styled(GestureHandlerRootView)`
    flex: 1;
    background-color: ${({theme}) => theme.colors.primary};
    margin-top: ${RFValue(30)}px;
`;


export const Header = styled.View`
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    margin-top: ${RFValue(20)}px ;
    margin-bottom: ${RFValue(10)}px;
    padding: 0 ${({theme}) => theme.padding.lateral}px;
`;

export const WrapIcon = styled(RectButton)`
    border: 1px solid red;
    margin-right: ${RFValue(15)}px;
`;

export const Icone = styled(FontAwesome5)`
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(30)}px;
`;


export const Titulo = styled.Text`
    font-size: ${RFValue(22)}px;
    color: #ffffff;
    font-family: ${({theme}) => theme.fonts.regular};
`;

export const Category = styled.TouchableOpacity<Props>`
    padding: ${RFValue(15)}px;
    flex-direction: row;
    align-items: center;
 
    background-color: ${({isActive}) => 
        isActive ? theme.colors.status_remarcado : theme.colors.shape
    };
    margin: 0 ${({theme}) => theme.margin.lateral}px;
    margin-bottom: ${RFValue(5)}px;
    border-radius: ${({theme}) => theme.bordas.padrao}px;
    border-left-width: ${RFValue(5)}px;

    ${({ status }) => status == 0 && css ` border-left-color: ${({theme}) => theme.colors.status_default}; `};
    ${({ status }) => status == 1 && css ` border-left-color: ${({theme}) => theme.colors.status_avaliacao}; `};

    ${({ status, isActive }) => status == 0 && isActive && css ` background-color: ${({theme}) => theme.colors.status_default}; `};
    ${({ status, isActive }) => status == 1 && isActive && css ` background-color: ${({theme}) => theme.colors.status_avaliacao}; `};

`;

export const Name = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
`;

export const Separator = styled.View`

`;

export const Footer = styled.View`
    width: 100%;
    padding: 24px;
`;


