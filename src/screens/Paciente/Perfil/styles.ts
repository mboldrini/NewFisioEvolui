import styled, {css} from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { FontAwesome5 } from "@expo/vector-icons";

export const Container = styled.ScrollView`
    flex: 1;
    background-color: ${({theme}) => theme.colors.primary};
`;

export const WrapGroup = styled.View`
    background-color: ${({theme}) => theme.colors.secondary};
    margin: 0 ${({theme}) => theme.margin.lateral}px;
    border-radius: ${({theme}) => theme.bordas.padrao}px;
    margin-bottom: ${({theme}) => theme.margin.bottom}px;
    padding: ${RFValue(10)}px ${({theme}) => theme.padding.lateral_half}px;
`;

export const Title = styled.Text`
    font-size: ${RFValue(16)}px;
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
    font-size: ${RFValue(28)}px;
    color: ${({theme}) => theme.colors.shape};
    min-width: ${RFValue(37)}px;
`;

export const InfoArea = styled.View`
    margin-left: ${RFValue(10)}px;
`;

export const Description = styled.Text`
    color: ${({theme}) => theme.colors.shape};
    font-family: ${({theme}) => theme.fonts.thin};
    font-size: ${RFValue(13)}px;
`;

export const Info = styled.Text`
    flex: 1;
    color: ${({theme}) => theme.colors.shape};
    font-family: ${({theme}) => theme.fonts.bold};
    font-size: ${RFValue(13)}px;
    padding-right: ${RFValue(15)}px;
`;


export const InfoTexto = styled.Text`
    color: ${({theme}) => theme.colors.shape};
    font-family: ${({theme}) => theme.fonts.bold};
    font-size: ${RFValue(13)}px;
    padding-right: ${RFValue(15)}px;
    max-width: 97%;
`;




