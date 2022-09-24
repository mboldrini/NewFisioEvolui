import { RectButton } from 'react-native-gesture-handler';
import styled, {css} from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { FontAwesome5 } from "@expo/vector-icons";
import { DefaultAppValues } from '../../global/styles/theme';

interface IProp{
    name: string;
}

//// CABECALHO
export const ContainerCabecalho = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 0 ${({theme}) => theme.margin.lateral_half}px;
    margin-top: ${RFValue(10)}px ;
`;

export const WrapLeft = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
`;

export const WrapIcon = styled(RectButton)`
    padding: ${RFValue(5)}px;
`;

export const IconeLeft = styled(FontAwesome5)`
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(20)}px;
    margin-right: ${RFValue(15)}px;
`;

export const IconeRight = styled(FontAwesome5)`
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(18)}px;

    ${({ name }) => name === "trash" && css `
        color: ${({theme}) => theme.colors.attention};
    `};

    ${({ name }) => name === "plus" && css `
        color: ${({theme}) => theme.colors.success_super};
    `};


`;

export const WrapTitle = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const Titulo = styled.Text`
    font-size: ${RFValue(DefaultAppValues.fontSize.quatro)}px;
    color: ${({theme}) => theme.colors.shape};
    font-family: ${({theme}) => theme.fonts.regular};
    align-items: center;
`;




////  MODAL MENU
export const ViewBtn = styled.TouchableOpacity`
    width: ${RFValue(50)}px;
    height: ${RFValue(50)}px;
    background-color: red; 
`;

export const AreaMenu = styled.View`
    position: absolute;
    background-color: #ffffff;
    top: ${RFValue(15)}px;
    right: ${RFValue(15)}px;
    border-radius: ${RFValue(DefaultAppValues.bordas.padrao)}px;
    border: 2px solid ${({theme}) => theme.colors.text_dark};
    shadow-color: #000;
    shadow-offset: {width: 0px};
    shadow-offset: {height: 5px};
    shadow-opacity: 0.8;
    shadow-radius: 15px;
    elevation: 10;
`;

interface ILastItem{
    lastItem: boolean
}
interface ITipoIcone{
    tipo: string;
}


export const BtnMenuList = styled.TouchableOpacity<ILastItem>`
    justify-content: flex-start;
    flex-direction: row;
    align-items: flex-start;
    padding: ${RFValue(5)}px;

    ${({ lastItem }) => lastItem === false && css `
        border-bottom-color: ${({theme}) => theme.colors.text_dark};
        border-bottom-width: 1px;
    `};

`;


export const TituloMenu = styled.Text`
    font-family: ${({theme}) => theme.fonts.thin};
    font-size: ${RFValue(DefaultAppValues.fontSize.tres)}px;
`;

export const IconeMenu = styled(FontAwesome5)<ITipoIcone>`
    color: #000000;
    font-size: ${RFValue(DefaultAppValues.fontSize.tres)}px;
    padding: ${RFValue(3)}px;
    padding-right: ${RFValue(5)}px;

    ${({ tipo }) => tipo === 'trash' && css `
        color: ${({theme}) => theme.colors.attention};
    `};

    ${({ tipo }) => tipo === 'plus' && css `
        color: ${({theme}) => theme.colors.success};
    `};

    ${({ tipo }) => tipo === 'edit' && css `
        color: ${({theme}) => theme.colors.success};
    `};

`;


//// Bloco de Agenda
export const DateWrapper = styled.View`
    background-color: ${({theme}) => theme.colors.shape };
    margin: 0px ${({theme }) => theme.margin.lateral_half}px;
    border-radius: ${({theme}) => theme.bordas.padrao}px;
    padding: ${({theme}) => theme.padding.superior}px 0px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: ${({theme}) => theme.margin.bottom}px;
    /* margin-top: ${RFValue(30)}px; */
    border-width: 1px;
    border-color: #f5f5f5;
    border-bottom-width: 1px;
    shadow-color: #000;
    shadow-offset: {width: 0px};
    shadow-offset: {height: 2px};
    shadow-opacity: 0.8;
    shadow-radius: 1px;
    elevation: 1;
`;

export const Today = styled.Text`
    font-family: ${({theme}) => theme.fonts.thin};
    font-size: ${RFValue(10)}px;
    padding: ${({theme}) => theme.padding.superior}px ${RFValue(10)}px;
    border-color: #f5f5f5;
    border-bottom-width: 1px;
    margin-bottom: ${RFValue(5)}px;
`;

export const SelectDateWrapper = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 5px;
`;

export const IconeChangeMonth = styled(FontAwesome5)`
    font-size: 30px;
    justify-content: center;
    align-items: center;
`;

export const ChangeMonthLeft = styled.TouchableOpacity`
    flex: 1;
    align-items: flex-end;
    justify-content: center;
`;

export const ChangeMonthRight = styled.TouchableOpacity`
    flex: 1;
    align-items: flex-start;
    justify-content: center;
`;

export const Month = styled.Text`
    padding: 0 ${RFValue(10)}px;
    padding-top: 2px;
    font-family: ${({theme}) => theme.fonts.bold};
    font-size: ${RFValue(12)}px;
    align-items: center;
    justify-content: center;
`;


