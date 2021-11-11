import React, { useEffect, useState } from 'react';
import { Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {InputMasked} from '../../components/Forms/InputForm';
import { Input } from '../../components/Forms/Input';
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

    const [errors, setErrors] = useState(false);

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


    function handleRegister(){
    }


    const [nome, setNome] = useState('');
    const [dataNasc, setDataNasc] = useState('');
    const [cpf, setCpf] = useState('');
    const [celular, setCelular] = useState('');


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

                    <Input 
                        placeholder="Nome do Paciente"
                        value={nome}
                        onChangeText={t=>setNome(t)}
                    />

                    <InputMasked
                        placeholder="Data de Nascimento"
                        value={dataNasc}
                        onChangeText={t=>setDataNasc(t)}
                        tipo="datetime"
                        opcoes={{
                            format: 'DD/MM/YYYY'
                        }}
                    />


                    <InputMasked
                        placeholder="CPF"
                        value={cpf}
                        onChangeText={t=>setCpf235(t)}
                        tipo="cpf"
                    />

                  
                    <InputMasked
                        placeholder="Celular"
                        value={celular}
                        onChangeText={t=>setCelular(t)}
                        tipo="cel-phone"
                        options={{
                            maskType: 'BRL',
                            withDDD: true,
                            dddMask: '(99) '
                          }}
                      
                    />
{/*

                    <InputForm
                        name="email"
                        control={control}
                        placeholder="Email"
                        keyboardType="email-address"
                        error={errors && errors.email}
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
                            error={errors && errors.tipoComorbidade}
                        />
                    } 

                    <InputForm
                        name="endereco"
                        control={control}
                        placeholder="Endereco"
                        autoCapitalize="words"
                        autoCorrect={false}
                        error={errors && errors.endereco}
                    />   */}
                </Fields>

                <Button 
                    title="Cadastrar" 
                    onPress={ handleRegister }
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