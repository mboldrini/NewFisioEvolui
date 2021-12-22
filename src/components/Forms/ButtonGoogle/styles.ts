import { RFValue } from 'react-native-responsive-fontsize';
import styled, {css} from "styled-components/native";
import { TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';



export const Container = styled(TouchableOpacity)`
    height: ${RFValue(55)}px;
    align-items: center;
    justify-content: center; 
    background-color: #4285F4;
    flex-direction: row;
    padding-left: ${RFValue(5)}px;
    padding-right: ${RFValue(5)}px;
`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.bold};
    color: #FFFFFF; 
    font-size: ${RFValue(20)}px;
`;

export const Photo = styled.Image`
    width: ${RFValue(45)}px;
    height: ${RFValue(45)}px;
    margin-right: ${RFValue(15)}px;
`;

