import { RFValue } from 'react-native-responsive-fontsize';
import styled, {css} from "styled-components/native";
import { TouchableOpacity } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons';

export const Container = styled(RectButton)`
    height: ${RFValue(56)}px;
    background-color: ${({theme}) => theme.colors.shape}; 
    align-items: center;
    justify-content: center; 
    flex-direction: row;
    border-radius: ${({theme}) => theme.bordas.padrao}px;
`;

export const WrapLogo = styled.View`
    height: 100%;
    justify-content: center;
    align-items: center;
    padding: ${RFValue(16)}px;
    border-color: #c3c3c3;
    border-right-width: 1px;
`;

export const Title = styled.Text`
    color: grey;
    text-align: center;
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;
    margin: 0 ${RFValue(25)}px;
`;

export const Logo = styled.Image` 
    width: ${RFValue(35)}px;
    height: ${RFValue(35)}px;
`;

