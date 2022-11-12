import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from "styled-components/native";
import { FontAwesome5 } from '@expo/vector-icons';
import theme, { DefaultAppValues } from '../../../global/styles/theme';
import { RectButton } from "react-native-gesture-handler";

export const WrapInfo = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin: 5px 0;
    padding-bottom: ${RFValue(3)}px;
`;

export const Icone = styled(FontAwesome5)`
    font-size: ${RFValue(20)}px;
    color: ${({theme}) => theme.colors.shape};
    min-width: ${RFValue(32)}px;
`;

export const InfoArea = styled.View`
    margin-left: ${RFValue(10)}px;
    flex: 1;
`;

export const Spacer = styled.View`
    width: 100%;
    border-bottom-color: ${({theme}) => theme.colors.primary};
    border-bottom-width: 1px;
`;

export const Description = styled.Text`
    color: ${({theme}) => theme.colors.shape};
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(DefaultAppValues.fontSize.um)}px;
`;

export const Info = styled.Text`
    flex: 1;
    color: ${({theme}) => theme.colors.shape};
    font-family: ${({theme}) => theme.fonts.bold};
    font-size: ${RFValue(DefaultAppValues.fontSize.um)}px;
    padding-right: ${RFValue(15)}px;
`;



