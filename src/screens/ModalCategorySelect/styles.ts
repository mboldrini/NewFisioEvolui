import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import theme from "../../global/styles/theme";

interface Props{
    isActive: boolean;
}

export const Container = styled(GestureHandlerRootView)`
    flex: 1;
    background-color: ${({theme}) => theme.colors.primary};
`;

export const Header = styled.View`
    align-items: center;
    justify-content: center;
    margin-top: ${RFValue(35)}px ;
    margin-bottom: ${RFValue(10)}px;
    padding: 0 ${({theme}) => theme.padding.lateral}px;
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
    border-radius: 10px;

`;

export const Name = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
`;

export const Separator = styled.View`
    /* height: 1px;
    background-color: ${({theme}) => theme.colors.text};
    margin: 0 ${({theme}) => theme.margin.lateral}px; */
`;

export const Footer = styled.View`
    width: 100%;
    padding: 24px;
`;


