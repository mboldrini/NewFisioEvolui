import React from 'react';
import { Text } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';

import {
    Container,
    Wrap,
    WrapTitle,
    Icone,
    Title,
    Description
} from './styles';

interface IProps{
    title: string,
    description?: string,
    type?: 'success' | 'info' | 'warning' | 'error'
    widt: number,
}

export function ToastCustom({title, description, type = "info", widt}: IProps){

    return(
        <Container tipo={type} widt={widt}>
            <Wrap>
                
                { type === "success" && <Icone>😀</Icone> }
                { type === "warning" && <Icone>⚠️</Icone> }
                { type === "error" && <Icone>❌</Icone> }
                { type === "info" && <Icone>📢</Icone> }

                <WrapTitle>
                    <Title numberOfLines={1} ellipsizeMode="tail">{ title }</Title>
                    <Description numberOfLines={2} ellipsizeMode="tail">{ description }</Description>
                </WrapTitle>
            </Wrap>
        </Container>
    )
}

