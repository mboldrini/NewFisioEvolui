import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from "styled-components/native";
import { FontAwesome5 } from '@expo/vector-icons';
import theme from '../../../global/styles/theme';
import { RectButton } from "react-native-gesture-handler";


export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.primary};
`;

export const WrapToast = styled.View`
    z-index: 1;
`;

export const WrapHeader = styled.View`
    margin: 0 ${({theme}) => theme.margin.lateral}px;
    margin-top: ${RFValue(10)}px;
    flex-direction: row;
    background-color: ${({theme}) => theme.colors.background};
    align-items: center;
    justify-content: flex-start;
    padding: ${RFValue(10)}px;
    border-radius: ${({theme}) => theme.bordas.padrao}px;
`;

export const WrapCentral = styled.View`
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
`;

export const WrapItens = styled.View``;

export const WrapIconQtd = styled.View`
    padding: 0 ${RFValue(10)}px;
`;

export const IconeQtd = styled(FontAwesome5)`
    color: ${({theme}) => theme.colors.text_dark};
    font-size: ${RFValue(45)}px;
`;

export const WrapHeaderInfos = styled.View`
    flex-direction: column;
`;

export const Qtd = styled.Text`
    font-family: ${({theme}) => theme.fonts.bold};
    font-size: ${RFValue(20)}px;
`;

export const InfosDesc = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;
`;

export const WrapForm = styled.View`
    margin-top: ${({theme}) => theme.margin.top}px;
`;

export const WrapHistoric = styled.View`
    align-items: center;
    justify-content: center;
    margin-top: ${RFValue(15)}px;
    border-top-color: ${({theme}) => theme.colors.text_dark};
    border-top-width: 1px;
    margin: ${RFValue(5)}px ${({theme}) => theme.margin.lateral}px;
    padding-top: ${RFValue(10)}px;
`;

export const History = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
    color: ${({theme}) => theme.colors.text_dark};
`;

export const DtHistory = styled.Text`
    font-family: ${({theme}) => theme.fonts.bold};
    font-size: ${RFValue(14)}px;
    color: ${({theme}) => theme.colors.text_dark};
`;

export const WrapBtnCadastro = styled.View`
    margin: 0 ${({theme}) => theme.margin.lateral}px;
    /* margin-bottom: ${RFValue(10)}px; */
    margin-top: ${RFValue(20)}px;
    margin-bottom: ${RFValue(20)}px;
`;



