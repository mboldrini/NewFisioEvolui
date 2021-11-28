import { FontAwesome5 } from '@expo/vector-icons';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled, {css} from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import theme from "../../global/styles/theme";

import CalendarPicker from 'react-native-calendar-picker';

interface Props{
    isActive: boolean;
}

interface PropsHoraEscolhida{
    escolhido: boolean;
    ativo: boolean;
}

export const Container = styled(GestureHandlerRootView)`
    flex: 1;
    background-color: ${({theme}) => theme.colors.primary};
    justify-content: space-between;
`;

export const Body = styled.View``;

export const Header = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin-top: ${RFValue(35)}px ;
    margin-bottom: ${RFValue(10)}px;
    padding: 0 ${({theme}) => theme.padding.lateral}px;
`;

export const WrapIcone = styled(RectButton)``;

export const Icone = styled(FontAwesome5)`
    color: #ffffff;
    font-size: ${RFValue(30)}px;
`;

export const WrapTitulo = styled.View`
    width: 100%;
    align-items: center;
    justify-content: center;
`;

export const Titulo = styled.Text`
    font-size: ${RFValue(22)}px;
    color: #ffffff;
    font-family: ${({theme}) => theme.fonts.regular};
`;

export const Wrap = styled.View`
    background-color: ${({theme}) => theme.colors.shape};
    border-radius: ${({theme}) => theme.bordas.padrao}px;
    align-items:center;
    justify-content: center;
    padding: ${({theme}) => theme.padding.superior}px 0;
    margin: 0 ${({theme}) => theme.margin.lateral}px;
    margin-bottom: ${({theme}) => theme.margin.bottom}px;
`;

export const DataHoje = styled.Text`
    font-size: ${RFValue(16)}px;
    font-family: ${({theme}) => theme.fonts.regular};
`;

export const Calendario = styled(CalendarPicker).attrs({
    startFromMonday:true,
    allowRangeSelection:false,
    weekdays:['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
    months:['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    previousTitle: "Anterior",
    nextTitle:"Próximo",
    todayBackgroundColor: theme.colors.status_default,
    selectedDayColor: theme.colors.primary,
    selectedDayTextColor:"#ffffff",
    width: 300,
})`
`;


export const TimeList = styled.ScrollView.attrs({
    horizontal:true,
    showsHorizontalScrollIndicator:false,
    contentContainerStyle: { paddingHorizontal: 10 }
})``;

export const TimeItem = styled.TouchableOpacity<PropsHoraEscolhida>`
    width: ${RFValue(75)}px;
    height: ${RFValue(40)}px;
    justify-content: center;
    align-items: center;
    border-radius: ${({theme}) => theme.bordas.padrao}px;
    margin-right: ${RFValue(5)}px;
    color: #000000;
    
    ${({ escolhido }) => escolhido == true && css `
        background-color: ${({theme}) => theme.colors.primary};
    `}; 

    ${({ escolhido }) => escolhido == false && css `
        background-color: ${({theme}) => theme.colors.shape};
    `}; 
    
    ${({ ativo }) => ativo == false && css `
        background-color: ${({theme}) => theme.colors.status_default};
    `}; 

`;
export const TimeItemText = styled.Text<PropsHoraEscolhida>`
    font-size: ${RFValue(16)}px;
    color: #000000;

    ${({ escolhido }) => escolhido == true && css `
        font-family: ${({theme}) => theme.fonts.bold};
        color: #ffffff;
    `};

    ${({ escolhido }) => escolhido == false && css `
        font-family: ${({theme}) => theme.fonts.regular};
        color: #000000;
    `};  

    ${({ ativo }) => ativo == false && css `
        font-family: ${({theme}) => theme.fonts.thin};
    `}; 

`;

export const Footer = styled.View`
    margin: 0 ${({theme}) => theme.margin.lateral}px;
    margin-bottom: ${RFValue(25)}px;
`;

export const WrapBtn = styled.View`
    margin-bottom: ${({theme}) => theme.margin.bottom}px;
`;


