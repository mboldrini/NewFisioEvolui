import { RFValue } from "react-native-responsive-fontsize";
import styled, {css} from 'styled-components/native';

import {GestureHandlerRootView, RectButton} from 'react-native-gesture-handler';
import FontAwesome5 from "@expo/vector-icons/build/FontAwesome5";
import { DefaultAppValues } from "../../../../global/styles/theme";

interface Props{
    isActive: boolean;
    status: number;
}

export const Container = styled(GestureHandlerRootView)`
    flex: 1;
    background-color: ${({theme}) => theme.colors.primary};
    margin-top: ${RFValue(60)}px;
    border-top-left-radius: 50px;
`;

export const Body = styled.View`
    flex: 1;
    margin: 0 ${RFValue(DefaultAppValues.margin.lateral_half)}px;
`;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: ${RFValue(150)}px;
`;

export const WrapSemAtendimentos = styled.View`
    align-items: center;
    justify-content: center;
`;

export const AvisoSemAtendimentos = styled.Text`
    padding-bottom: ${RFValue(50)}px;
    padding-top: ${RFValue(50)}px;
    font-family: ${({theme}) => theme.fonts.bold};
    color: ${({theme}) => theme.colors.text_dark};
    font-size: ${RFValue(18)}px;
`;


