import styled, {css} from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { FontAwesome5 } from "@expo/vector-icons";

interface Props{
    idStatus?: number;
    horaPassou?: boolean;
}

export const Container = styled.View<Props>`
    flex: 1;
    margin: 0 ${({theme}) => theme.margin.lateral}px;
    background-color: ${({theme}) => theme.colors.shape};
    border-radius: ${({theme}) => theme.bordas.padrao};
    padding: 10px 15px;
    margin-bottom: ${({theme}) => theme.margin.bottom}px;

    border-top-width: 1;
    border-right-width: 1;
    border-bottom-width: 1;

    border-top-color: #f5f5f5;
    border-right-color: #f5f5f5;
    border-bottom-color: #f5f5f5;

    border-top-width: 1;
    border-right-width: 1;
    border-bottom-width: 1;
    
    shadow-color: #000;
    shadow-offset: {width: 0};
    shadow-offset: {height:2};
    shadow-opacity: 0.8;
    shadow-radius: 1;
    elevation: 1;

    border-left-width: ${RFValue(5)}px;

    ${({ idStatus }) => idStatus == 0 && css `
        border-left-width: 0;
    `};

    ${({ idStatus }) => idStatus == 1 && css `
        border-left-color: ${({theme}) => theme.colors.status_default};
    `};

    ${({ idStatus }) => idStatus == 2 && css `
        border-left-color: ${({theme}) => theme.colors.status_atendido};
    `};

    ${({ idStatus }) => idStatus == 3 && css `
        border-left-color: ${({theme}) => theme.colors.status_remarcado};
    `};

    ${({ idStatus }) => idStatus == 4 && css `
        border-left-color: ${({theme}) => theme.colors.status_cancelado};
    `};
    
    ${({ idStatus }) => idStatus == 5 && css `
        border-left-color: ${({theme}) => theme.colors.status_desmarcado};
    `};
    
    ${({ idStatus }) => idStatus == 6 && css `
        border-left-color: ${({theme}) => theme.colors.status_avaliacao};
    `};

`;

export const Header = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
`;

export const IconeTipo = styled(FontAwesome5)`
    color: ${({theme}) => theme.colors.secondary};
    align-items: center;
    justify-content: center;
`;

export const Tipo = styled.Text`
    font-size: ${RFValue(12)}px;
    color: ${({theme}) => theme.colors.text};
    font-family: ${({theme}) => theme.fonts.thin};
    padding-left: ${RFValue(5)}px;
    align-items: center;
    justify-content: center;
`;

export const Nome = styled.Text`
    font-family: ${({theme}) => theme.fonts.bold};
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

export const HoraWrapper = styled.View<Props>`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: ${({theme}) => theme.bordas.padrao}px;
    padding: 0 ${RFValue(10)}px;
    margin-right: ${RFValue(10)}px;

    ${({ horaPassou }) => horaPassou == true && css `
        background-color: ${({theme}) => theme.colors.status_default};
    `};

    ${({ horaPassou }) => horaPassou == false && css `
        background-color: ${({theme}) => theme.colors.secondary};
    `};

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

    ${({ idStatus }) => idStatus == 0 && css `
        background-color: ${({theme}) => theme.colors.status_default};
    `};

    ${({ idStatus }) => idStatus == 1 && css `
        background-color: ${({theme}) => theme.colors.status_default};
    `};

    ${({ idStatus }) => idStatus == 2 && css `
        background-color: ${({theme}) => theme.colors.status_atendido};
    `};

    ${({ idStatus }) => idStatus == 3 && css `
        background-color: ${({theme}) => theme.colors.status_remarcado};
    `};

    ${({ idStatus }) => idStatus == 4 && css `
        background-color: ${({theme}) => theme.colors.status_cancelado};
    `};
    
    ${({ idStatus }) => idStatus == 5 && css `
        background-color: ${({theme}) => theme.colors.status_desmarcado};
    `};
    
    ${({ idStatus }) => idStatus == 6 && css `
        background-color: ${({theme}) => theme.colors.status_avaliacao};
    `};
    

`;

export const Status = styled.Text<Props>`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
    padding:0 ${RFValue(10)}px;
    padding-top: ${RFValue(2)}px;

    ${({ idStatus }) => idStatus == 0 && css `
        color: #000000;
    `};

    ${({ idStatus }) => idStatus == 1 && css `
        color: #000000;
    `};

    ${({ idStatus }) => idStatus == 2 && css `
        color: ${({theme}) => theme.colors.shape};
    `};

    ${({ idStatus }) => idStatus == 3 && css `
        color: ${({theme}) => theme.colors.shape};
    `};

    ${({ idStatus }) => idStatus == 4 && css `
        color: ${({theme}) => theme.colors.shape};
    `};

    ${({ idStatus }) => idStatus == 5 && css `
        color: #000000;
    `};

    ${({ idStatus }) => idStatus == 6 && css `
        color: ${({theme}) => theme.colors.shape};
    `};


`;


