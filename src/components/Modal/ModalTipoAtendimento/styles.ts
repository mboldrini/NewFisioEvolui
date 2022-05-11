import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import theme from '../../../global/styles/theme';

interface Props{
    isActive: boolean;
}

export const Container = styled(GestureHandlerRootView)`
    flex: 1;
    background-color: ${({theme}) => theme.colors.primary};
    margin-top: ${RFValue(40)}px;
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

export const Wrap = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    margin:  ${RFValue(10)}px 0;
`;

export const WrapListaItens = styled.View`
    margin-top: ${RFValue(20)}px;
`;

export const WrapContent = styled.View`
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
`;

export const AvisoLoading = styled.Text`
    font-size: ${RFValue(24)}px;
    color: #ffffff;
    text-align: center;
`;

export const AvisoSemTipoAtendimento = styled.Text`
    font-size: ${RFValue(24)}px;
    color: #ffffff;
    text-align: center;
    margin-top: ${RFValue(45)}px;
`;

export const Separator = styled.View``;

export const Footer = styled.View`
    width: 100%;
    padding: 24px;
`;


