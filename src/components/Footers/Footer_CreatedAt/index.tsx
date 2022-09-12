import React from "react";
import { Button } from "../../Buttons/Button/Index";
import { format } from 'date-fns';

import {
    Container,
    Wrap,
    TitleBold,
    TitleThin
} from './styles';

interface IProps{
    created_at: string;
    updated_at: string;
}

export function Footer_CreatedAt({ created_at, updated_at }: IProps){
    return(
        <Container>
            <Wrap>
                <TitleBold>Criado em: <TitleThin>{ format(new Date(created_at), 'dd/MM/yyyy - HH:mm') }</TitleThin></TitleBold>
            </Wrap>

        { updated_at !== created_at &&
            <Wrap>
                <TitleBold>Atualizado em: <TitleThin>{ format(new Date(updated_at), 'dd/MM/yyyy - HH:mm') }</TitleThin></TitleBold>
            </Wrap>
        }
        </Container>
    )
}

