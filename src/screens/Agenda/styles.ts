import styled, {css} from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { FontAwesome5 } from "@expo/vector-icons";
import theme from "../../global/styles/theme";

interface PropsDiaEscolhido{
    diaEscolhido: string;
    diaHoje: string;
}

export const Container = styled.ScrollView`
    flex: 1;
    background-color: ${({theme}) => theme.colors.primary};
`;

export const Header = styled.View`
    align-items: center;
    justify-content: center;
    margin-top: ${RFValue(35)}px ;
    margin-bottom: ${RFValue(10)}px;
    padding: 0 ${({theme}) => theme.padding.lateral}px;
`;

export const Titulo = styled.Text`
    font-size: ${RFValue(22)}px;
    color: #ffffff;
    font-family: ${({theme}) => theme.fonts.regular};
`;

export const DateWrapper = styled.View`
    background-color: ${({theme}) => theme.colors.shape };
    margin: 0px ${({theme }) => theme.margin.lateral}px;
    border-radius: ${({theme}) => theme.bordas.padrao}px;
    padding: ${({theme}) => theme.padding.superior}px 0px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: ${({theme}) => theme.margin.bottom}px;
    border-width: 1;
    border-color: #f5f5f5;
    border-bottom-width: 1;
    shadow-color: #000;
    shadow-offset: {width: 0, height: 2};
    shadow-opacity: 0.8;
    shadow-radius: 1px;
    elevation: 1;
`;

export const Today = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
    padding: ${({theme}) => theme.padding.superior}px ${RFValue(10)}px;
    border-color: #f5f5f5;
    border-bottom-width: 1;
    margin-bottom: ${({theme}) => theme.margin.bottom};
`;

export const SelectDateWrapper = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 5px;
`;

export const IconeChangeMonth = styled(FontAwesome5)`
    font-size: 30px;
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
    padding-top: 2px;
    font-family: ${({theme}) => theme.fonts.bold};
    font-size: ${RFValue(18)}px;
    align-items: center;
    justify-content: center;
`;

export const DateList = styled.ScrollView.attrs({
    horizontal:true,
    showsHorizontalScrollIndicator:false,
    contentContainerStyle: { paddingHorizontal: 5 }
})`
    padding-bottom: ${RFValue(5)}px;
`;

export const DateItem = styled.TouchableOpacity<PropsDiaEscolhido>`
    width: ${RFValue(45)}px;
    justify-content: center;
    align-items: center;
    border-radius: ${({theme}) => theme.bordas.padrao}px;
    margin: 0 2px;
`;

export const DateItemWeekDay = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(16)}px;
`;
export const DateItemWeekNumber = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(16)}px;
`;

