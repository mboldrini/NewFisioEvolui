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
    Titulo,
    Form,
    Fields,
    WrapFooterCadastro
} from './styles';

import { ButtonSimple } from '../../../components/Forms/ButtonSimple/Index';

interface FormData{
    nome: string,
    dataNascimento: number,
    cpf: number,
    celular: number,
    email: string,
    endereco: string,
  //  tipoComorbidade: string;
}

const schema = Yup.object().shape({
    nome: Yup.string().required("Nome é obrigatório"),
    dataNascimento: Yup.string().required("Data de Nascimento é obrigatório").length(10, "Formato de data: 00/00/0000"),
    cpf: Yup.string().required("CPF é obrigatório").length(14, "CPF deve ter 11 dígitos"),
    celular: Yup.string().required("Telefone de contato é obrigatório"),
    email: Yup.string().required("Email é obrigatório"),
    endereco: Yup.string().required("Endereço é obrigatório"),
    // tipoComorbidade: Yup.string().optional()
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

        // if(temComorbidade.key == 0){
        //     form.tipoComorbidade = null
        // }

        const data = {
            nome: form.nome,
            dataNascimento: form.dataNascimento,
            cpf: form.cpf,
            celular: form.celular,
            email: form.email,
            endereco: form.endereco,
        }
        console.log(data);
        alert(JSON.stringify(data));
     
    }



    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
            <Header>
                <Titulo>Cadastrar Paciente</Titulo>
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
                            error={errors.nome && errors.nome.message}
                        />

                        <InputForm 
                            name="email"
                            control={control}
                            placeholder="E-mail"
                            autoCorrect={false}
                            error={errors.email && errors.email.message}
                        />
                            <InputForm 
                            name="email"
                            control={control}
                            placeholder="E-mail"
                            autoCorrect={false}
                            error={errors.email && errors.email.message}
                        />
                            <InputForm 
                            name="email"
                            control={control}
                            placeholder="E-mail"
                            autoCorrect={false}
                            error={errors.email && errors.email.message}
                        />
                            <InputForm 
                            name="email"
                            control={control}
                            placeholder="E-mail"
                            autoCorrect={false}
                            error={errors.email && errors.email.message}
                        />
                            <InputForm 
                            name="email"
                            control={control}
                            placeholder="E-mail"
                            autoCorrect={false}
                            error={errors.email && errors.email.message}
                        />
                            <InputForm 
                            name="email"
                            control={control}
                            placeholder="E-mail"
                            autoCorrect={false}
                            error={errors.email && errors.email.message}
                        />
                            <InputForm 
                            name="email"
                            control={control}
                            placeholder="E-mail"
                            autoCorrect={false}
                            error={errors.email && errors.email.message}
                        />
                            <InputForm 
                            name="email"
                            control={control}
                            placeholder="E-mail"
                            autoCorrect={false}
                            error={errors.email && errors.email.message}
                        />
                            <InputForm 
                            name="email"
                            control={control}
                            placeholder="E-mail"
                            autoCorrect={false}
                            error={errors.email && errors.email.message}
                        />
                            <InputForm 
                            name="email"
                            control={control}
                            placeholder="E-mail"
                            autoCorrect={false}
                            error={errors.email && errors.email.message}
                        />
                            <InputForm 
                            name="email"
                            control={control}
                            placeholder="E-mail"
                            autoCorrect={false}
                            error={errors.email && errors.email.message}
                        />


                        {/* <InputMasked 
                            name="cpf"
                            control={control}
                            placeholder="CPF"
                            error={errors.cpf && errors.cpf.message}
                            keyboardType="number-pad"
                            type="cpf"
                        />

                        <InputMasked
                            name="dataNascimento"
                            control={control}
                            placeholder="Data de Nascimento"
                            keyboardType="number-pad"
                            error={errors.dataNascimento && errors.dataNascimento.message}
                            type="datetime"
                            options={{
                                format: 'DD/MM/YYYY'
                            }}
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

                        <InputForm 
                            name="email"
                            control={control}
                            placeholder="E-mail"
                            autoCorrect={false}
                            error={errors.email && errors.email.message}
                        />

                        
                        <InputForm 
                            name="endereco"
                            control={control}
                            placeholder="Endereço"
                            autoCapitalize="words"
                            autoCorrect={false}
                            error={errors.endereco && errors.endereco.message}
                        /> */}

                    
                    
                        
                    </Fields>

                </Form>

      
            <WrapFooterCadastro>
                <Button 
                    title="Criar Conta" 
                    type="ok"
                    onPress={()=>{}}
                />
            </WrapFooterCadastro>

        </Container>

        

        </TouchableWithoutFeedback>
    )
}