import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.ScrollView`
    flex: 1;
    background-color: ${({theme}) => theme.colors.primary};
`;

export const Header = styled.View`
    align-items: center;
    justify-content: center;
    margin-top: ${RFValue(35)}px ;
    margin-bottom: ${RFValue(10)}px;
    padding: 0 ${({theme}) => theme.padding.lateral}px;
`;

export const Titulo = styled.Text`
    font-size: ${RFValue(22)}px;
    color: #ffffff;
    font-family: ${({theme}) => theme.fonts.regular};
`;

export const Form = styled.View`
    margin-bottom: ${RFValue(30)}px;
`;

export const Fields = styled.View`
    margin-bottom: ${({theme}) => theme.margin.bottom}px;
`;

export const Wrap = styled.View`
    background-color: ${({theme}) => theme.colors.secondary};
    border-radius: ${({theme}) => theme.bordas.padrao}px;
    margin: 0 ${({theme}) => theme.margin.lateral}px;
`;

export const WrapItensAgendados = styled.View`
    margin: 0 ${RFValue(10)}px;
    margin-top: ${RFValue(10)}px
`;

export const WrapBtn = styled.View`
    margin: 5px;
`;

export const WrapFooterCadastro = styled.View`
    margin: 0 ${({theme}) => theme.margin.lateral}px;
    margin-bottom: ${RFValue(20)}px;
    margin-top: ${RFValue(20)}px;
`;


