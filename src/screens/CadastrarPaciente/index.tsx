import React, { useEffect, useState } from 'react';
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
import { CategorySelect } from '../ModalSelect';
import { categories } from '../../global/variaveis/categories';


export function CadastrarPaciente(){

    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [tipoModalOpen, setTipoModalOpen] = useState(0);

    const [categoryNotDefault, setCategoryNotDefault] = useState(false);
    const [category, setCategory] = useState({
        key: -1,
        name: 'Tipo de Atendimento'
    });
    const [categoriesList, setCategoriesList] = useState(categories);

    const [comorbidadeDefault, setComorbidadeDefault] = useState(false);
    const [temComorbidade, setTemComorbidade] = useState({
        key: -1,
        name: ''
    });
    const [temComorbidadeList, setTemComorbidadeList] = useState([
        {
            key: 0,
            name: "Não"
        },
        {
            key: 1,
            name: "Sim"
        }
    ]);

    
    function handleSelectCategoryModal(tipoModal: number){
        setTipoModalOpen(tipoModal);
        setCategoryModalOpen(!categoryModalOpen);
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

                    <Select 
                        title={category.name}
                        isActive={categoryNotDefault}
                        onPress={()=>{handleSelectCategoryModal(1)}}
                    />

                    <Input placeholder="Tem Comorbidade"/>

                    <Select 
                        title={"Paciente com comorbidade: "+ temComorbidade.name}
                        isActive={comorbidadeDefault}
                        onPress={()=>{handleSelectCategoryModal(2)}}
                    />

                    <Input placeholder="Comorbidade"/>
                    <Input placeholder="Endereco"/>
                </Fields>

                <Button title="Cadastrar" />

            </Form>

            <Modal visible={categoryModalOpen}>
                { tipoModalOpen == 1 &&
                    <CategorySelect 
                        titulo="Tipo de Paciente"
                        category={category}
                        setCategory={setCategory}
                        closeSelectCategory={()=>{handleSelectCategoryModal(0)}}
                        optionsList={categoriesList}
                    />
                }
                {tipoModalOpen == 2 &&
                    <CategorySelect 
                        titulo="Paciente tem comorbidade"
                        category={temComorbidade}
                        setCategory={setTemComorbidade}
                        closeSelectCategory={()=>{handleSelectCategoryModal(0)}}
                        optionsList={temComorbidadeList}
                    />
                }
            </Modal>

        </Container>
    )
}