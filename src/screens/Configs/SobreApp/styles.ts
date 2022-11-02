import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from "styled-components/native";
import { FontAwesome5 } from '@expo/vector-icons';
import theme from '../../../global/styles/theme';
import { RectButton } from "react-native-gesture-handler";


export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.primary};
`;

export const WrapCentral = styled.View`
    flex: 1;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 0 ${({theme}) => theme.margin.lateral}px;
    margin-top: ${RFValue(20)}px;
`;

export const Texto1 = styled.Text`
    font-size: ${RFValue(18)}px;
    font-family: ${({theme}) => theme.fonts.regular};
    color: #FFFFFF;
`;

export const Bold = styled.Text`
    font-size: ${RFValue(18)}px;
    font-family: ${({theme}) => theme.fonts.bold};
    color: #FFFFFF;
`;
