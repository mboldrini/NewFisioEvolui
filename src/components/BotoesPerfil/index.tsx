import React from 'react';

import {
    Container,
    AreaIcone,
    Icone,
    Titulo
} from './styles';

interface Props{
    icone: string,
    titulo: string;
}

export function BotoesPerfil({
    icone,
    titulo
}: Props){
    return(
        <Container>
            <AreaIcone>
                <Icone name={icone}/>
            </AreaIcone>
            <Titulo>{titulo}</Titulo>
        </Container>
    )
}

