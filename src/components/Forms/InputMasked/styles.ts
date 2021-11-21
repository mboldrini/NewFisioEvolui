import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { TextInputMask } from 'react-native-masked-text';

export const Container = styled.View``;

export const Input = styled(TextInputMask)`
 background-color: ${({theme}) => theme.colors.input_background};
    border-radius: ${({theme}) => theme.bordas.padrao}px;
    height: ${RFValue(60)}px;
    margin: 0 ${({theme}) => theme.padding.lateral}px;
    margin-bottom: ${({theme}) => theme.margin.input_bottom}px;
    padding: 0 20px;
    color: #000000;
    border-width: 1px;
    border-color: ${({theme}) => theme.colors.input_background};
    border-bottom-width: 1px;
`;


export const Error = styled.Text`
    color: #f00;
    font-size: ${RFValue(14)}px;
    margin: 0 ${({theme}) => theme.margin.lateral}px;
    font-family: ${({theme}) => theme.fonts.thin};
`;

