import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

//export const Container = styled.ScrollView`
export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.primary};
`;

export const Header = styled.View`
    align-items: center;
    justify-content: flex-end;
    margin-top: ${RFValue(35)}px ;
    margin-bottom: ${RFValue(10)}px;
    padding: 0 ${({theme}) => theme.padding.lateral}px;
`;

export const Titulo = styled.Text`
    font-size: ${RFValue(22)}px;
    color: #ffffff;
    font-family: ${({theme}) => theme.fonts.bold};
`;

export const Form = styled.View`
    flex: 1;
    justify-content: space-between;
    width: 100%;
    padding-top: ${RFValue(15)}px;
`;

export const Fields = styled.ScrollView`
`;


export const WrapFooterCadastro = styled.View`
    justify-content: flex-end;
    margin: ${({theme}) => theme.margin.lateral_half}px  ${({theme}) => theme.margin.lateral}px;
    /* position: absolute; */
    /* bottom: 0; */
    /* width: 100%; */
    /* //background-color: ${({theme}) => theme.colors.primary}; */
    /* background-color: #ffffff;
    padding: 5px; */
    /* border: 1px solid red;
    left: 0;
    flex: 1;
    width: 100%; */
`;


