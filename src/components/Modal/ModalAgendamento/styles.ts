import { FontAwesome5 } from '@expo/vector-icons';
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import styled, {css} from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import {GestureHandlerRootView} from 'react-native-gesture-handler';

interface Props{
    isActive: boolean;
}
interface PropsFooterButton{
    type: 'ok' | 'cancel';
}
interface PropsHoraEscolhida{
    escolhido: boolean;
    ativo: boolean;
}

export const Container = styled(GestureHandlerRootView)`
    flex: 1;
    background-color: ${({theme}) => theme.colors.primary};
    margin-top: ${RFValue(40)}px;
`;

export const Body = styled.View`
    flex: 1;
    justify-content: space-between;
`;

export const WrapCentral = styled.View`
    /* flex: 1; */
    /* flex-direction: column;
    justify-content: space-between;
    border: 1px solid red; */
    /* border: 1px solid black; */
`;

export const Header = styled.View<Props>`
    flex-direction: row;
    align-items: center;

    margin-top: ${RFValue(10)}px ;
    margin-bottom: ${RFValue(10)}px;
    padding: 0 ${({theme}) => theme.padding.lateral}px;

    ${({ isActive }) => isActive == true && css `
        justify-content: space-between;
    `}; 

    ${({ isActive }) => isActive == false && css `
    `}; 

`;

export const WrapIcone = styled.TouchableOpacity``;

export const Icone = styled(FontAwesome5)`
    color: #ffffff;
    font-size: ${RFValue(30)}px;
`;

export const WrapTitulo = styled.View`
    align-items: center;
    justify-content: center;
    flex: 1;
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
    margin: 0 ${({theme}) => theme.margin.lateral_half}px;
    margin-top: ${({theme}) => theme.margin.lateral_half}px;
`;

export const WrapCalendar = styled.View``;

export const WrapCarregandoHoras = styled.View`
    background-color: ${({theme}) => theme.colors.shape};
    border-radius: ${({theme}) => theme.bordas.padrao}px;
    align-items:center;
    justify-content: center;
    margin: ${RFValue(50)}px ${({theme}) => theme.margin.lateral_half}px;
`;

export const TextCarregandoHoras = styled.Text`
    font-size: ${RFValue(16)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
    padding: ${RFValue(5)}px;
`;



export const TimeList = styled.ScrollView.attrs({
    horizontal:true,
    showsHorizontalScrollIndicator:false,
    contentContainerStyle: { paddingHorizontal: 10 }
})`
`;

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

export const WrapIsEvaluation = styled.View`
    flex-direction: row;
    background-color: ${({theme}) => theme.colors.shape};
    border-radius: ${({theme}) => theme.bordas.padrao}px;
    align-items:center;
    justify-content: flex-start;
    margin: 0 ${({theme}) => theme.margin.lateral_half}px;
    margin-top: ${({theme}) => theme.margin.lateral_half}px;
    padding-left: ${({theme}) => theme.padding.lateral}px;
`;

export const TextEvaluation = styled.Text`
    font-size: ${RFValue(15)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
    padding: ${RFValue(5)}px;
`;


export const WrapButtons = styled.View`
    margin: 0 ${({theme}) => theme.margin.lateral_half}px;
    margin-top: ${({theme}) => theme.margin.lateral_half + RFValue(5)}px;
    margin-bottom: ${({theme}) => theme.margin.lateral_half}px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const Button = styled.TouchableOpacity<PropsFooterButton>`

    align-items: center;
    justify-content: center;
    border-radius: ${({theme}) => theme.bordas.padrao}px;
    width: 45%;

     ${({ type }) => type === "ok" && css `
         background-color: ${({theme}) => theme.colors.success};
         height: ${RFValue(40)}px;
     `};

     ${({ type }) => type === "cancel" && css `
         background-color: ${({theme}) => theme.colors.status_cancelado};
         height: ${RFValue(40)}px;
     `};

`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.bold};
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(16)}px;
`;

