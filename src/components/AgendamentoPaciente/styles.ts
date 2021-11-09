import { RFValue } from 'react-native-responsive-fontsize';
import styled, {css} from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";

interface Props{
    tipoAtendimento: number;
}

export const Container = styled(RectButton)<Props>`
    flex-direction: row;
    background-color: ${({theme}) => theme.colors.shape};
    border-radius: ${({theme}) => theme.bordas.padrao};
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${({theme}) => theme.margin.bottom}px;
    padding: 5px 0;

    border-left-width: 5px;

    ${({ tipoAtendimento }) => tipoAtendimento == 0 && css `
        border-left-color: ${({theme}) => theme.colors.status_recorrente};
    `};

    ${({ tipoAtendimento }) => tipoAtendimento == 1 && css `
    border-left-color: ${({theme}) => theme.colors.status_default};
     `};

     ${({ tipoAtendimento }) => tipoAtendimento == 2 && css `
     border-left-color: ${({theme}) => theme.colors.status_avaliacao};
         color: #ffffff;
     `};

`;

export const WrapIcone = styled.View`
    margin-left: ${RFValue(20)}px;
    align-items: center;
    justify-content: center;
`;

export const DiaSemana = styled.Text`
    text-transform: uppercase;
    font-family: ${({theme}) => theme.fonts.bold};
    font-size: ${RFValue(14)}px;
`;

export const Icone = styled(FontAwesome5)<Props>`
    font-size: ${RFValue(20)}px;

    
    ${({ tipoAtendimento }) => tipoAtendimento == 0 && css `
        color: ${({theme}) => theme.colors.status_recorrente};
    `};

    ${({ tipoAtendimento }) => tipoAtendimento == 1 && css `
        color: ${({theme}) => theme.colors.status_default};
    `};

    ${({ tipoAtendimento }) => tipoAtendimento == 2 && css `
        color: ${({theme}) => theme.colors.status_avaliacao};
    `};

 
`;

export const WrapHora = styled.View`
    align-items: center;
    justify-content: center;
`;

export const Horario = styled.Text`
    font-family: ${({theme}) => theme.fonts.bold};
    font-size: ${RFValue(14)}px;
`;

export const Tipo = styled.Text`
    font-family: ${({theme}) => theme.fonts.thin};
    font-size: ${RFValue(12)}px;
`;

export const WrapData = styled.View`
    margin-right: ${RFValue(20)}px;
    align-items: center;
    justify-content: center;
`;

export const Data = styled.Text`
    font-family: ${({theme}) => theme.fonts.bold};
    font-size: ${RFValue(14)}px;
`;

export const DataLimite = styled.Text`
    font-family: ${({theme}) => theme.fonts.thin};
    font-size: ${RFValue(12)}px;
`;







