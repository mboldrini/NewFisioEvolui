import React from 'react';

import {
    Container,
    Icone,
    Titulo
} from './styles';

interface Props{
    icone: string,
    titulo: string;
    type: 'enabled' | 'disabled';
}

export function HighlightCard({
    icone,
    titulo, 
    type
}: Props){
    return(
        <Container type={type}>
            <Icone name={icone}/>
            <Titulo>{titulo}</Titulo>
        </Container>
    )
}

