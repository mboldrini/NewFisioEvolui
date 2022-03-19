import styled, {css} from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { FontAwesome5 } from "@expo/vector-icons";

interface Props{
    status?: number;
    horaPassou?: number;
}

export const Container = styled.View<Props>`
    flex: 1;
    background-color: ${({theme}) => theme.colors.shape};
    border-radius: ${({theme}) => theme.bordas.padrao}px;
    padding: ${RFValue(10)}px ${RFValue(10)}px;
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
    align-items: flex-start;
    flex-direction: row;
`;

export const HourIcon = styled(FontAwesome5)<Props>`
    color: ${({theme}) => theme.colors.secondary};
    align-items: center;
    justify-content: center;
    padding-right: ${RFValue(5)}px;

    ${({ status }) => status == 1 && css ` color: ${({theme}) => theme.colors.status_default}; `};
    ${({ status }) => status == 2 && css ` color: ${({theme}) => theme.colors.status_atendido}; `};
    ${({ status }) => status == 3 && css ` color: ${({theme}) => theme.colors.status_remarcado}; `};
    ${({ status }) => status == 4 && css ` color: ${({theme}) => theme.colors.status_cancelado}; `};
    ${({ status }) => status == 5 && css ` color: ${({theme}) => theme.colors.status_desmarcado}; `};
    ${({ status }) => status == 6 && css ` color: ${({theme}) => theme.colors.status_avaliacao}; `};
`;

export const Hour = styled.Text<Props>`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
    color: ${({theme})=> theme.colors.text};

    /* ${({ horaPassou }) => horaPassou == 0 && css ` color: ${({theme}) => theme.colors.secondary}; `}; */
    /* ${({ horaPassou }) => horaPassou == 1 && css ` color: ${({theme}) => theme.colors.status_default}; `}; */
    /* ${({ horaPassou }) => horaPassou == 2 && css ` color: ${({theme}) => theme.colors.status_remarcado}; `}; */

`;

export const WrapDate = styled.View`
    align-items: flex-start;
    flex-direction: row;
`;

export const WeekDay = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(16)}px;
`;

export const Day = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(16)}px;
`;

export const Date = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(16)}px;
`;

export const WrapButton = styled.TouchableOpacity`
    padding: ${RFValue(8)}px;
`;

export const EditButton = styled(FontAwesome5)``;
