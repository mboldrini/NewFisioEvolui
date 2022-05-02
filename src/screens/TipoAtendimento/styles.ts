import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from "styled-components/native";
import { FontAwesome5 } from '@expo/vector-icons';
import theme from '../../global/styles/theme';
import { RectButton } from "react-native-gesture-handler";


export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.primary};
`;

export const ScrollView = styled.ScrollView``;

export const WrapToast = styled.View`
    z-index: 1;
`;

export const WrapItens = styled.View`
    margin: 0 ${({theme}) => theme.margin.lateral}px;
    margin-top: ${RFValue(15)}px;
`;

export const LoadingIcon = styled.ActivityIndicator``;
