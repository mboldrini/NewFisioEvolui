import React from 'react';

import {
    Container,
    Category,
    Icon
} from './styles';

interface Props{
    isActive: boolean;
    title: string;
    onPress: () => void;
}

export function Select({title, isActive, onPress}: Props){
    return(
        <Container onPress={onPress}>
            <Category isActive={isActive}>{title}</Category>
            <Icon isActive={isActive} name="chevron-down" />
        </Container>
    )
}





