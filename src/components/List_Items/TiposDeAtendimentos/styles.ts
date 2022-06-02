import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from "styled-components/native";
import { FontAwesome5 } from '@expo/vector-icons';
import { RectButton } from "react-native-gesture-handler";




export const TipoPagamentoList = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: ${({theme}) => theme.colors.shape};
    border-radius: ${({theme}) => theme.bordas.padrao}px;
    margin-bottom: ${RFValue(10)}px;
    padding: ${RFValue(5)}px;
    padding-left: ${RFValue(10)}px;
`;

export const WrapText = styled.View`
    flex: 1;
    flex-direction: column;
`;

export const NomeTipoPagamento = styled.Text`
    font-size: ${RFValue(18)}px;
    font-family: ${({theme}) => theme.fonts.regular};
`;

export const WrapIcone = styled.TouchableHighlight`
    align-items: center;
    justify-content: center;
`;

export const Icone = styled(FontAwesome5)`
    font-size: ${RFValue(16)}px;
    padding-right: ${RFValue(10)}px;
`;

export const WrapContent = styled.View`
    flex-direction: column;
    flex: 1;
`;

export const WrapInfos = styled.View`
    flex-direction: row;
    flex: 1;
    align-items: center;
    justify-content: flex-start;
`;

export const ImageIcon = styled.Image`
    width: ${RFValue(18)}px;
    height: ${RFValue(18)}px;
    margin-top: ${RFValue(-3)}px;
`;

export const WrapInfosGroup = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const Tempo = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(12)}px;
    padding: 0px;
    padding-top: ${RFValue(2)}px;
    padding-left: ${RFValue(3)}px;
`;

export const IconeMinus = styled(FontAwesome5)`
    font-size: ${RFValue(12)}px;
    color: ${({theme})=> theme.colors.secondary};
    margin: 0 ${RFValue(5)}px;
`;

export const Valor = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(12)}px;
    padding: 0px;
    padding-top: ${RFValue(2)}px;
    padding-left: ${RFValue(3)}px;
`;


