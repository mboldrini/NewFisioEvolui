import { RFValue } from 'react-native-responsive-fontsize';
import styled, {css} from "styled-components/native";

export const Container = styled.View`
    flex-direction: row;
    margin-bottom: ${RFValue(15)}px;
`;

export const Wrap = styled.View`
    flex: 1;
    margin: 0 ${RFValue(15)}px;
`;
