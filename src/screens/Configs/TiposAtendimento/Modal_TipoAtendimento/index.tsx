import React from 'react';
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
import { InputForm } from '../../../../components/Forms/InputForm';
import { InputMasked } from '../../../../components/Forms/InputMasked';

interface Props{
    visible: boolean;
    closeModal: () => void;
    id?: number
}

const schema = Yup.object().shape({
    nome: Yup.string().required("Nome é obrigatório"),
})

export function Modal_TipoAtendimento({ visible, closeModal, id }: Props){

    const { control, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(schema) });


    return(
    <Modal isVisible={visible} animationIn='slideInUp' animationOut='slideOutDown' animationInTiming={700} style={{width: '100%', margin: 0}}>
        <Container>

            <Cabecalho_Modal  titulo='Tipo de Atendimento' onPress={() => closeModal() } />

            <Body>

                <InputForm 
                    name="nome"
                    control={control}
                    placeholder="Nome"
                    autoCapitalize="words"
                    autoCorrect={false}
                    error={errors.nome && errors.nome.message}
                />

                <InputMasked 
                    name="cpf"
                    control={control}
                    placeholder="CPF"
                    error={errors.cpf && errors.cpf.message}
                    keyboardType="number-pad"
                    type="money"
                />


            </Body>

            <Footer_Modal onPressOk={()=> console.log("pressionou OK")} onPressCancel={()=> { console.log("pressinou CANcel")}}/>

        </Container>
    </Modal>
    )
}