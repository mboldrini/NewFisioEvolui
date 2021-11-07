import styled, {css} from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const Container = styled.TouchableOpacity`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: ${({theme}) => theme.margin.bottom};
    background-color: ${({theme}) => theme.colors.shape};
    border-radius: ${({theme}) => theme.bordas.padrao};
`;

export const AreaIcone = styled.View`
    align-items: center;
    justify-content: center;
    padding: ${RFValue(18)}px 0;
    padding-left: ${RFValue(20)}px;
`;

export const Icone = styled(FontAwesome5)`
    font-size: ${RFValue(20)}px;
    color: ${({theme}) => theme.colors.secondary};
`;

export const Titulo = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.secondary};
    font-size: ${RFValue(18)}px;
    padding: 0 0 0 ${RFValue(10)}px;
`;

