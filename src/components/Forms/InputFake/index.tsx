import React from 'react';

import {
    VW,
    Container,
    Category,
    Icon,
    PlaceHolder
} from './styles';

interface Props{
    title: string;
    onPress: () => void;
    enabled?: boolean;
    placeholder?: string;
}

export function InputFake({title, onPress, enabled, placeholder}: Props){
    return(
        <VW>
            <PlaceHolder>{ placeholder }</PlaceHolder>
            <Container onPress={onPress} enabled={enabled}>
                <Icon name="clock" enabled={enabled}/>
                <Category enabled={enabled} >{title}</Category>
            </Container>    
        </VW>
    )
}





