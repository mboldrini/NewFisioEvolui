import React from 'react';
import styled from 'styled-components/native';
import {StyleSheet} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const Container = styled.SafeAreaView`
    background-color: ${({theme}) => theme.colors.primary };
    flex: 1;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`;

export const Photo = styled.Image`
    width: ${RFValue(180)}px;
    height: ${RFValue(180)}px;
    border-radius: 10px;
    margin-bottom: ${RFValue(15)}px;
`;

export const LoadingIcon = styled.ActivityIndicator``;

export const Texto = styled.Text`
    font-size: ${RFValue(25)}px;
    margin-top: ${RFValue(30)}px;
    color: ${({theme}) => theme.colors.text_dark};
    font-weight: bold;
    justify-content: flex-end;
`;
