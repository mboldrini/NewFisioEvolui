import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

//export const Container = styled.ScrollView`
export const Container = styled.View`
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

export const Form = styled.ScrollView`
    padding-top: ${RFValue(15)}px;
    padding-bottom: ${RFValue(60)}px;
`;

export const Fields = styled.View`
    margin-bottom: ${({theme}) => theme.margin.bottom}px;
`;


export const WrapFooterCadastro = styled.View`
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: ${({theme}) => theme.colors.primary};
    padding: ${RFValue(15)}px;

    /* border: 1px solid red;
    left: 0;
    flex: 1;
    width: 100%; */
`;


