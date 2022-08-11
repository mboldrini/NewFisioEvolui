import styled, {css} from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { FontAwesome5 } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";

interface IDelExist{
    exist: boolean;
}

interface IIconName{
    name?: string;
}

interface ITopo{
    arrowSide: string;
}

export const Container = styled.View<ITopo>`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 0 ${({theme}) => theme.margin.lateral_half}px;
    margin-top: ${RFValue(10)}px ;

    ${({ arrowSide }) => arrowSide === "chevron-down" && css `
        margin-top: ${RFValue(10)}px ;
    `};

`;

export const WrapLeft = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
`;

export const WrapIcon = styled(RectButton)`
    padding: ${RFValue(5)}px;
`;

export const IconeLeft = styled(FontAwesome5)`
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(20)}px;
    margin-right: ${RFValue(15)}px;
`;

export const IconeRight = styled(FontAwesome5)<IIconName>`
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(18)}px;

    ${({ name }) => name === "trash" && css `
        color: ${({theme}) => theme.colors.attention};
    `};

    ${({ name }) => name === "plus" && css `
        color: ${({theme}) => theme.colors.success_super};
    `};
`;

export const WrapTitle = styled.View<IDelExist>`
    flex: 1;
    align-items: center;
    justify-content: center;

    ${({ exist }) => exist == false && css `
        margin-right: ${RFValue(28)}px;
    `};

`;

export const Titulo = styled.Text`
    font-size: ${RFValue(20)}px;
    color: ${({theme}) => theme.colors.shape};
    font-family: ${({theme}) => theme.fonts.regular};
    align-items: center;
`;





