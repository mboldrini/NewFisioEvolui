import { RFValue } from 'react-native-responsive-fontsize';
import styled, {css} from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    flex-direction: column;
    align-items: center;
    border-top-color: ${({theme}) => theme.colors.secondary};
    border-top-width: 1px;
    border-top-style:solid;
    margin: 0 ${({theme})=> theme.margin.lateral_half}px;
    margin-top: ${RFValue(5)}px;
    min-height: ${RFValue(70)}px;
`;

export const Wrap = styled.View`
 
`;

export const TitleBold = styled.Text`
    font-family: ${({theme}) => theme.fonts.bold};
    font-size: ${RFValue(10)}px;
    color: ${({theme})=> theme.colors.text_dark};
`;

export const TitleThin = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(10)}px;
    color: ${({theme})=> theme.colors.text_dark};
`;

