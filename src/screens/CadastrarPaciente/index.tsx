import React, { useState } from 'react';
import { Modal } from 'react-native';
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
import { CategorySelect } from '../ModalCategorySelect';

export function CadastrarPaciente(){

    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    const [category, setCategory] = useState({
        key: 'Category',
        name: 'Tipo de Paciente'
    });
    
    function handleSelectCategoryModal(){
        setCategoryModalOpen(!categoryModalOpen);
    }


    return(
        <Container>
            <Header>
                <Titulo>Cadastrar Paciente</Titulo>
            </Header>

            <Form>
                <Fields>
                    <Input placeholder="Nome"/>
                    <Input placeholder="Data de Nascimento"/>
                    <Input placeholder="CPF"/>
                    <Input placeholder="Celular"/>
                    <Input placeholder="Email"/>
                    <Input placeholder="Tipo de Paciente"/>
                    
                    <Select 
                        title={category.name}
                        onPress={handleSelectCategoryModal}
                    />

                    <Input placeholder="Tem Comorbidade"/>
                    <Input placeholder="Comorbidade"/>
                    <Input placeholder="Endereco"/>
                </Fields>

                <Button title="Cadastrar" />

            </Form>

            <Modal visible={categoryModalOpen}>
                <CategorySelect 
                    category={category}
                    setCategory={setCategory}
                    closeSelectCategory={handleSelectCategoryModal}
                />
            </Modal>

        </Container>
    )
}