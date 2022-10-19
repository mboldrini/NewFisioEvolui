import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
    background-color: ${({theme}) => theme.colors.shape};
    margin: 0 ${({theme}) => theme.margin.lateral_half}px;
    border-radius: ${({theme}) => theme.bordas.padrao}px;
    flex-direction:column;
    padding: ${RFValue(5)}px ${RFValue(15)}px;
    margin-bottom: ${({theme}) => theme.margin.bottom}px;

    shadow-color: #000;
    shadow-offset: {width: 0px};
    shadow-offset: {height: 2px};
    shadow-opacity: 0.8;
    shadow-radius: 1px;
    elevation: 5;

`;

export const Icone = styled.View`
    margin-right: ${RFValue(5)}px;
    width: ${RFValue(20)}px;
    height: ${RFValue(10)}px;
    background-repeat: repeat;
    background-color: #c1c1c1;
`;

export const Header = styled.View`
    flex-direction: row;
    justify-content: flex-start;
    padding: 2px 0 0 0;
    margin-top: ${RFValue(5)}px;
`;

export const Company = styled.View`
    width: ${RFPercentage(25)}px;
    height: ${RFValue(10)}px;
    background-repeat: repeat;
    background-color: #c1c1c1;
`;


export const PersonWrap = styled.View`
    margin-top: ${RFValue(5)}px;
`;

export const PersonName = styled.View`
    width: 100%;
    height: ${RFValue(14)}px;
    background-repeat: repeat;
    background-color: #c1c1c1;
`;

export const AddressWrap = styled.View`
    margin:  ${RFValue(5)}px 0;
    flex-direction: row;
    justify-content: flex-start;
`;

export const Address = styled.View`
    width: 65%;
    height: ${RFValue(10)}px;
    background-repeat: repeat;
    background-color: #c1c1c1;
`;

