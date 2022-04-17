import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import {GestureHandlerRootView} from 'react-native-gesture-handler';


export const Container = styled(GestureHandlerRootView)`
    flex: 1;
    background-color: ${({theme}) => theme.colors.primary}; 
    align-items: center;
    justify-content: center;
`;

export const Mensagem = styled.Text`
    font-size: ${RFValue(25)}px;
    color: ${({theme}) => theme.colors.text_dark};
    margin-top: ${RFValue(10)}px;
`;
