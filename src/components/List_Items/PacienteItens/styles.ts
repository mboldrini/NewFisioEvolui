import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from "styled-components/native";
import { FontAwesome5 } from '@expo/vector-icons';
import { RectButton } from "react-native-gesture-handler";
import { DefaultAppValues } from '../../../global/styles/theme';
 

export const WrapInfoList = styled.View`
    margin: 0 ${({theme}) => theme.margin.lateral_half}px;
    margin-bottom: ${({theme}) => theme.margin.bottom}px;
    background-color: ${({theme}) => theme.colors.secondary};
    border-radius: ${({theme}) => theme.bordas.padrao}px;
    padding: ${RFValue(5)}px 0;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex: 1;
`;

export const InfoArea = styled.View`
    margin-left: ${RFValue(10)}px;
    flex: 1;
`;

export const Description = styled.Text`
    color: ${({theme}) => theme.colors.shape};
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(DefaultAppValues.fontSize.um)}px;
`;

export const InfoTexto = styled.Text`
    color: ${({theme}) => theme.colors.shape};
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(DefaultAppValues.fontSize.um)}px;
    padding-right: ${RFValue(15)}px;
`;

export const WrapIconeEdit = styled.TouchableHighlight``;

export const IconeItemEdit = styled(FontAwesome5)`
    font-size: ${RFValue(18)}px;
    color: ${({theme}) => theme.colors.shape};
    align-items: center;
    justify-content: center;
    padding-right: ${RFValue(5)}px;
`;