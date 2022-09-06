import { RectButton } from 'react-native-gesture-handler';
import styled, {css} from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { FontAwesome5 } from '@expo/vector-icons';
import { DefaultAppValues } from '../../../global/styles/theme';

interface ICor{
    tipo: number;
}

export const WrapGeral = styled.TouchableOpacity``;

export const TipoPagamentoList = styled.View<ICor>`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: ${({theme}) => theme.colors.shape};
    border-radius: ${({theme}) => theme.bordas.padrao}px;
    margin: 0 ${({theme}) => theme.margin.lateral_half}px;
    margin-bottom: ${RFValue(10)}px;
    padding: ${RFValue(5)}px;
    padding-left: ${RFValue(10)}px;


    border-radius: ${({theme}) => theme.bordas.padrao}px;
    border-left-width: ${RFValue(5)}px;

    ${({ tipo }) => tipo == 0 && css ` border-left-width: 0; `};
    ${({ tipo }) => tipo == 1 && css ` border-left-color: ${({theme}) => theme.colors.status_default}; `};
    ${({ tipo }) => tipo == 2 && css ` border-left-color: ${({theme}) => theme.colors.status_atendido}; `};
    ${({ tipo }) => tipo == 3 && css ` border-left-color: ${({theme}) => theme.colors.status_remarcado}; `};
    ${({ tipo }) => tipo == 4 && css ` border-left-color: ${({theme}) => theme.colors.status_cancelado}; `};
    ${({ tipo }) => tipo == 5 && css ` border-left-color: ${({theme}) => theme.colors.status_desmarcado}; `};
    ${({ tipo }) => tipo == 6 && css ` border-left-color: ${({theme}) => theme.colors.status_avaliacao}; `};
`;

export const WrapText = styled.View`
    flex: 1;
    flex-direction: column;
`;

export const NomeTipoPagamento = styled.Text`
    font-size: ${ RFValue(DefaultAppValues.fontSize.quatro) }px;
    font-family: ${({theme}) => theme.fonts.regular};
`;
export const WrapIcone = styled.View`
    align-items: center;
    justify-content: center;
`;

export const Icone = styled(FontAwesome5)`
    font-size: ${RFValue(16)}px;
    padding-right: ${RFValue(10)}px;
`;