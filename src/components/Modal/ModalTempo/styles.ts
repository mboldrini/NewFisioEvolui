import { RFValue } from "react-native-responsive-fontsize";
import styled, {css} from 'styled-components/native';

import {GestureHandlerRootView, RectButton} from 'react-native-gesture-handler';
import FontAwesome5 from "@expo/vector-icons/build/FontAwesome5";

interface Props{
    isActive: boolean;
    status: number;
}

export const Container = styled(GestureHandlerRootView)`
    flex: 1;
    background-color: ${({theme}) => theme.colors.primary};
    margin-top: ${RFValue(60)}px;
    border-top-left-radius: 50px;
`;

export const Body = styled.View`
    flex: 1;
    margin-bottom: ${RFValue(5)}px;
    justify-content: center;
`;

export const WrapIcon = styled.TouchableOpacity`
    border: 1px solid red;
`;

export const Icone = styled(FontAwesome5)`
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(40)}px;
`;

export const Bloco = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const Coluna = styled.View`
    flex-direction: column;
    padding: 0 ${RFValue(10)}px;
    align-items: center;
`;

export const Dot = styled.Text`
    font-size: ${RFValue(40)}px;
`;

export const Setas = styled.View``;

export const Campo = styled.View`
`;



