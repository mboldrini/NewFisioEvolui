import { RFValue } from 'react-native-responsive-fontsize';
import { FontAwesome5 } from '@expo/vector-icons';
import styled, {css} from "styled-components/native";
import { TextInput } from 'react-native';
import { DefaultAppValues } from '../../global/styles/theme';

interface IProps{
    enabled: boolean;
}

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.primary};
`;

export const WrapCabecalho = styled.View``;

export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    margin-top: ${RFValue(10)}px;
`;

export const SearchInput = styled(TextInput)`
    background-color: ${({theme}) => theme.colors.input_background};
    border-radius: ${RFValue(25)}px;
    height: ${RFValue(40)}px;
    margin: 0 ${({theme}) => theme.padding.lateral_half}px;
    color: #000000;
    border-width: 1px;
    border-color: ${({theme}) => theme.colors.input_background};
    border-bottom-width: 1px;
    padding-left: 10px;
    font-size: ${RFValue(14)}px;
    flex: 1;
`;

export const WrapOpcoesList = styled.View`
    margin: 0 ${RFValue(DefaultAppValues.margin.lateral_half)}px;
    margin-top: ${RFValue(5)}px;
`;


export const WrapBtn = styled.TouchableOpacity``;

export const Icone = styled(FontAwesome5)`
    font-size: ${RFValue(25)}px;
    color: ${({theme}) => theme.colors.shape };
    padding-right: ${RFValue(5)}px;
    align-items: center;
    margin-right: ${RFValue(12)}px;
`;

export const BtnArea = styled.TouchableOpacity<IProps>`
    background-color: ${({theme}) => theme.colors.secondary_light};
    margin: 0 ${RFValue(5)}px;
    padding: ${RFValue(5)}px ${RFValue(10)}px;
    border-radius: ${RFValue(DefaultAppValues.bordas.padrao)}px;
    align-items: center;
    justify-content: center;

    ${({ enabled }) => enabled == true && css `
        background-color: ${({theme}) => theme.colors.text_dark}; 
        border: 1px solid ${({theme}) => theme.colors.text_dark};
    `};
`;

export const BtnText = styled.Text<IProps>`
    font-size: ${RFValue(12)}px;
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.title};
    
    ${({ enabled }) => enabled == true && css `
        color: #ffffff;
    `};
`;


export const Wrap = styled.View`
    margin-top: ${RFValue(15)}px;
    align-items: center;
    justify-content: center;
    flex: 1;
`;

export const LoadingIcon = styled.ActivityIndicator``;

export const WrapFlatList = styled.View`
    margin-top: ${RFValue(15)}px;
`;