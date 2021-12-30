import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from "styled-components/native";
import { FontAwesome5 } from '@expo/vector-icons';
import theme from '../../global/styles/theme';
import { RectButton } from "react-native-gesture-handler";


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
    elevation: 3;
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
    padding-bottom: ${RFValue(15)}px;
    padding-top: ${RFValue(25)}px;
    margin-bottom: ${RFValue(15)}px;
    margin-top: ${RFValue(-15)}px;
    border-bottom-left-radius: ${RFValue(20)}px;
    border-bottom-right-radius: ${RFValue(20)}px;
    elevation: 2;
`;

export const Infos = styled.View`
    align-items: center;
    justify-content: center;
`;

export const QtdInfos = styled.Text`
    font-family: ${({theme}) => theme.fonts.bold};
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(20)}px;
`;

export const InfoDesc = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(18)}px;
`;

export const Body = styled.ScrollView.attrs({
    vertical: true,
    showsHorizontalScrollIndicator:false,
    contentContainerStyle:{
        paddingHorizontal: 24 ,
    }
})`
    flex: 1;
`;

export const WrapArea = styled.View`
    background-color: ${({theme}) => theme.colors.secondary};
    border-radius: ${({theme}) => theme.bordas.padrao}px;
    flex: 1;
`;

export const Linha = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    margin: ${RFValue(5)}px;
`;

export const Btn = styled(RectButton)`
    flex: 1;
    align-items: center;
    justify-content: center;
    margin: 0 5px;
    border-radius: ${RFValue(15)}px;
`;

export const Icone = styled.Image`
    /* color: #ffffff;
    font-size: ${RFValue(30)}px;
    padding-top: ${RFValue(10)}px; */
    width: ${RFValue(50)}px;
    height: ${RFValue(50)}px;
`;

export const Titulo = styled.Text`
    font-family: ${({theme}) => theme.fonts.bold};
    font-size: ${RFValue(16)}px;
    color: #ffffff;
    padding-top: ${RFValue(10)}px;
`;
