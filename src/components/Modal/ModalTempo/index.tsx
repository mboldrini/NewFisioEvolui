import React, { useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import { Cabecalho_Modal } from '../../Cabecalho_Modal';
import { Footer_Modal } from '../../Footers/Footer_Modal';
import { 
    Container,
    Body,
    Bloco,
    Coluna,
    Dot,
    Setas,
    Campo,
    Icone,
} from './styles';
/// Forms
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { InputHour } from '../../Forms/InputHour';
import { WrapIcon } from '../../Cabecalho/styles';

interface Props{
    visible: boolean;
    closeModal: () => void;
}

const schema = Yup.object().shape({
    nome: Yup.string().required("Nome é obrigatório"),
})

export function Modal_Tempo({ visible, closeModal }: Props){

    const [hora, setHora] = useState('00');
    const [minuto, setMinuto] = useState('30');

    useEffect(()=>{
        CorrectMinutos(minuto);
    }, [minuto]);

    function SetHoras( sentido: string ){
        let horas = parseInt(hora);
        if( sentido == 'up'){
            if(horas < 8) horas += 1;
        }else{
            if(horas > 0) horas -= 1;
        }
        setHora("0"+ horas );
    }

    function SetMinutos( sentido: string ){
        let min = parseInt(minuto);
        console.log("Min Atual: " + min);
        if( sentido == 'up'){
            if(min < 60) min += 1;
        }else{
            if(min > 1) min -= 1;
        }
        setMinuto(min +"");
    }

    function CorrectMinutos(minStr: string){
        let min = parseInt(minuto);
        if(min > 60){
            min = 60;
            setMinuto(min +"");
            return;
        } 
        if(min < 1){
            min = 1;
            setMinuto(min +"");
            return;
        } 
    }

    return(
    <Modal isVisible={visible} animationIn='slideInUp' animationOut='slideOutDown' animationInTiming={700} style={{width: '100%', margin: 0}}>
        <Container>

            <Cabecalho_Modal  titulo='Duração do Atendimento' onPress={() => closeModal() } />

            <Body>

                <Bloco>
                    <Coluna>
                        <Setas>
                            <WrapIcon onPress={() => SetHoras('up')}>
                                <Icone name="chevron-up"/>
                            </WrapIcon>
                        </Setas>
                        <Campo>
                            <InputHour 
                                value={hora}
                                onChangeText={ setHora }
                                keyboardType="number-pad"
                                type="custom"
                                options={{
                                    mask: '99'
                                }}
                            />
                        </Campo>
                        <Setas>
                            <WrapIcon onPress={() => SetHoras('down')}>
                                <Icone name="chevron-down"/>
                            </WrapIcon>
                        </Setas>
                    </Coluna>

                    <Dot>:</Dot>

                    <Coluna>
                        <Setas>
                            <WrapIcon onPress={() => SetMinutos('up')}>
                                <Icone name="chevron-up"/>
                            </WrapIcon>
                        </Setas>
                        <Campo>
                            <InputHour 
                                value={minuto}
                                onChangeText={ setMinuto }
                                keyboardType="number-pad"
                                type="custom"
                                options={{
                                    mask: '99'
                                }}
                            />
                        </Campo>
                        <Setas>
                            <WrapIcon  onPress={() => SetMinutos('down')}>
                                <Icone name="chevron-down"/>
                            </WrapIcon>
                        </Setas>
                    </Coluna>
                </Bloco>

            </Body>

            <Footer_Modal onPressOk={()=> console.log("pressionou OK")} onPressCancel={()=> { console.log("pressinou CANcel")}}/>

        </Container>
    </Modal>
    )
}