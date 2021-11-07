import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from "styled-components/native";
import { Ionicons } from '@expo/vector-icons';


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
`;

export const UserWrapper = styled.View`
    width: 100%;
    padding: 0 24px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: ${RFValue(40)};
`;

export const UserInfo = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Photo = styled.Image`
    width: ${RFValue(48)}px;
    height: ${RFValue(48)}px;
    border-radius: ${({theme}) => theme.bordas.padrao};
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
    font-size: ${RFValue(18)}px;
    font-family: ${({theme}) => theme.fonts.bold};
`;

export const AreaLogout = styled.TouchableOpacity``;

export const Logout = styled(Ionicons)`
    color: ${({theme}) => theme.colors.attention};
    font-size: ${RFValue(24)}px;
`;

export const HighlightCards = styled.ScrollView.attrs({
    vertical: true,
    showsHorizontalScrollIndicator:false,
    contentContainerStyle:{
        paddingHorizontal: 24 ,
    }
})`
    width: 100%;
`;

export const WrapperGroup = styled.View`
    background-color: ${({theme}) => theme.colors.secondary};
    padding: 0 ${RFValue(10)}px;
    padding-top: ${RFValue(10)}px;
    margin-bottom: ${({theme}) => theme.margin.bottom};
    border-radius: ${({theme}) => theme.bordas.padrao};
`;

export const Body = styled.View`
    flex: 1;
    padding-top: ${RFValue(20)}px;
`;

