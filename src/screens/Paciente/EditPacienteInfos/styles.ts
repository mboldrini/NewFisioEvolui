import { RectButton } from 'react-native-gesture-handler';
import styled, {css} from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { FontAwesome5 } from "@expo/vector-icons";
import { DefaultAppValues } from "../../../global/styles/theme";

export const Container = styled.View`
    background-color: ${({theme}) => theme.colors.primary};
    flex: 1;
`;

export const Iscrol = styled.ScrollView`
    z-index: -1;
    flex-direction: column;
`;

//// CABECALHO
export const WrapIcon = styled(RectButton)`
    padding: ${RFValue(5)}px;
`;

/// Restante
export const WrapLoadingPctInfos = styled.View`
    flex: 1;
    margin-top: ${RFValue(50)}px;
    align-items: center;
    justify-content: center;
`;
export const LoadingIcon = styled.ActivityIndicator`
    margin: ${RFValue(20)}px 0;
`;

/// FORM
export const Form = styled.View`
    flex: 1;
    margin-top: ${RFValue(10)}px;
`;

export const Fields = styled.View`
`;

export const TitleGroup = styled.View`
    width: 100%;
    margin-bottom: ${RFValue(10)}px;
    flex: 1;
    border-bottom-color: #4EADBE;
    border-bottom-width: 2px;
`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.shape};
    margin: 0 ${RFValue(DefaultAppValues.margin.lateral_half)}px;
    font-size: ${RFValue(14)}px;
`;

export const WrapFooterCadastro = styled.View`
    margin: 0 ${({theme}) => theme.margin.lateral}px;
    margin-bottom: ${RFValue(15)}px;
`;

export const WrapDataEscolhida = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-left: ${RFValue(DefaultAppValues.margin.lateral_half)}px;
`;

export const TextoDataEscolhida = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
`;

export const WrapList = styled.View`
    margin: 0 ${RFValue(DefaultAppValues.margin.lateral_half)}px;
`;

