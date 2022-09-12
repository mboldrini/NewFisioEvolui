import React from "react";
import { Button } from "../../Buttons/Button/Index";

import {
    Container,
    Wrap,
} from './styles';

interface IProps{
    onPressOk?: () => void;
    onPressCancel: () => void;
}

export function Footer_Modal({ onPressOk, onPressCancel }: IProps){
    return(
        <Container>
            { onPressOk &&
            <Wrap>
                <Button title="Salvar" type="ok"onPress={onPressOk} />
            </Wrap>
            }
           
            <Wrap>
                <Button title="Cancelar" type="cancel"onPress={onPressCancel} />
            </Wrap>
        </Container>
    )
}

