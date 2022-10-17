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
    type?: 'success' | 'info' | 'warning' | 'error';
}

export function ToastCustom({title, description, type = "info"}: IProps){

    return(
        <Container tipo={type}>
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

