import React, { useEffect, useState } from 'react';
import { Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { InputMasked } from '../../components/Forms/InputMasked';
import { useForm } from 'react-hook-form';
import { InputForm } from '../../components/Forms/InputForm';
import { Button } from '../../components/Forms/Button/Index';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { 
    Container,
    Header,
    Titulo,
    Form,
    Fields,
    Wrap,
    WrapItensAgendados,
    WrapBtn,
    WrapFooterCadastro
} from './styles';

import { Select } from '../../components/Forms/Select';

// import da tela que vai virar modal
import { ModalSelect } from '../ModalSelect';
import { categories } from '../../global/devVariaveis';

import { ModalAgendamento } from '../ModalAgendamento';
import { ButtonSimple } from '../../components/Forms/ButtonSimple/Index';
import { PacienteAgendamento } from '../../components/AgendamentoPaciente';

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

export function CadastrarPaciente(){

    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [tipoModalOpen, setTipoModalOpen] = useState(0);


    const [category, setCategory] = useState({key: -1,name: 'Tipo de Atendimento'});
    const [categoriesList, setCategoriesList] = useState(categories);
    const [temComorbidade, setTemComorbidade] = useState({key: -1,name: ''});
    const [temComorbidadeList, setTemComorbidadeList] = useState([{key: 1, name: "Sim"}, {key: 0,name: "Não"}]);

    const [listaAgendamentos, setListaAgendamentos] = useState([]);
    const [agendamento, setAgendamento] = useState(null);
    const [agendamentoLoading, setAgendamentoLoading] = useState(null);
    const [agendamentoExcluir, setAgendamentoExcluir] = useState(null);
   

    function handleSelectCategoryModal(tipoModal: number){
        setTipoModalOpen(tipoModal);
        setCategoryModalOpen(!categoryModalOpen);
        if(!categoryModalOpen == false){
            setAgendamentoLoading(null);
        }
    }


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

    function handleAgendamento(id: number){
        let infosAgendamento = {
            id: id,
            dataEscolhida: listaAgendamentos[id].dataAgendada,
            horaEscolhida: listaAgendamentos[id].horaAgendada,
            tipoAgendamento: listaAgendamentos[id].tipoAgendamento
        }
        setAgendamentoLoading(infosAgendamento);
        handleSelectCategoryModal(3);
    }

    useEffect(()=>{
        if(agendamento){

            let lista = listaAgendamentos;
            lista.push(agendamento);
            setListaAgendamentos(lista);
            setAgendamento(null);
            setAgendamentoLoading(null);

        }
    }, [agendamento]);

    useEffect(()=>{
        if(agendamentoExcluir != null){
            let lista = listaAgendamentos;
            delete lista[agendamentoExcluir];
            setAgendamentoExcluir(null);
            handleSelectCategoryModal(3);
        }
    },[agendamentoExcluir]);

    useEffect(()=>{
        console.log("aAa");
        console.log(listaAgendamentos);
    }, [listaAgendamentos]);


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

                    <InputMasked 
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

                    <Select 
                        title={category.name}
                        isActive={category.key}
                        onPress={()=>{handleSelectCategoryModal(1)}}
                    />

                    <Select 
                        title={"Paciente com comorbidade: "+ temComorbidade.name}
                        isActive={temComorbidade.key}
                        onPress={()=>{handleSelectCategoryModal(2)}}
                    /> 

                    { temComorbidade.key == 1 && 
                        <InputForm 
                            name="tipoComorbidade"
                            control={control}
                            placeholder="Tipo(s) de comorbidade(s)"
                            autoCorrect={false}
                            error={errors.tipoComorbidade && errors.tipoComorbidade.message}
                        />
                    }  

                    
                    <InputForm 
                        name="endereco"
                        control={control}
                        placeholder="Endereço"
                        autoCapitalize="words"
                        autoCorrect={false}
                        error={errors.endereco && errors.endereco.message}
                    />

                  
                 
                    
                </Fields>

                <Wrap>
                    { listaAgendamentos && listaAgendamentos.length > 0 && 
                        <WrapItensAgendados>
                            { listaAgendamentos.length > 0 && listaAgendamentos.map((item, key) =>{
                                return(
                                    <PacienteAgendamento 
                                        key={key}
                                        dataAgendamento={item.dataAgendada}
                                        horario={item.horaAgendada}
                                        tipoAgendamento={0}
                                        onPress={()=>{handleAgendamento(key)}}
                                    />
                                )
                            }) }
                        </WrapItensAgendados>
                    }

                    <WrapBtn>
                        <ButtonSimple
                            type="default"
                            title="Agendar Horario" 
                            onPress={()=>handleSelectCategoryModal(3)}
                        />
                    </WrapBtn>

                </Wrap>

            </Form>

            <WrapFooterCadastro>
                <Button 
                    title="Cadastrar Paciente" 
                    onPress={handleSubmit((d) => handleRegister(d))}
                />
            </WrapFooterCadastro>
                

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
                {tipoModalOpen == 3 &&
                    <ModalAgendamento
                        closeSelectCategory={()=>handleSelectCategoryModal(3)}
                        setAgendamento={setAgendamento}
                        dataEscolhida={agendamentoLoading}
                        setAgendamentoExcluir={setAgendamentoExcluir}
                    />
                }
            </Modal>

        </Container>
        </TouchableWithoutFeedback>
    )
}