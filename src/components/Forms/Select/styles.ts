import { FontAwesome5 } from "@expo/vector-icons";
import styled from "styled-components/native";
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.TouchableOpacity.attrs({
    activeOpacity: 0.7
})`
    background-color: ${({theme}) => theme.colors.input_background};
    border-radius: ${({theme}) => theme.bordas.padrao};
    height: ${RFValue(60)};
    margin: 0 ${({theme}) => theme.padding.lateral}px;
    margin-bottom: ${({theme}) => theme.margin.input_bottom};
    padding: 0 20px;
    border-width: 1;
    border-color: ${({theme}) => theme.colors.input_background};
    border-bottom-width: 1;
    shadow-color: ${({theme}) => theme.colors.text_dark};
    shadow-offset: {width: 0, height: 2};
    shadow-opacity: 0.3;
    shadow-radius: 5;
    elevation: 2;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const Category = styled.Text`
    color: ${({theme}) => theme.colors.text_dark};
`;

export const Icon = styled(FontAwesome5)`
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(18)}px;
`;





