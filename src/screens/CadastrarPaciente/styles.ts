import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { DefaultAppValues } from "../../global/styles/theme";

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.primary};
`;

export const Iscrol = styled.ScrollView`
    z-index: -1;
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
    z-index: -2;
`;

export const Fields = styled.View`
    margin-bottom: ${({theme}) => theme.margin.bottom}px;
`;

export const Wrap = styled.View`
    background-color: ${({theme}) => theme.colors.secondary_light};
    /* border-radius: ${({theme}) => theme.bordas.padrao}px; */
    /* margin: 0 ${({theme}) => theme.margin.lateral}px; */
    padding: 0 ${({theme}) => theme.margin.lateral}px;
    padding-top: ${RFValue(10)}px;
`;


export const WrapBtn = styled.View`
    /* margin: ${({theme}) => theme.margin.lateral_third}px; */
    margin-bottom: ${({theme}) => theme.margin.lateral_third}px;
`;

export const WrapFooterCadastro = styled.View`
    margin: 0 ${({theme}) => theme.margin.lateral}px;
    margin-bottom: ${RFValue(20)}px;
    margin-top: ${RFValue(20)}px;
`;

export const FieldGroup = styled.View`
    margin-bottom: ${RFValue(15)}px;
`;

export const TitleGroup = styled.View`
    width: 100%;
    margin-bottom: ${RFValue(10)}px;
    flex: 1;
    border-bottom-color: #4EADBE;
    border-bottom-width: 2px;
`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.shape};
    margin: 0 ${RFValue(DefaultAppValues.margin.lateral_half)}px;
    font-size: ${RFValue(14)}px;
`;

