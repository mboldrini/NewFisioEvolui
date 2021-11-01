import styled, {css} from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

interface Props{
    type: 'enabled' | 'disabled';
}

export const Container = styled.TouchableOpacity<Props>`

    ${(props) => props.type === 'enabled' && css`
        background-color: ${({theme}) => theme.colors.shape};
    `};

    ${(props) => props.type === 'disabled' && css`
        background-color: ${({theme}) => theme.colors.secondary};
    `};

    width: ${RFValue(110)}px;
    height: ${RFValue(110)}px;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-right: 16px;
    border-width: 1px;
    border-color: ${({theme}) => theme.colors.secondary_light};
`;

export const Icone = styled(FontAwesome5)`
    font-size: ${RFValue(30)}px;
    color: ${({theme}) => theme.colors.text_dark};
    font-family: ${({theme}) => theme.fonts.bold};
`;

export const Titulo = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.text_dark};
    font-size: ${RFValue(14)}px;
    padding-top: 5px;
`;

