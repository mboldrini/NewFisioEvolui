import React, {useState, useEffect} from 'react';
import Modal from 'react-native-modal';
import { Cabecalho_Modal } from '../../../../components/Cabecalho_Modal';
import { Footer_Modal } from '../../../../components/Footers/Footer_Modal';
import { 
    Container,
    Body,
 
} from './styles';
/// Forms
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';


interface Props{
    visible: boolean;
    closeModal: () => void;
    id?: number
}

const schema = Yup.object().shape({
    nome: Yup.string().required("Nome é obrigatório"),
});



export function Modal_ListarFormasPagamento({ visible, closeModal, id }: Props){

    const { control, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(schema) });


    return(
    <Modal isVisible={visible} animationIn='slideInUp' animationOut='slideOutDown' animationInTiming={700} style={{width: '100%', margin: 0}}>
        <Container>

            <Cabecalho_Modal  titulo='Listar formas de pagamento' onPress={()=> { closeModal() }} />

            <Body>


                

             


            </Body>

            <Footer_Modal onPressOk={()=> console.log("pressionou OK")} onPressCancel={()=> { closeModal() }}/>

        </Container>
    </Modal>
    )
}