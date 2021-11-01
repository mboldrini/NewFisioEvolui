import styled, {css} from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View``;

export const TabArea = styled.View`
    height: 60px;
    background-color: ${({theme}) => theme.colors.secondary};
    flex-direction: row;
`;

export const TabItem = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const Icon = styled(Ionicons)`
    color: #ffffff;
    font-size: ${RFValue(25)}px;
`;

export const TabItemCenter = styled.TouchableOpacity`
    width: ${RFValue(65)}px;
    height: ${RFValue(65)}px;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.shape};
    border-radius: 50px;
    border: 3px solid ${({theme}) => theme.colors.secondary};
    margin-top: ${RFValue(-18)}px;
`;

export const IconCenter = styled(Ionicons)`
    color: ${({theme}) => theme.colors.secondary};
    font-size: ${RFValue(32)}px;
`;




