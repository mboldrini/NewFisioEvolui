import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from "styled-components/native";
import { FontAwesome5 } from '@expo/vector-icons';
import theme, { DefaultAppValues } from '../../../global/styles/theme';
import { RectButton } from "react-native-gesture-handler";


export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.primary};
`;

export const WrapCentral = styled.View`
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
`;

export const WrapItens = styled.View`
    margin: 0 ${({theme}) => theme.margin.lateral_half}px;
    margin-top: ${RFValue(15)}px;
`;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: ${RFValue(150)}px;
`;

export const Wrap = styled.View`
    flex: 1;

`;

export const ContentCreated = styled.View`
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-top-width: 1px;
    border-top-color: ${({theme}) => theme.colors.secondary};
    margin: 0 ${({theme}) => theme.margin.lateral_half}px;
    margin-top: ${RFValue(10)}px;
    padding-top: ${RFValue(5)}px;
`;

export const WrapCreated = styled.View`
    flex-direction: row;
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const TitleCreated = styled.Text`
    font-family: ${({theme}) => theme.fonts.thin};
    font-size: ${RFValue(13)}px;
    color: #1A1A1A;
`;

export const DateCreated = styled.Text`
    font-family: ${({theme}) => theme.fonts.thin};
    font-size: ${RFValue(13)}px;
    color: #1A1A1A;
`;

export const WrapFooterCadastro = styled.View`
    margin: 0 ${({theme}) => theme.margin.lateral_half}px;
    margin-bottom: ${({theme}) => theme.margin.lateral_half}px;
    margin-top: ${RFValue(10)}px;
`;

export const WrapExpandTitle = styled.View`
    flex-direction: row;
    margin: 0 ${({theme}) => theme.margin.lateral_half}px;
    justify-content: space-between;
    border-bottom-width: 1px;
    border-bottom-color: ${({theme}) => theme.colors.secondary};
    margin-bottom: ${({theme}) => theme.margin.bottom}px;
    margin-top: ${RFValue(10)}px;
`;

export const ExpandableTitle = styled.Text`
    font-family: ${({theme}) => theme.fonts.bold};
    color: #ffffff;
    font-size: ${RFValue(DefaultAppValues.fontSize.dois)}px;
`;

export const WrapGroup = styled.View`
    background-color: ${({theme}) => theme.colors.secondary};
    margin: 0 ${({theme}) => theme.margin.lateral_half}px;
    border-radius: ${({theme}) => theme.bordas.padrao}px;
    margin-bottom: ${({theme}) => theme.margin.bottom}px;
    padding: 0 ${({theme}) => theme.padding.lateral_half}px;
    padding-top: ${RFValue(5)}px;
    /* padding: ${RFValue(10)}px ${({theme}) => theme.padding.lateral_half}px; */
`;

export const Spacer = styled.View`
    width: 100%;
    border-bottom-color: ${({theme}) => theme.colors.primary};
    border-bottom-width: 1px;
`;

export const Title = styled.Text`
    font-size: ${RFValue(DefaultAppValues.fontSize.dois)}px;
    font-family: ${({theme}) => theme.fonts.bold};
    color: ${({theme}) => theme.colors.shape};
`;



