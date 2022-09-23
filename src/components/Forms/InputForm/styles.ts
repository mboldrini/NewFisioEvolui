import { RFValue } from 'react-native-responsive-fontsize';
import styled, {css} from "styled-components/native";
import { DefaultAppValues } from '../../../global/styles/theme';

interface IHasError{
    hasErr: string;
}

export const Container = styled.View`
    width: 100%;
`;

export const PHolder = styled.Text<IHasError>`
    color: #ffffff;
    font-size: ${RFValue(12)}px;
    padding-left: ${RFValue(DefaultAppValues.padding.lateral_half)}px;

    
    ${({ hasErr }) => hasErr && css `
        color: #f00;
    `};
`;