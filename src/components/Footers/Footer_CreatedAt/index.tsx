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

    function FormataHora(datetime: string){
        const [data, tempo] = datetime.split(" ");

        const [dia, mes, ano] = data.split("/");
        const [hora, minuto, segundo] = tempo.split(":");

        return format( new Date( parseInt(ano), parseInt(mes), parseInt(dia), parseInt(hora), parseInt(minuto) ), 'dd/MM/yyyy - HH:mm');
    }

    return(
        <Container>
            <Wrap>
                <TitleBold>Criado em: <TitleThin>{ FormataHora(created_at) }</TitleThin></TitleBold>
            </Wrap>

        { updated_at !== created_at &&
            <Wrap>
                <TitleBold>Atualizado em: <TitleThin>{ FormataHora(updated_at) }</TitleThin></TitleBold>
            </Wrap>
        }
        </Container>
    )
}

