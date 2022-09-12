import styled, {css} from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { FontAwesome5 } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import { DefaultAppValues } from '../../global/styles/theme';

interface Props{
    status?: number;
    horaPassou?: number;
}

export const Container = styled.View<Props>`
    flex: 1;
    background-color: ${({theme}) => theme.colors.shape};
    border-radius: ${({theme}) => theme.bordas.padrao}px;
    padding: ${RFValue(5)}px ${RFValue(5)}px;
    margin-bottom: ${({theme}) => theme.margin.bottom}px;
    border-left-width: ${RFValue(5)}px;
    align-items: center;
    flex-direction: row;

    ${({ status }) => status == 0 && css ` border-left-width: 0; `};
    ${({ status }) => status == 1 && css ` border-left-color: ${({theme}) => theme.colors.status_default}; `};
    ${({ status }) => status == 2 && css ` border-left-color: ${({theme}) => theme.colors.status_atendido}; `};
    ${({ status }) => status == 3 && css ` border-left-color: ${({theme}) => theme.colors.status_remarcado}; `};
    ${({ status }) => status == 4 && css ` border-left-color: ${({theme}) => theme.colors.status_cancelado}; `};
    ${({ status }) => status == 5 && css ` border-left-color: ${({theme}) => theme.colors.status_desmarcado}; `};
    ${({ status }) => status == 6 && css ` border-left-color: ${({theme}) => theme.colors.status_avaliacao}; `};

`;

export const WrapInfos = styled.View`
    flex: 1;
`;

export const WrapHours = styled.View`
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    margin-top: ${RFValue(-8)}px;
`;

export const HourIcon = styled(FontAwesome5)<Props>`
    color: ${({theme}) => theme.colors.secondary};
    justify-content: flex-start;
    align-items: center;
    padding-right: ${RFValue(5)}px;
    font-size: ${RFValue(12)}px;

    ${({ status }) => status == 1 && css ` color: ${({theme}) => theme.colors.status_default}; `};
    ${({ status }) => status == 2 && css ` color: ${({theme}) => theme.colors.status_atendido}; `};
    ${({ status }) => status == 3 && css ` color: ${({theme}) => theme.colors.status_remarcado}; `};
    ${({ status }) => status == 4 && css ` color: ${({theme}) => theme.colors.status_cancelado}; `};
    ${({ status }) => status == 5 && css ` color: ${({theme}) => theme.colors.status_desmarcado}; `};
    ${({ status }) => status == 6 && css ` color: ${({theme}) => theme.colors.status_avaliacao}; `};
`;

export const Hour = styled.Text<Props>`
    justify-content: flex-start;
    align-items: center;
    font-family: ${({ theme }) => theme.fonts.bold};
    font-size: ${RFValue(12)}px;
    color: ${({theme})=> theme.colors.text};
    padding-top: ${RFValue(5)}px;

    /* ${({ horaPassou }) => horaPassou == 0 && css ` color: ${({theme}) => theme.colors.secondary}; `}; */
    /* ${({ horaPassou }) => horaPassou == 1 && css ` color: ${({theme}) => theme.colors.status_default}; `}; */
    /* ${({ horaPassou }) => horaPassou == 2 && css ` color: ${({theme}) => theme.colors.status_remarcado}; `}; */

`;

export const WrapDate = styled.View`
    align-items: center;
    flex-direction: row;
    justify-content: flex-start;
`;

export const WeekDay = styled.Text`
    font-family: ${({theme}) => theme.fonts.bold};
    font-size: ${RFValue(DefaultAppValues.fontSize.tres)}px;
`;

export const Day = styled.Text`
    font-family: ${({theme}) => theme.fonts.bold};
    font-size: ${RFValue(DefaultAppValues.fontSize.tres)}px;
`;

export const DateStr = styled.Text`
    font-family: ${({theme}) => theme.fonts.bold};
    font-size: ${RFValue(DefaultAppValues.fontSize.tres)}px;
`;

export const WrapButton = styled(RectButton)`
    padding: ${RFValue(8)}px;
`;

export const EditButton = styled(FontAwesome5)`
    font-size: ${RFValue(14)}px;
`;

export const Traco = styled.Text``;

export const EvaluationIcon = styled(FontAwesome5)`
    font-size: ${RFValue(12)}px;
    color: ${({theme}) => theme.colors.status_avaliacao};
    padding-right: ${RFValue(3)}px;
`;

export const Type = styled.Text`
    font-family: ${({ theme }) => theme.fonts.bold};
    font-size: ${RFValue(12)}px;
    color: ${({theme}) => theme.colors.status_avaliacao};
    padding-top: ${RFValue(5)}px;
`;

export const Status = styled.Text<Props>`
    justify-content: flex-start;
    align-items: center;
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(10)}px;
    /* padding-top: ${RFValue(3)}px; */
    border-radius: ${RFValue(DefaultAppValues.bordas.padrao)}px;
    padding: 0 ${RFValue(5)}px;
    margin-top: ${RFValue(2)}px;

    ${({ status }) => status == 1 && css ` background-color: ${({theme}) => theme.colors.status_default}; `};
    ${({ status }) => status == 2 && css ` background-color: ${({theme}) => theme.colors.status_atendido}; `};
    ${({ status }) => status == 3 && css ` background-color: ${({theme}) => theme.colors.status_remarcado}; `};
    ${({ status }) => status == 4 && css ` background-color: ${({theme}) => theme.colors.status_cancelado}; `};
    ${({ status }) => status == 5 && css ` background-color: ${({theme}) => theme.colors.status_desmarcado}; `};
    ${({ status }) => status == 6 && css ` background-color: ${({theme}) => theme.colors.status_avaliacao}; `};
`;
