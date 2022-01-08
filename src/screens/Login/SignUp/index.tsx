import React, { useEffect, useState } from 'react';
import { Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { InputMasked } from '../../../components/Forms/InputMasked';
import { useForm } from 'react-hook-form';
import { InputForm } from '../../../components/Forms/InputForm';
import { Button } from '../../../components/Forms/Button/Index';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { 
    Container,
    Header,
    Title,
    Greetings,
    Name,
    Message,
    Form,
    Fields,
    WrapFooterCadastro
} from './styles';


interface FormData{
    nome: string,
    sobrenome: string,
    crefito: string,
    celular: string,
}

const schema = Yup.object().shape({
    nome: Yup.string().required("Nome é obrigatório"),
    sobrenome: Yup.string().required("Sobrenome é obrigatório"),
    celular: Yup.string().required("Telefone de contato é obrigatório"),
    crefito: Yup.string().required("CREFITO é obrigatório"),
})

export function SignUp(){

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });


    function handleRegister(form: FormData){

        const data = {
            nome: form.nome,
            sobrenome: form.sobrenome,
            crefito: form.crefito,
            celular: form.celular,
        }
        console.log(data);
        alert(JSON.stringify(data));
     
    }



    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
            <Header>
                <Title>
                    <Greetings>Olá, </Greetings>
                    <Name>Matheus!</Name>
                </Title>
                <Message>Antes de criar sua conta, preciso que nos forneça algumas informações básicas sobre você!</Message>
            </Header>

            <Form >
                <Fields>

                    <InputForm 
                        name="nome"
                        control={control}
                        placeholder="Nome"
                        autoCapitalize="words"
                        autoCorrect={false}
                        error={errors.nome && errors.nome.message}
                    />

                    <InputForm 
                        name="sobrenome"
                        control={control}
                        placeholder="Sobrenome"
                        autoCapitalize="words"
                        autoCorrect={false}
                        error={errors.sobrenome && errors.sobrenome.message}
                    />

                    <InputForm 
                        name="crefito"
                        control={control}
                        placeholder="CREFITO"
                        autoCorrect={false}
                        error={errors.crefito && errors.crefito.message}
                    />

                    <InputMasked
                        name="celular"
                        control={control}
                        placeholder="Celular"
                        error={errors.celular && errors.celular.message}
                        type="cel-phone"
                        options={{
                            maskType: 'BRL',
                            withDDD: true,
                            dddMask: '(99) '
                        }}
                    /> 
                    
                </Fields>

                <WrapFooterCadastro>
                    <Button 
                        title="Criar" 
                        type="ok"
                        onPress={handleSubmit((d) => handleRegister(d))}
                    />
                </WrapFooterCadastro>

            </Form>

        </Container>
        </TouchableWithoutFeedback>
    )
}