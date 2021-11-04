import styled, {css} from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { FontAwesome5 } from "@expo/vector-icons";

interface Props{
    idStatus: string;
    status: string;
}

export const Container = styled.View`
    flex: 1;
    margin: 0 ${({theme}) => theme.margin.lateral}px;
    background-color: ${({theme}) => theme.colors.shape};
    border-radius: ${({theme}) => theme.bordas.padrao};
    padding: 10px 15px;
    margin-bottom: ${({theme}) => theme.margin.bottom}px;
    border-width: 1;
    border-color: #f5f5f5;
    border-bottom-width: 1;
    shadow-color: #000;
    shadow-offset: {width: 0, height: 2};
    shadow-opacity: 0.8;
    shadow-radius: 1;
    elevation: 1;
`;

export const Header = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
`;

export const IconeTipo = styled(FontAwesome5)`
    color: ${({theme}) => theme.colors.secondary};
`;

export const Tipo = styled.Text`
    font-size: ${RFValue(14)}px;
    color: ${({theme}) => theme.colors.text};
    font-family: ${({theme}) => theme.fonts.thin};
    padding-left: ${RFValue(5)}px;
`;

export const Nome = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;
    color: #000000;
`;

export const Footer = styled.View`
    flex-direction: row;
`;

export const Icone = styled(FontAwesome5)`
    color: ${({theme}) => theme.colors.shape };
    padding-right: ${RFValue(5)}px;
`;

export const HoraWrapper = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: ${({theme}) => theme.colors.secondary};
    border-radius: ${({theme}) => theme.bordas.padrao}px;
    padding: 0 ${RFValue(10)}px;
    margin-right: ${RFValue(10)}px;
`;

export const Horario = styled.Text`
    color: ${({theme}) => theme.colors.shape};
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
    padding-top: ${RFValue(2)}px;
`;



export const StatusWrapper = styled.View<Props>`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 10px;

    ${({ idStatus }) => idStatus == '0' && css `
        background-color: ${({theme}) => theme.colors.status_padrao};
    `};

    ${({ idStatus }) => idStatus == '1' && css `
        background-color: ${({theme}) => theme.colors.status_atendido};
    `};

    ${({ idStatus }) => idStatus == '2' && css `
        background-color: ${({theme}) => theme.colors.status_remarcado};
    `};

    ${({ idStatus }) => idStatus == '3' && css `
        background-color: ${({theme}) => theme.colors.status_cancelado};
    `};
    

`;

export const Status = styled.Text<Props>`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
    padding:0 ${RFValue(10)}px;
    padding-top: ${RFValue(2)}px;

    ${({ idStatus }) => idStatus == '0' && css `
        color: #000000;
    `};

    ${({ idStatus }) => idStatus == '1' && css `
        color: ${({theme}) => theme.colors.shape};
    `};

    ${({ idStatus }) => idStatus == '2' && css `
        color: ${({theme}) => theme.colors.shape};
    `};

    ${({ idStatus }) => idStatus == '3' && css `
        color: ${({theme}) => theme.colors.shape};
    `};


`;


