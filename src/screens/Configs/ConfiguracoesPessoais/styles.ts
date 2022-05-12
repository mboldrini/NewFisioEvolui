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

export const WrapCentral = styled.View`
    /* flex: 1; */
    /* flex-direction: column; */
    /* justify-content: space-between; */
    margin-left: ${({theme}) => theme.margin.lateral}px;
    margin-right: ${({theme}) => theme.margin.lateral}px;
    padding-top: ${RFValue(20)}px;
`;

export const LoadingIcon = styled.ActivityIndicator``;

export const WrapTitle = styled.View`
    border-bottom-width: 2px;
    border-bottom-color: ${({theme})=> theme.colors.text_dark};
    margin-bottom: ${RFValue(10)}px;
`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.bold};
    font-size: ${RFValue(16)}px;
    color: ${({theme}) => theme.colors.text_dark};
`;

export const InfosGroup = styled.View`
    margin-bottom: ${RFValue(20)}px;
`;

export const WrapBtns = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const WrpBtn = styled.View`
    flex: 1;
    max-width: 45%;
`;

export const Button = styled(RectButton)`
    flex: 1;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: ${RFValue(10)}px;
    background-color: ${({theme}) => theme.colors.button_ok};
    border-radius: ${({theme}) => theme.bordas.padrao}px;
`;

export const Icone = styled(FontAwesome5)`
    font-size: ${RFValue(20)}px;
    padding-right: ${RFValue(10)}px;
    color: ${({theme}) => theme.colors.shape};
`;

export const BtnText = styled.Text`
   font-size: ${RFValue(24)}px;
   color: ${({theme}) => theme.colors.shape};
`;



