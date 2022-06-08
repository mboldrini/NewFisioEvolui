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
    justify-content: space-between;
`;

export const Form = styled.View`
    justify-content: space-between;
`;

export const WrapLoading = styled.View`
    flex: 1;
    margin-top: ${RFValue(100)}px;
`;

export const LoadingIcon = styled.ActivityIndicator``;


export const WrapDuracao = styled.View`
    flex-direction: row;
    /* align-items: center; */
    justify-content: space-between;
`;

export const Duracao = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(16)}px;
    margin-right: ${RFValue(10)}px;
    color: ${({theme}) => theme.colors.shape};
`;

export const BotaoDuracao = styled.TouchableOpacity`
    padding: ${RFValue(5)}px ${RFValue(10)}px;
    flex-direction: row;
    align-items: center;
    background-color: ${({theme}) => theme.colors.secondary};
    border-radius: ${RFValue(DefaultAppValues.bordas.padrao)}px;
    border: 1px solid #268596;
    align-items: center;
    margin-left: ${RFValue(DefaultAppValues.margin.lateral_half)}px;
    height: ${RFValue(60)}px;
`;

export const ImageIcon = styled.Image`
    width: ${RFValue(22)}px;
    height: ${RFValue(22)}px;
    margin-right: ${RFValue(5)}px;
    align-items: center;
`;

export const TempoDuracao = styled.Text`
    font-size: ${RFValue(16)}px;
    color: ${({theme}) => theme.colors.shape};
    font-family: ${({theme}) => theme.fonts.bold};
    align-items: center;
    padding-top: ${RFValue(5)}px;
`;

export const WrapList = styled.View`
    margin: 0 ${RFValue(DefaultAppValues.margin.lateral_half)}px;
`;
