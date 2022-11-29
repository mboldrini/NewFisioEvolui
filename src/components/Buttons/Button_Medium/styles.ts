import { FontAwesome5 } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";
import styled, {css} from "styled-components/native";
import { DefaultAppValues } from '../../../global/styles/theme';

interface ITipoBtn{
    tipo:  'padrao' | 'ok' | 'cancelar' | 'alerta';
}

export const WrapAction = styled.View`
    align-items: flex-end;
    margin: 0 ${RFValue(DefaultAppValues.margin.bottom)}px;
    /* margin-bottom: ${RFValue(DefaultAppValues.margin.bottom)}px; */
    /* margin-right: ${RFValue( DefaultAppValues.margin.lateral_half)}px; */
    /* margin-top: ${RFValue( DefaultAppValues.margin.lateral_half)}px; */
`;

export const ButtonSmallBd = styled.TouchableOpacity<ITipoBtn>`

    align-items: center;
    justify-content: center;
    height: ${RFValue(40)}px;
    border-radius: ${RFValue(DefaultAppValues.bordas.padrao)}px;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    shadow-color: #000;
    shadow-offset: {width: 0px};
    shadow-offset: {height: 1px};
    shadow-opacity: 0.4;
    shadow-radius: 3px;
    elevation: 1;
    width: 100%;
    

    ${({ tipo }) => tipo == 'padrao' && css `
        background-color: #ffffff;
    `}; 

    ${({ tipo }) => tipo == 'ok' && css `
        background-color: ${({theme}) => theme.colors.status_atendido};
        color: #ffffff;
    `}; 

    ${({ tipo }) => tipo == 'cancelar' && css `
        background-color: ${({theme}) => theme.colors.status_cancelado};
    `}; 

    
    ${({ tipo }) => tipo == 'alerta' && css `
        background-color: ${({theme}) => theme.colors.status_remarcado};
    `}; 

`;

export const WrapTitle = styled.View`
    flex-direction: row;
`;

export const IconeBtn = styled(FontAwesome5)<ITipoBtn>`
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(20)}px;
    margin-Left: ${RFValue(16)}px;
    color: #000000;
    margin-right: ${RFValue(8)}px;

    ${({ tipo }) => tipo == 'ok' && css `
        color: #ffffff;
    `}; 

    ${({ tipo }) => tipo == 'cancelar' && css `
        color: #ffffff;
    `}; 
`;


export const TitleBtn = styled.Text<ITipoBtn>`
    font-family: ${({theme}) => theme.fonts.thin};
    font-size: ${RFValue(16)}px;
    padding-right: ${RFValue(20)}px;


    ${({ tipo }) => tipo == 'ok' && css `
        color: #ffffff;
    `}; 

    ${({ tipo }) => tipo == 'cancelar' && css `
        color: #ffffff;
    `}; 
`;

