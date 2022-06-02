import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from "styled-components/native";
import { FontAwesome5 } from '@expo/vector-icons';
import theme, { DefaultFontSize } from '../../../../global/styles/theme';
import { RectButton } from "react-native-gesture-handler";


export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.primary};
`;

export const WrapToast = styled.View`
    z-index: 1;
`;

export const WrapCentral = styled.View`
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
`;

export const WrapItens = styled.View`
    margin: 0 ${({theme}) => theme.margin.lateral_half}px;
    margin-top: ${RFValue(15)}px;
`;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: ${RFValue(150)}px;
`;

export const WrapSemAtendimentos = styled.View`
    align-items: center;
    justify-content: center;
`;

export const AvisoSemAtendimentos = styled.Text`
    padding-bottom: ${RFValue(50)}px;
    padding-top: ${RFValue(50)}px;
    font-family: ${({theme}) => theme.fonts.bold};
    color: ${({theme}) => theme.colors.text_dark};
    font-size: ${RFValue(18)}px;
`;

export const WrapBtnCadastro = styled.View`
    margin-bottom: ${RFValue(25)}px;
    align-items: flex-end;
    margin-right: ${RFValue(25)}px;
`;

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
    font-size: ${ RFValue(DefaultFontSize.title) };
    font-family: ${({theme}) => theme.fonts.regular};
`;

export const Descricao = styled.Text`
    font-size: ${ RFValue(DefaultFontSize.description) };
    font-family: ${({theme}) => theme.fonts.thin};
`;

export const WrapIcone = styled.TouchableHighlight`
    align-items: center;
    justify-content: center;
`;

export const Icone = styled(FontAwesome5)`
    font-size: ${RFValue(16)}px;
    padding-right: ${RFValue(10)}px;
`;
