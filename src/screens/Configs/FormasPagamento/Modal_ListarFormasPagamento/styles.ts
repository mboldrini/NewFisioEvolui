import { RFValue } from "react-native-responsive-fontsize";
import styled, {css} from 'styled-components/native';

import {GestureHandlerRootView, RectButton} from 'react-native-gesture-handler';
import FontAwesome5 from "@expo/vector-icons/build/FontAwesome5";
import { DefaultAppValues } from "../../../../global/styles/theme";

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
`;
