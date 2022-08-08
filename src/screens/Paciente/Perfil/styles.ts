import styled, {css} from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { FontAwesome5 } from "@expo/vector-icons";
import { DefaultAppValues } from "../../../global/styles/theme";

import {ExpandableSection} from 'react-native-ui-lib';

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.primary};
`;

export const WrapGroup = styled.View`
    background-color: ${({theme}) => theme.colors.secondary};
    margin: 0 ${({theme}) => theme.margin.lateral_half}px;
    border-radius: ${({theme}) => theme.bordas.padrao}px;
    margin-bottom: ${({theme}) => theme.margin.bottom}px;
    padding: 0 ${({theme}) => theme.padding.lateral_half}px;
    padding-top: ${RFValue(5)}px;
    /* padding: ${RFValue(10)}px ${({theme}) => theme.padding.lateral_half}px; */
`;

export const WrapGroupBtn = styled.View`
    /* background-color: ${({theme}) => theme.colors.secondary}; */
    /* margin: 0 ${({theme}) => theme.margin.lateral_half}px; */
    /* border-radius: ${({theme}) => theme.bordas.padrao}px; */
    /* margin-bottom: ${({theme}) => theme.margin.bottom}px; */
    padding: 0 ${({theme}) => theme.padding.lateral_half}px;
    /* padding: ${RFValue(10)}px ${({theme}) => theme.padding.lateral_half}px; */
`;


export const Title = styled.Text`
    font-size: ${RFValue(DefaultAppValues.fontSize.dois)}px;
    font-family: ${({theme}) => theme.fonts.bold};
    color: ${({theme}) => theme.colors.shape};
`;

export const WrapInfo = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin: 5px 0;
    padding-bottom: ${RFValue(3)}px;
`;

export const Spacer = styled.View`
    width: 100%;
    border-bottom-color: ${({theme}) => theme.colors.primary};
    border-bottom-width: 1px;
`;

export const Icone = styled(FontAwesome5)`
    font-size: ${RFValue(20)}px;
    color: ${({theme}) => theme.colors.shape};
    min-width: ${RFValue(32)}px;
`;

export const WrapIconeEdit = styled.TouchableHighlight``;

export const IconeItemEdit = styled(FontAwesome5)`
    font-size: ${RFValue(18)}px;
    color: ${({theme}) => theme.colors.shape};
    align-items: center;
    justify-content: center;
    padding-right: ${RFValue(5)}px;
`;

export const InfoArea = styled.View`
    margin-left: ${RFValue(10)}px;
    flex: 1;
`;

export const Description = styled.Text`
    color: ${({theme}) => theme.colors.shape};
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(DefaultAppValues.fontSize.um)}px;
`;

export const Info = styled.Text`
    flex: 1;
    color: ${({theme}) => theme.colors.shape};
    font-family: ${({theme}) => theme.fonts.bold};
    font-size: ${RFValue(DefaultAppValues.fontSize.um)}px;
    padding-right: ${RFValue(15)}px;
`;

export const InfoTexto = styled.Text`
    color: ${({theme}) => theme.colors.shape};
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(DefaultAppValues.fontSize.um)}px;
    padding-right: ${RFValue(15)}px;
`;

export const WrapLoadingPctInfos = styled.View`
    flex: 1;
    margin-top: ${RFValue(50)}px;
    align-items: center;
    justify-content: center;
`;

export const TextLoadingPctInfos = styled.Text`
    font-size: ${RFValue(20)}px;
    font-family: ${({theme}) => theme.fonts.bold};
    color: ${({theme}) => theme.colors.text_dark};
`;

export const DateWrapper = styled.View`
    background-color: ${({theme}) => theme.colors.background };
    border-radius: ${({theme}) => theme.bordas.padrao}px;
    padding: ${({theme}) => theme.padding.superior}px 0px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const SelectDateWrapper = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: ${RFValue(5)}px;
`;

export const IconeChangeMonth = styled(FontAwesome5)`
    font-size: ${RFValue(30)}px;
    justify-content: center;
    align-items: center;
`;

export const ChangeMonthLeft = styled.TouchableOpacity`
    flex: 1;
    align-items: flex-end;
    justify-content: center;
`;

export const ChangeMonthRight = styled.TouchableOpacity`
    flex: 1;
    align-items: flex-start;
    justify-content: center;
`;

export const Month = styled.Text`
    padding: 0 ${RFValue(10)}px;
    padding-top: ${RFValue(2)}px;
    font-family: ${({theme}) => theme.fonts.bold};
    font-size: ${RFValue(18)}px;
    align-items: center;
    justify-content: center;
`;

export const WrapAgendamentos = styled.View`
    align-items: center;
    justify-content: center;
    margin: 0 ${({theme}) => theme.margin.lateral_half}px;
`;

export const LoadingIcon = styled.ActivityIndicator`
    margin: ${RFValue(20)}px 0;
`;

export const WrapToast = styled.View`
    z-index: 1;
`;

export const TextSemAgendamentos = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({theme}) => theme.fonts.regular};
    color: #FFFFFF;
    padding-top: ${RFValue(5)}px;
`;

export const SectionExpandable = styled(ExpandableSection)``;

export const WrapExpandTitle = styled.View`
    flex-direction: row;
    margin: 0 ${({theme}) => theme.margin.lateral_half}px;
    justify-content: space-between;
    border-bottom-width: 1px;
    border-bottom-color: ${({theme}) => theme.colors.secondary};
    margin-bottom: ${({theme}) => theme.margin.bottom}px;
`;

export const ExpandableTitle = styled.Text`
    font-family: ${({theme}) => theme.fonts.bold};
    color: #ffffff;
    font-size: ${RFValue(DefaultAppValues.fontSize.dois)}px;
`;

export const WrapInfoList = styled.View`
    margin: 0 ${({theme}) => theme.margin.lateral_half}px;
    margin-bottom: ${({theme}) => theme.margin.bottom}px;
    background-color: ${({theme}) => theme.colors.secondary};
    border-radius: ${({theme}) => theme.bordas.padrao}px;
    padding: ${RFValue(5)}px 0;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex: 1;
`;

export const Line = styled.View`
    border-bottom-width: 1px;
    border-bottom-color: ${({theme}) => theme.colors.secondary};
    margin: 0 ${({theme}) => theme.margin.lateral_half}px;
    margin-bottom: ${RFValue(15)}px;
`;
