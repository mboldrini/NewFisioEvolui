import { RFValue } from 'react-native-responsive-fontsize';
import styled from "styled-components/native";

export const Container = styled.View`
    width: 100%;
`;

export const Error = styled.Text`
    color: #f00;
    font-size: ${RFValue(14)}px;
    margin: 0 ${({theme}) => theme.margin.lateral}px;
    font-family: ${({theme}) => theme.fonts.thin};
`;

