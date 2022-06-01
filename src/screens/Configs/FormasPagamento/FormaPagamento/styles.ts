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
    margin: 0 ${({theme}) => theme.margin.lateral_half}px;
    margin-top: ${RFValue(15)}px;
`;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: ${RFValue(150)}px;
`;

export const Wrap = styled.View`
    flex: 1;
`;


export const ContentCreated = styled.View`
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-top-width: 1px;
    border-top-color: ${({theme}) => theme.colors.secondary};
    margin: 0 ${({theme}) => theme.margin.lateral_half}px;
    margin-top: ${RFValue(10)}px;
    padding-top: ${RFValue(5)}px;
`;

export const WrapCreated = styled.View`
    flex-direction: row;
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const TitleCreated = styled.Text`
    font-family: ${({theme}) => theme.fonts.thin};
    font-size: ${RFValue(13)}px;
    color: #1A1A1A;
`;

export const DateCreated = styled.Text`
    font-family: ${({theme}) => theme.fonts.thin};
    font-size: ${RFValue(13)}px;
    color: #1A1A1A;
`;

export const WrapFooterCadastro = styled.View`
    margin: 0 ${({theme}) => theme.margin.lateral_half}px;
    margin-bottom: ${({theme}) => theme.margin.lateral_half}px;
`;

