import { FontAwesome5 } from "@expo/vector-icons";
import styled, {css} from "styled-components/native";
import { RFValue } from 'react-native-responsive-fontsize';
import theme from "../../../global/styles/theme";

interface Props{
    isActive: boolean;
}


export const Container = styled.TouchableOpacity.attrs({
    activeOpacity: 0.7
})`
    background-color: ${({theme}) => theme.colors.input_background};
    border-radius: ${({theme}) => theme.bordas.padrao}px;
    height: ${RFValue(60)};
    margin: 0 ${({theme}) => theme.padding.lateral}px;
    margin-bottom: ${({theme}) => theme.margin.input_bottom}px;
    padding: 0 20px;
    border-width: 1px;
    border-color: ${({theme}) => theme.colors.input_background};
    border-bottom-width: 1px;
    shadow-color: ${({theme}) => theme.colors.text_dark};
    shadow-offset: {width:0};
    shadow-offset: {height:2px};
    shadow-opacity: 0.8;
    shadow-radius: 5px;
    elevation: 2;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const Category = styled.Text<Props>`

    color: ${({isActive}) => 
        isActive ? '#000000' : theme.colors.secondary 
    };

`;

export const Icon = styled(FontAwesome5)<Props>`
    font-size: ${RFValue(18)}px;
    color: ${({isActive}) => 
        isActive ? '#000000' : theme.colors.secondary_light
    };
`;





