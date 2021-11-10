import React, { useEffect, useState } from 'react';
import { Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Input } from '../../components/Forms/Input';
import { InputForm } from '../../components/Forms/InputForm';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver }  from '@hookform/resolvers/yup';
import { Button } from '../../components/Forms/Button/Index';
import { 
    Container,
    Header,
    Titulo,
    Form,
    Fields,
} from './styles';

import { Select } from '../../components/Forms/Select';

// import da tela que vai virar modal
import { ModalSelect } from '../ModalSelect';
import { categories } from '../../global/variaveis/categories';

interface FormData{
    nome: string,
    dataNascimento: number,
    cpf: number,
    celular: number,
    email: string,
    endereco: string
}

export function CadastrarPaciente(){

    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [tipoModalOpen, setTipoModalOpen] = useState(0);

    const [categoryNotDefault, setCategoryNotDefault] = useState(false);
    const [category, setCategory] = useState({key: -1,name: 'Tipo de Atendimento'});
    const [categoriesList, setCategoriesList] = useState(categories);

    const [comorbidadeDefault, setComorbidadeDefault] = useState(false);
    const [temComorbidade, setTemComorbidade] = useState({key: -1,name: ''});
    const [temComorbidadeList, setTemComorbidadeList] = useState([
        {key: 1, name: "Sim"}, {key: 0,name: "Não"}
    ]);
    
    function handleSelectCategoryModal(tipoModal: number){
        setTipoModalOpen(tipoModal);
        setCategoryModalOpen(!categoryModalOpen);
    }

    const {
        control,
        handleSubmit,
    } = useForm();

    function handleRegister(form: FormData){

        const data = {
            nome: form.nome,
            dataNascimento: form.dataNascimento,
            cpf: form.cpf,
            celular: form.celular,
            email: form.email,
            tipo: category.key,
            comorbidade: temComorbidade.key,
            endereco: form.endereco
        }
        console.log(data);
        alert(JSON.stringify(data));
    }


    useEffect(()=>{
        if(category.key == -1){
            setCategoryNotDefault(false);
        }else{
            setCategoryNotDefault(true);
        }
        if(temComorbidade.key == -1){
            setComorbidadeDefault(false);
        }else{
            setComorbidadeDefault(true);
        }
    }, [category, temComorbidade]);

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
                        error={null}
                        // error={errors.nome && errors.nome.message}
                    />

                    <InputForm 
                        name="dataNascimento"
                        control={control}
                        placeholder="Data de Nascimento"
                        keyboardType="numeric"
                        error={null}
                        //error={errors.dataNascimento && errors.dataNascimento.message}
                    /> 
  
                    <InputForm
                        name="cpf"
                        control={control}
                        placeholder="CPF"
                        keyboardType="numeric"
                        //error={errors.cpf && errors.cpf.message}
                        error={null}
                        maxLength={11}
                    />

                     <InputForm
                        name="celular"
                        control={control}
                        placeholder="Celular"
                        keyboardType="numeric"
                        //error={errors.celular && errors.celular.message}
                        error={null}
                    /> 

                    <InputForm
                        name="email"
                        control={control}
                        placeholder="Email"
                        keyboardType="email-address"
                        //error={errors.email && errors.email.message}
                        error={null}
                    /> 

                    <Select 
                        title={category.name}
                        isActive={categoryNotDefault}
                        onPress={()=>{handleSelectCategoryModal(1)}}
                    />
 
                    <Select 
                        title={"Paciente com comorbidade: "+ temComorbidade.name}
                        isActive={comorbidadeDefault}
                        onPress={()=>{handleSelectCategoryModal(2)}}
                    />

                    { temComorbidade.key == 1 && 
                        <InputForm
                            name="tipoComorbidade"
                            control={control}
                            placeholder="Tipo da(s) Comorbidade(s)"
                            autoCapitalize="words"
                            autoCorrect={false}
                            //error={errors.tipoComorbidade && errors.tipoComorbidade.message}
                            error={null}
                        />
                    } 

                    <InputForm
                        name="endereco"
                        control={control}
                        placeholder="Endereco"
                        autoCapitalize="words"
                        autoCorrect={false}
                        error={null}
                        //error={errors.endereco && errors.endereco.message}
                    />  
                </Fields>

                <Button 
                    title="Cadastrar" 
                    onPress={handleSubmit(handleRegister) }
                />

            </Form>

            <Modal visible={categoryModalOpen}>
               { tipoModalOpen == 1 &&
                    <ModalSelect 
                        titulo="Tipo de Paciente"
                        category={category}
                        setCategory={setCategory}
                        closeSelectCategory={()=>handleSelectCategoryModal(0)}
                        optionsList={categoriesList}
                    />
                }
                {tipoModalOpen == 2 &&
                    <ModalSelect 
                        titulo="Paciente tem comorbidade"
                        category={temComorbidade}
                        setCategory={setTemComorbidade}
                        closeSelectCategory={()=>handleSelectCategoryModal(1)}
                        optionsList={temComorbidadeList}
                    />
                } 
            </Modal>

        </Container>
        </TouchableWithoutFeedback>
    )
}