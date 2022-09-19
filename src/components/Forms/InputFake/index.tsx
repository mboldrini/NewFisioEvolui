import React from 'react';

import {
    Container,
    Category,
    Icon
} from './styles';

interface Props{
    title: string;
    onPress: () => void;
    enabled?: boolean;
}

export function InputFake({title, onPress, enabled}: Props){
    return(
        <Container onPress={onPress} enabled={enabled}>
            <Icon name="clock" enabled={enabled}/>
            <Category enabled={enabled} >{title}</Category>
        </Container>
    )
}





