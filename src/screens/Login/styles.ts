import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    background-color: #63C2D1;
    flex: 1;
    justify-content:center;
    align-items: center;
`;

export const WrapLogo = styled.View`
    margin-bottom: ${RFValue(10)}px;
`;

export const Photo = styled.Image`
    width: ${RFValue(180)}px;
    height: ${RFValue(180)}px;
    margin-bottom: ${RFValue(15)}px;
`;

export const WrapInput = styled.View`
`;

export const LoadingIcon = styled.ActivityIndicator``;
