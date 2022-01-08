import React, { useEffect, useState } from 'react';
import { Modal, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';
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
                <Titulo>Olá! Matheus "p/ criar sua conta preciso que nos forneça algumas informações"</Titulo>
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
                            name="emailCadastro"
                            control={control}
                            value="email_cadastrado"
                            editable={false}
                            placeholder="Email"
                            autoCorrect={false}
                            error={errors.emailCadastro && errors.emailCadastro.message}
                        />

                        <InputForm 
                            name="emailProfissional"
                            control={control}
                            placeholder="Email profissional"
                            autoCorrect={false}
                            error={errors.emailProfissional && errors.emailProfissional.message}
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

                    <WrapFooterCadastro>
                    <Button 
                        title="Criar" 
                        type="ok"
                        onPress={()=>{}}
                    />
                </WrapFooterCadastro>


                </Form>

                {/* </KeyboardAvoidingView> */}
      
  
              

        </Container>

        

        </TouchableWithoutFeedback>
    )
}