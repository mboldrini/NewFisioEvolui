import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { TextInput } from 'react-native';

export const Container = styled(TextInput)`
    background-color: ${({theme}) => theme.colors.input_background};
    border-radius: ${({theme}) => theme.bordas.padrao};
    height: ${RFValue(60)};
    margin: 0 ${({theme}) => theme.padding.lateral}px;
    margin-bottom: ${({theme}) => theme.margin.input_bottom};
    padding: 0 20px;
    color: #000000;


    border-width: 1;
    border-color: ${({theme}) => theme.colors.input_background};
    border-bottom-width: 1;
    shadow-color: ${({theme}) => theme.colors.text_dark};
    shadow-offset: {width: 0, height: 2};
    shadow-opacity: 0.3;
    shadow-radius: 5;
    elevation: 2;
`;


