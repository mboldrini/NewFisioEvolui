import { RectButton } from 'react-native-gesture-handler';
import styled, {css} from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { FontAwesome5 } from "@expo/vector-icons";
import { DefaultAppValues } from "../../../global/styles/theme";

export const Container = styled.View`
    background-color: ${({theme}) => theme.colors.primary};
    flex: 1;
    flex-direction: column;
`;


export const Iscrol = styled.ScrollView`
    z-index: -1;
    flex-direction: column;
`;

//// CABECALHO
export const ContainerCabecalho = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 0 ${({theme}) => theme.margin.lateral_half}px;
    margin-top: ${RFValue(10)}px ;
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

export const IconeRight = styled(FontAwesome5)`
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(18)}px;

    ${({ name }) => name === "trash" && css `
        color: ${({theme}) => theme.colors.attention};
    `};

    ${({ name }) => name === "plus" && css `
        color: ${({theme}) => theme.colors.success_super};
    `};
`;

export const WrapTitle = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const Titulo = styled.Text`
    font-size: ${RFValue(DefaultAppValues.fontSize.quatro)}px;
    color: ${({theme}) => theme.colors.shape};
    font-family: ${({theme}) => theme.fonts.regular};
    align-items: center;
`;


////  MODAL MENU
export const ViewBtn = styled.TouchableOpacity`
    width: ${RFValue(50)}px;
    height: ${RFValue(50)}px;
    background-color: red; 
`;

export const AreaMenu = styled.View`
    position: absolute;
    background-color: #ffffff;
    top: ${RFValue(15)}px;
    right: ${RFValue(15)}px;
    border-radius: ${RFValue(DefaultAppValues.bordas.padrao)}px;
    border: 2px solid ${({theme}) => theme.colors.text_dark};
`;

export const BtnMenuList = styled.TouchableOpacity`

    justify-content: flex-start;
    flex-direction: row;
    align-items: flex-start;
    padding: 5px;

`;

export const TituloMenu = styled.Text`
    font-family: ${({theme}) => theme.fonts.thin};
    font-size: ${RFValue(DefaultAppValues.fontSize.dois)}px;
`;

export const IconeMenu = styled(FontAwesome5)`
    color: #000000;
    font-size: ${RFValue(DefaultAppValues.fontSize.dois)}px;
    padding: ${RFValue(3)}px;
`;


/// Restante
export const WrapLoadingPctInfos = styled.View`
    flex: 1;
    margin-top: ${RFValue(50)}px;
    align-items: center;
    justify-content: center;
`;
export const LoadingIcon = styled.ActivityIndicator`
    margin: ${RFValue(20)}px 0;
`;

/// FORM
export const Form = styled.View`
    flex: 1;
    margin-top: ${RFValue(10)}px;
`;

export const Fields = styled.View`
`;

export const TitleGroup = styled.View`
    width: 100%;
    margin-bottom: ${RFValue(10)}px;
    flex: 1;
    border-bottom-color: #4EADBE;
    border-bottom-width: 2px;
`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.shape};
    margin: 0 ${RFValue(DefaultAppValues.margin.lateral_half)}px;
    font-size: ${RFValue(14)}px;
`;

export const WrapFooterCadastro = styled.View`
    margin: 0 ${({theme}) => theme.margin.lateral}px;
    margin-bottom: ${RFValue(15)}px;
`;

export const WrapCentro = styled.View`
       /* flex: 1;
    flex-direction: column;
    justify-content: space-between; */
    /* border: 1px solid red; */
`;