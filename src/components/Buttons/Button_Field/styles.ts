import { FontAwesome5 } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, {css} from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { RectButton } from "react-native-gesture-handler";

export const Container = styled(TouchableOpacity)`
    background-color: ${({theme}) => theme.colors.input_background};
    border-radius: ${({theme}) => theme.bordas.padrao}px;
    height: ${RFValue(40)}px;
    margin: 0 ${({theme}) => theme.padding.lateral_half}px;
    margin-bottom: ${({theme}) => theme.margin.input_bottom}px;
    color: #000000;
    border-width: 1px;
    border-color: ${({theme}) => theme.colors.input_background};
    border-bottom-width: 1px;
    padding: 0 ${RFValue(10)}px;
    font-size: ${RFValue(14)}px;
`;

export const WrapTitle = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    color: #000000;
    font-size: ${RFValue(14)}px;
`;

export const LeftIcon = styled(FontAwesome5)`
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(18)}px;
    margin-Left: ${RFValue(10)}px;
`;

export const RightIcon = styled(FontAwesome5)`
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(18)}px;
    margin-right: ${RFValue(10)}px;
`;

