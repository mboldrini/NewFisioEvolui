import styled, {css} from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { FontAwesome5 } from "@expo/vector-icons";

export const Container = styled.ScrollView`
    flex: 1;
    background-color: ${({theme}) => theme.colors.primary};
`;

export const WrapGroup = styled.View`
    background-color: ${({theme}) => theme.colors.secondary};
    margin: 0 ${({theme}) => theme.margin.lateral}px;
    border-radius: ${({theme}) => theme.bordas.padrao}px;
    margin-bottom: ${({theme}) => theme.margin.bottom}px;
    padding: ${RFValue(10)}px ${({theme}) => theme.padding.lateral_half}px;
`;

export const Title = styled.Text`
    font-size: ${RFValue(16)}px;
    font-family: ${({theme}) => theme.fonts.bold};
    color: ${({theme}) => theme.colors.shape};
`;

export const WrapInfo = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin: 5px 0;
    padding-bottom: ${RFValue(3)}px;
`;

export const Spacer = styled.View`
    width: 100%;
    border-bottom-color: ${({theme}) => theme.colors.primary};
    border-bottom-width: 1px;
`;

export const Icone = styled(FontAwesome5)`
    font-size: ${RFValue(28)}px;
    color: ${({theme}) => theme.colors.shape};
    min-width: ${RFValue(37)}px;
`;

export const InfoArea = styled.View`
    margin-left: ${RFValue(10)}px;
`;

export const Description = styled.Text`
    color: ${({theme}) => theme.colors.shape};
    font-family: ${({theme}) => theme.fonts.thin};
    font-size: ${RFValue(13)}px;
`;

export const Info = styled.Text`
    flex: 1;
    color: ${({theme}) => theme.colors.shape};
    font-family: ${({theme}) => theme.fonts.bold};
    font-size: ${RFValue(13)}px;
    padding-right: ${RFValue(15)}px;
`;

export const InfoTexto = styled.Text`
    color: ${({theme}) => theme.colors.shape};
    font-family: ${({theme}) => theme.fonts.bold};
    font-size: ${RFValue(13)}px;
    padding-right: ${RFValue(15)}px;
    max-width: 97%;
`;

export const WrapLoadingPctInfos = styled.View`
    flex: 1;
    margin-top: ${RFValue(50)}px;
    align-items: center;
    justify-content: center;
`;

export const WrapAnimation = styled.View`
    flex: 1;
    width: 100%;
    height: ${RFValue(200)}px;
`;

export const TextLoadingPctInfos = styled.Text`
    font-size: ${RFValue(20)}px;
    font-family: ${({theme}) => theme.fonts.bold};
    color: ${({theme}) => theme.colors.text_dark}
`;

export const DateWrapper = styled.View`
    background-color: ${({theme}) => theme.colors.background };
    /* margin: 0px ${({theme }) => theme.margin.lateral}px; */
    border-radius: ${({theme}) => theme.bordas.padrao}px;
    padding: ${({theme}) => theme.padding.superior}px 0px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: ${({theme}) => theme.margin.bottom}px;
    border-width: 1px;
    border-color: #f5f5f5;
    border-bottom-width: 1px;
    shadow-color: #000;
    shadow-offset: {width: 0px};
    shadow-offset: {height: 2px};
    shadow-opacity: 0.8;
    shadow-radius: 1px;
    elevation: 1;
`;

export const Today = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
    /* padding: ${({theme}) => theme.padding.superior}px ${RFValue(10)}px; */
    border-color: #f5f5f5;
    border-bottom-width: 1px;
`;

export const SelectDateWrapper = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: ${RFValue(5)}px;
`;

export const IconeChangeMonth = styled(FontAwesome5)`
    font-size: ${RFValue(30)}px;
    justify-content: center;
    align-items: center;
`;

export const ChangeMonthLeft = styled.TouchableOpacity`
    flex: 1;
    align-items: flex-end;
    justify-content: center;
`;

export const ChangeMonthRight = styled.TouchableOpacity`
    flex: 1;
    align-items: flex-start;
    justify-content: center;
`;

export const Month = styled.Text`
    padding: 0 ${RFValue(10)}px;
    padding-top: ${RFValue(2)}px;
    font-family: ${({theme}) => theme.fonts.bold};
    font-size: ${RFValue(18)}px;
    align-items: center;
    justify-content: center;
`;

