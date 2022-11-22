import { RFValue } from 'react-native-responsive-fontsize';
import styled from "styled-components/native";
import { FontAwesome5 } from '@expo/vector-icons';
import { DefaultAppValues } from '../../../global/styles/theme';


export const TipoPagamentoList = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: ${({theme}) => theme.colors.shape};
    border-radius: ${({theme}) => theme.bordas.padrao}px;
    margin-bottom: ${RFValue(10)}px;
    padding: ${RFValue(5)}px;
    padding-left: ${RFValue(10)}px;

    shadow-color: #000;
    shadow-offset: {width: 0px};
    shadow-offset: {height: 1px};
    shadow-opacity: 0.4;
    shadow-radius: 1px;
    elevation: 2;
`;

export const WrapText = styled.View`
    flex: 1;
    flex-direction: column;
`;

export const NomeTipoPagamento = styled.Text`
    font-size: ${ RFValue(DefaultAppValues.fontSize.tres) }px;
    font-family: ${({theme}) => theme.fonts.regular};
`;

export const Descricao = styled.Text`
    font-size: ${ RFValue(DefaultAppValues.fontSize.dois) }px;
    font-family: ${({theme}) => theme.fonts.thin};
`;

export const WrapIcone = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
`;

export const Icone = styled(FontAwesome5)`
    font-size: ${RFValue(16)}px;
    padding-right: ${RFValue(10)}px;
`;