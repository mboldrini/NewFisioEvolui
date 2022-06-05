import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { TextInput } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

//export const Container = styled(TextInput)`
export const Container = styled(TextInputMask)`
    background-color: ${({theme}) => theme.colors.input_background};
    border-radius: ${({theme}) => theme.bordas.padrao}px;
    height: ${RFValue(60)}px;
    margin: 0 ${({theme}) => theme.padding.lateral_half}px;
    margin-bottom: ${({theme}) => theme.margin.input_bottom}px;
    padding: ${RFValue(10)}px;
    padding-left: ${RFValue(12)}px;
    color: #000000;
    min-width: ${RFValue(45)}px;
    font-size: ${RFValue(14)}px;
    border-width: 1px;
    border-color: ${({theme}) => theme.colors.input_background};
    border-bottom-width: 1px;
`;
export const Error = styled.Text`
    padding-left: ${({theme}) => theme.margin.lateral}px;
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
    color: #f00;
`;


