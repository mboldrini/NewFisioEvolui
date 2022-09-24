import { RFValue } from 'react-native-responsive-fontsize'; 
import styled, {css}  from "styled-components/native";
import { FontAwesome5 } from '@expo/vector-icons';
import { RectButton } from "react-native-gesture-handler";
import { DefaultAppValues } from '../../../global/styles/theme';

interface Props{
    bool?: boolean;
}

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.primary};
`;

export const Wrap = styled.View`
    margin: 0 ${RFValue(DefaultAppValues.margin.lateral_half)}px;
    margin-top: ${RFValue(15)}px;
    flex: 1;
`;

export const BtnList = styled.View`
    margin-bottom: ${RFValue(5)}px;
    width: 100%;
    border-bottom-color: #4EADBE;
    border-bottom-width: 1px;
    /* padding: ${RFValue(5)}px; */
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${RFValue(5)}px;
`;

export const TituloList = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(12)}px;
    color: #ffffff;
    align-items: center;
    justify-content: center;
`;

export const WrapIcone = styled.View`
    min-width: ${RFValue(45)}px;
    align-items: center;
    justify-content: center;
`;

export const Icone = styled(FontAwesome5)`
    color: #ffffff;
    font-size: ${RFValue(14)}px;
    align-items: center;
    justify-content: center;
`;

export const WrapFooterCadastro = styled.View`
    margin: 0 ${({theme}) => theme.margin.lateral_half}px;
    margin-bottom: ${({theme}) => theme.margin.lateral_half}px;
`;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: ${RFValue(150)}px;
`;


