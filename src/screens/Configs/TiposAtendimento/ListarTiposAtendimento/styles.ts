import { RFValue } from 'react-native-responsive-fontsize';
import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.primary};
`;

export const WrapCentral = styled.View`
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
`;

export const WrapItens = styled.View`
    margin: 0 ${({theme}) => theme.margin.lateral_half}px;
    margin-top: ${RFValue(15)}px;
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



