import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { TextInputMask } from 'react-native-masked-text';

export const Container = styled.View``;

export const InputSpecial = styled(TextInputMask)`
    background-color: ${({theme}) => theme.colors.input_background};
    border-radius: ${({theme}) => theme.bordas.padrao}px;
    height: ${RFValue(60)}px;
    padding-left: ${RFValue(20)}px;
    color: #000000;
    width: ${RFValue(70)}px;
    font-size: ${RFValue(30)}px;
    align-items: center;
    justify-content: center;
`;
