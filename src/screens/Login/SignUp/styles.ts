import * as Animatable from 'react-native-animatable';
import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

interface IProps{
    page: number;
}

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.primary};
`;

export const Part1 = styled(Animatable.View)<IProps>`
    flex: 1;

    ${({ page }) => page !== 0 && css `
        display: none;
    `};

`;

export const Header = styled.View`
    align-items: flex-start;
    justify-content: flex-start;
    margin-top: ${RFValue(35)}px ;
    margin-bottom: ${RFValue(10)}px;
    padding: 0 ${RFValue(10)}px;
`;

export const Title = styled.View`
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin: 0px;
    padding: 0px;
`;

export const Greetings = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(38)}px;
    color: #ffffff;
    margin: 0px;
    padding: 0px;

`;

export const Name = styled.Text`
    font-family: ${({theme}) => theme.fonts.bold};
    font-size: ${RFValue(30)}px;
    color: #ffffff;
`;

export const MessageWrap = styled.View`
    padding-left: ${RFValue(10)}px;
`;

export const Message = styled.Text`
    font-family: ${({theme}) => theme.fonts.thin};
    font-size: ${RFValue(18)}px;
    color: #ffffff;
`;

export const MessageDescription = styled.Text`
    font-family: ${({theme}) => theme.fonts.thin};
    font-size: ${RFValue(14)}px;
    color: #ffffff;
`;

export const CenterSpaced = styled.View`
    flex: 1;
    justify-content: space-between;
    width: 100%;
    margin-bottom: ${RFValue(10)}px;
`;

export const WrapHalfButton = styled.View`
    justify-content: flex-end;
    align-items: flex-end;
    margin: ${({theme}) => theme.margin.lateral_half}px  ${({theme}) => theme.margin.lateral}px;
`;


export const Part2 = styled(Animatable.View)<IProps>`
    flex: 1;

    ${({ page }) => page !== 1 && css `
        display: none;
    `};

`;

