import { RFValue } from 'react-native-responsive-fontsize';
import styled from "styled-components/native";
import { TouchableOpacity } from 'react-native';
import { RectButton } from "react-native-gesture-handler";

export const Container = styled(TouchableOpacity)`
    background-color: ${({theme}) => theme.colors.button_ok};
    border-radius: ${({theme}) => theme.bordas.padrao}px;
    align-items: center;
    justify-content: center;
    height: ${RFValue(45)}px;
`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.bold};
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(18)}px;
`;


