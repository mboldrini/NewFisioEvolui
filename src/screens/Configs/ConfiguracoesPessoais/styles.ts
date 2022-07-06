import { RFValue } from 'react-native-responsive-fontsize'; 
import styled, {css}  from "styled-components/native";
import { FontAwesome5 } from '@expo/vector-icons';
import { RectButton } from "react-native-gesture-handler";
import { DefaultAppValues } from '../../../global/styles/theme';

interface Props{
    bool?: boolean;
}

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.primary};
`;

export const Wrap = styled.View`
    margin: 0 ${RFValue(DefaultAppValues.margin.lateral_half)}px;
    margin-top: ${RFValue(15)}px;
    flex: 1;
`;

export const BtnList = styled.View`
    margin-bottom: ${RFValue(5)}px;
    width: 100%;
    border-bottom-color: #4EADBE;
    border-bottom-width: 1px;
    padding: ${RFValue(5)}px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${RFValue(5)}px;
`;

export const TituloList = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(16)}px;
    color: #ffffff;
    align-items: center;
    justify-content: center;
    padding-left: ${RFValue(10)}px;
`;

export const WrapHoras = styled.TouchableOpacity<Props>`
    background-color: ${({theme}) => theme.colors.secondary};
    min-width: ${RFValue(85)}px;
    align-items: center;
    justify-content: center;
    border-radius: ${({theme}) => theme.bordas.padrao}px;
    padding: ${RFValue(DefaultAppValues.padding.superior)}px 0;

    ${({ bool }) => bool == false && css `
        background-color: ${({theme}) => theme.colors.status_cancelado};
    `};

    ${({ bool }) => bool == true && css `
        background-color: ${({theme}) => theme.colors.success};
    `};

`;

export const TextoBtn = styled.Text`
    font-family: ${({theme}) => theme.fonts.bold};
    color: #ffffff;
`;

export const WrapIcone = styled.View`
    min-width: ${RFValue(45)}px;
    align-items: center;
    justify-content: center;
`;

export const Icone = styled(FontAwesome5)`
    color: #ffffff;
    font-size: ${RFValue(16)}px;
    align-items: center;
    justify-content: center;
`;

export const WrapFooterCadastro = styled.View`
    margin: 0 ${({theme}) => theme.margin.lateral_half}px;
    margin-bottom: ${({theme}) => theme.margin.lateral_half}px;
`;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: ${RFValue(150)}px;
`;



/*
export const LoadingIcon = styled.ActivityIndicator``;

export const WrapTitle = styled.View`
    border-bottom-width: 2px;
    border-bottom-color: ${({theme})=> theme.colors.text_dark};
    margin-bottom: ${RFValue(10)}px;
`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.bold};
    font-size: ${RFValue(16)}px;
    color: ${({theme}) => theme.colors.text_dark};
`;

export const InfosGroup = styled.View`
    margin-bottom: ${RFValue(20)}px;
`;

export const WrapBtns = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const WrpBtn = styled.View`
    flex: 1;
    max-width: 45%;
`;

export const Button = styled(RectButton)`
    flex: 1;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: ${RFValue(10)}px;
    background-color: ${({theme}) => theme.colors.button_ok};
    border-radius: ${({theme}) => theme.bordas.padrao}px;
`;

export const Icone = styled(FontAwesome5)`
    font-size: ${RFValue(20)}px;
    padding-right: ${RFValue(10)}px;
    color: ${({theme}) => theme.colors.shape};
`;

export const BtnText = styled.Text`
   font-size: ${RFValue(24)}px;
   color: ${({theme}) => theme.colors.shape};
`;
*/


