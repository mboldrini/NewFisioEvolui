import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from "styled-components/native";
import { FontAwesome5 } from '@expo/vector-icons';
import theme from '../../../../global/styles/theme';
import { RectButton } from "react-native-gesture-handler";


export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.primary};
`;

export const WrapToast = styled.View`
    z-index: 1;
`;

export const WrapCentral = styled.View`
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
`;

export const WrapItens = styled.View`
    margin: 0 ${({theme}) => theme.margin.lateral}px;
    margin-top: ${RFValue(15)}px;
    /* flex: 1; */
    /* flex-direction: column; */
    /* justify-content: space-between; */
`;

export const LoadingIcon = styled.ActivityIndicator``;

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

export const WrapBtnCadastro = styled.View`
    padding:  ${RFValue(10)}px ${({theme}) => theme.margin.lateral}px;
    margin-top: ${RFValue(25)}px;
    background-color: ${({theme}) => theme.colors.secondary};
    margin-bottom: ${RFValue(30)}px;
`;
