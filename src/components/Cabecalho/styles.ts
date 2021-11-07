import styled, {css} from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { FontAwesome5 } from "@expo/vector-icons";

export const Container = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin: 0 ${({theme}) => theme.margin.lateral}px;
    margin-top: ${RFValue(35)}px ;
`;

export const Icone = styled(FontAwesome5)`
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(30)}px;
    
`;

export const Titulo = styled.Text`
    font-size: ${RFValue(22)}px;
    color: ${({theme}) => theme.colors.shape};
    font-family: ${({theme}) => theme.fonts.regular};
    margin-right: ${RFValue(50)}px;
`;

export const WrapLeft = styled.TouchableOpacity`
    width: ${RFValue(100)}px;
`;




