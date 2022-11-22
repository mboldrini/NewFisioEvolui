import { FontAwesome5 } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { DefaultAppValues } from '../../../global/styles/theme';

export const WrapAction = styled.View`
    align-items: flex-end;
    margin-bottom: ${RFValue(DefaultAppValues.margin.bottom)}px;
    margin-right: ${RFValue( DefaultAppValues.margin.lateral_half)}px;
    margin-top: ${RFValue( DefaultAppValues.margin.lateral_half)}px;
`;

export const ButtonSmallBd = styled.TouchableOpacity`
    background-color: #ffffff;
    align-items: center;
    justify-content: center;
    height: ${RFValue(36)}px;
    border-radius: ${RFValue(DefaultAppValues.bordas.padrao)}px;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    shadow-color: #000;
    shadow-offset: {width: 0px};
    shadow-offset: {height: 1px};
    shadow-opacity: 0.4;
    shadow-radius: 1px;
    elevation: 2;
`;

export const WrapTitle = styled.View`
    flex-direction: row;
`;

export const IconeBtn = styled(FontAwesome5)`
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(16)}px;
    margin-Left: ${RFValue(14)}px;
    color: #000000;
    margin-right: ${RFValue(6)}px;
`;


export const TitleBtn = styled.Text`
    font-family: ${({theme}) => theme.fonts.thin};
    font-size: ${RFValue(14)}px;
    padding-right: ${RFValue(16)}px;
`;

