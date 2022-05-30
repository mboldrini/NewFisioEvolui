import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { TouchableOpacityProps } from 'react-native';
import {
    Container,
    WrapTitle,
    Title,
    LeftIcon,
    RightIcon,
} from './styles';

interface Props extends TouchableOpacityProps{
    title: string;
    type?: 'ok' | 'cancel';
    onPress: () => void;
    largura?: 'half' | 'full';
    leftIcon?: string;
    rightIcon?: string;
}

export function Button({title, type, onPress, largura, leftIcon, rightIcon, ...rest}: Props){
    return(
        <Container onPress={onPress} {...rest} type={type} largura={largura}>
            {leftIcon && <LeftIcon name="arrow-left" />}
            <WrapTitle>
                <Title type={type}> { title } </Title>
            </WrapTitle>
            {rightIcon && <RightIcon name="arrow-right" /> }
        </Container>
    );
}

