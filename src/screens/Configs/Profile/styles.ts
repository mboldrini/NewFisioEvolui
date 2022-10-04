import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled, {css} from 'styled-components/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { RectButton } from "react-native-gesture-handler";

interface Props{
    enabled?: boolean;
}

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.primary};
`;

export const Header = styled.View`
    width: 100%;
    height: ${RFPercentage(18)}px;
    background-color: ${({theme}) => theme.colors.primary};
    justify-content: center;
    align-items: flex-start;
    flex-direction: row;
    border-bottom-left-radius: ${RFValue(20)}px;
    border-bottom-right-radius: ${RFValue(20)}px;
    z-index: 2;
`;

export const UserWrapper = styled.View`
    width: 100%;
    padding: 0 24px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: ${RFValue(40)}px;
`;

export const UserInfo = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Photo = styled.Image`
    width: ${RFValue(52)}px;
    height: ${RFValue(52)}px;
    border-radius: ${({theme}) => theme.bordas.padrao}px;
`;

export const User = styled.View`
    margin-left: 17px;
`;

export const UserGreeting = styled.Text`
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(18)}px;
    font-family: ${({theme}) => theme.fonts.regular};
`;

export const UserName = styled.Text`
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(20)}px;
    font-family: ${({theme}) => theme.fonts.bold};
`;

export const AreaLogout = styled.TouchableOpacity``;

export const Logout = styled.Image`
    width: ${RFValue(28)}px;
    height: ${RFValue(28)}px;
`;

export const InfosWrap = styled.View`
    background-color: ${({theme}) => theme.colors.secondary};
    align-items: center;
    justify-content: space-around;
    flex-direction: row;
    padding: 0 ${({theme}) => theme.margin.lateral}px;
    margin-top: ${RFValue(-15)}px;
    padding-top: ${RFValue(20)}px;
    padding-bottom: ${RFValue(5)}px;
    border-bottom-left-radius: ${RFValue(20)}px;
    border-bottom-right-radius: ${RFValue(20)}px;
    /* elevation: -2; */
    z-index: 1;
`;

export const Infos = styled.View`
    align-items: center;
    justify-content: center;
`;

export const Quantidade = styled.Text`
    font-family: ${({theme}) => theme.fonts.bold};
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(12)}px;
`;

export const InfoDesc = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(12)}px;
`;

export const Body = styled.ScrollView.attrs({
    vertical: true,
    showsHorizontalScrollIndicator:false,
    contentContainerStyle:{
        paddingHorizontal: 10,
    }
})`
    flex: 1;
    margin-top: ${RFValue(10)}px;
`;

export const BtnList = styled.TouchableOpacity<Props>`
    margin-bottom: ${RFValue(5)}px;
    width: 100%;
    /* background-color: ${({theme}) => theme.colors.shape}; */
    /* border-radius: ${({theme}) => theme.bordas.padrao}px; */
    border-bottom-color: #4EADBE;
    border-bottom-width: 1px;
    padding: ${RFValue(5)}px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${RFValue(5)}px;

`;

export const WrapIcone = styled.View`
    /* min-width: ${RFValue(30)}px; */
    align-items: center;
    justify-content: center;
`;

export const Icone = styled(FontAwesome5)<Props>`
    color: #ffffff;
    font-size: ${RFValue(16)}px;
    align-items: center;
    justify-content: center;

    ${({ enabled }) => enabled == false && css `
        color: #4EADBE;
    `};
`;

export const TituloList = styled.Text<Props>`
    font-family: ${({theme}) => theme.fonts.bold};
    font-size: ${RFValue(12)}px;
    color: #ffffff;
    align-items: center;
    justify-content: center;

    ${({ enabled }) => enabled == false && css `
        color: #4EADBE;
    `};
`;

