import { RFValue } from 'react-native-responsive-fontsize';
import styled from "styled-components/native";
import { FontAwesome5 } from '@expo/vector-icons';
import { RectButton } from "react-native-gesture-handler";

export const TipoAtendList = styled.View`
    flex-direction: row;
    background-color: ${({theme}) => theme.colors.shape};
    border-radius: ${({theme}) => theme.bordas.padrao}px;
    align-items: center;
    justify-content: space-between;
    padding: ${RFValue(10)}px ${({theme}) => theme.margin.lateral}px;
    margin-bottom: ${({theme}) => theme.margin.bottom}px;
`;

export const WrapConteudo = styled.View``;

export const WrapPreco = styled.View`
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;

export const MoneyIcon = styled(FontAwesome5)`
    font-size: ${RFValue(16)}px;
    color: ${({theme}) => theme.colors.text_dark };
    padding-right: ${RFValue(10)}px;

`;

export const Preco = styled.Text`
    font-family: ${({theme}) => theme.fonts.thin};
    font-size: ${RFValue(14)}px;
`;

export const WrapNome = styled.View``;

export const Nome = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(16)}px;
`;


export const WrapButton = styled(RectButton)`
    padding: ${RFValue(8)}px;
`;

export const EditButton = styled(FontAwesome5)`
    font-size: ${RFValue(16)}px;
`;

