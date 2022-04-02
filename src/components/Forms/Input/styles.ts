import { RFValue } from 'react-native-responsive-fontsize';
import styled, {css} from "styled-components/native";
import { TextInput } from 'react-native';

export const Container = styled(TextInput)`
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

    ${({ multiline }) => multiline == true && css `
        height: ${RFValue(120)}px;
        flex-wrap: wrap;
    `};

`;
export const Error = styled.Text`
    padding-left: ${({theme}) => theme.margin.lateral}px;
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
    color: #f00;
`;


