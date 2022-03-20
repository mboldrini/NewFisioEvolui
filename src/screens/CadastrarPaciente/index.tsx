import React, { useEffect, useState } from 'react';
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
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
    WrapBtn,
    WrapFooterCadastro
} from './styles';

import { Select } from '../../components/Forms/Select';

// Interface's
import IApointment from '../../global/DTO/Apointment';

// import da tela que vai virar modal
import { ModalSelect } from '../ModalSelect';
import { categories } from '../../global/devVariaveis';

//import { ModalAgendamento } from '../ModalAgendamento';
import { ModalAgendamento } from '../../components/Modal/ModalAgendamento';
import { ButtonSimple } from '../../components/Forms/ButtonSimple/Index';
import { AppointmentList } from '../../components/AppointmentList';

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

    // Modal's
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [wichModalIsOpened, setWichModalIsOpened] = useState(0);


    const [category, setCategory] = useState({key: -1,name: 'Tipo de Atendimento'});
    const [categoriesList, setCategoriesList] = useState(categories);
    const [temComorbidade, setTemComorbidade] = useState({key: -1,name: ''});
    const [temComorbidadeList, setTemComorbidadeList] = useState([{key: 1, name: "Sim"}, {key: 0,name: "Não"}]);


    // APPOINTMENT'S
    // Appointment received from Modal
    const [appointment, setAppointment] = useState({} as IApointment | null);
    const [appointmentList, setAppointmentList] = useState([]);


    function HandleSelectCategoryModal(tipoModal: number){
        setWichModalIsOpened(tipoModal);
        setCategoryModalOpen(!categoryModalOpen);
        if(!categoryModalOpen == false){
          //  setAgendamentoLoading(null);
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

    function AlertExcludeAppointment(item: IApointment, key: number){
        let [year, month, day] = item.data.split("-");
        let date = day +"/"+ month +"/"+ year;
        Alert.alert(
            "Atenção!",
            `Deseja excluir o agendamento do dia: ${date} as ${item.hora} Horas`,
            [
                {
                    text: "Excluir",
                    onPress: () => ExcludeAppointment(item)
                },
                { 
                    text: "Cancelar", 
                    onPress: () => console.log("OK Pressed") 
                }
            ]
        );
    }

    function ExcludeAppointment(item: IApointment){
        let newAppintmentList = appointmentList.filter( appoint => { return appoint != item });
        setAppointmentList(newAppintmentList);
    }

    useEffect(()=>{
        if(appointment && appointment.data){
            const newArray = [...appointmentList, appointment];
            setAppointmentList(newArray);
            setAppointment(null);
        }
    },[appointment]);


  

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
                        onPress={()=>{HandleSelectCategoryModal(1)}}
                    />

                    <Select 
                        title={"Paciente com comorbidade: "+ temComorbidade.name}
                        isActive={temComorbidade.key}
                        onPress={()=>{HandleSelectCategoryModal(2)}}
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
                    { appointmentList && appointmentList.length > 0 && appointmentList.map( (item, key) => {
                        console.log(key);
                        return(
                            <AppointmentList
                                key={key}
                                status={item.status}
                                hour={item.hora}
                                date={item.data}
                                onPress={()=>{ AlertExcludeAppointment(item, key) }}
                            />   
                        )
                    }) } 

                    <WrapBtn>
                        <ButtonSimple
                            type="default"
                            title="Agendar Horario" 
                            onPress={()=>HandleSelectCategoryModal(3)}
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
               { wichModalIsOpened == 1 &&
                    <ModalSelect 
                        titulo="Tipo de Paciente"
                        category={category}
                        setCategory={setCategory}
                        closeSelectCategory={()=>HandleSelectCategoryModal(0)}
                        optionsList={categoriesList}
                    />
                }
                {wichModalIsOpened == 2 &&
                    <ModalSelect 
                        titulo="Paciente tem comorbidade"
                        category={temComorbidade}
                        setCategory={setTemComorbidade}
                        closeSelectCategory={()=>HandleSelectCategoryModal(1)}
                        optionsList={temComorbidadeList}
                    />
                } 
                {wichModalIsOpened == 3 &&
                    <ModalAgendamento
                        closeSelectCategory={()=>HandleSelectCategoryModal(3)}
                        setSelectedApointment={setAppointment}
                        //dataEscolhida={agendamentoLoading}
                        //setAgendamentoExcluir={setAgendamentoExcluir}
                    />
                }
            </Modal>

        </Container>
        </TouchableWithoutFeedback>
    )
}