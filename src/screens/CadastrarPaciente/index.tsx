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

// API
import { api } from '../../global/api';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '../../state';

// Interface's
import IApointment from '../../global/DTO/Apointment';
import { INewPatient } from '../../global/DTO/Pacient';
import { FormData } from '../../global/DTO/PatientFormData';

// import da tela que vai virar modal
import { ModalSelect } from '../ModalSelect';
import { categories } from '../../global/devVariaveis';

//import { ModalAgendamento } from '../ModalAgendamento';
import { ModalAgendamento } from '../../components/Modal/ModalAgendamento';
import { ButtonSimple } from '../../components/Forms/ButtonSimple/Index';
import { AppointmentList } from '../../components/AppointmentList';

const schema = Yup.object().shape({
    nome: Yup.string().required("Nome é obrigatório"),
    cpf: Yup.string().required("CPF é obrigatório").length(14, "CPF deve ter 11 dígitos"),
    dataNascimento: Yup.string().optional().length(10, "Formato de data: 00/00/0000"),
    celular: Yup.string().required("Telefone de contato é obrigatório"),
    email: Yup.string().required("Email é obrigatório"),
    endereco: Yup.string().required("Endereço é obrigatório"),
    tipoComorbidade: Yup.string().optional(),
    comorbidades: Yup.string().optional(),
    referencia: Yup.string().optional().min(5, "Tamanho mínimo de 5 letras").max(254, "O tamanho não deve ser maior que 254 letras"),
    queixa: Yup.string().optional().min(15, "Tamanho mínimo de 15 letras").max(254, "O tamanho não deve ser maior que 254 letras"),
    diagnostico: Yup.string().optional().min(20, "Tamanho mínimo de 20 letras").max(254, "O tamanho não deve ser maior que 254 letras"),
})

export function CadastrarPaciente(){

    // // Redux de Usuários
    const dispatch = useDispatch();
    const { setUserInfos, setApiInfos } = bindActionCreators(actionCreators, dispatch);
    const usrState = useSelector((state: State) => state.user);// o .user é o nome usado no .index da pasta reducers

    // Modal's
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [wichModalIsOpened, setWichModalIsOpened] = useState(0);


    const [appointmentType, setAppointmentType] = useState({key: -1,name: 'Tipo de Atendimento'});
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

        if(temComorbidade.key == 1 && (form.comorbidades?.length < 20 || !form.comorbidades) ){
            Alert.alert(
                "Ops!",
                "Você precisa informar a(s) comorbidade(s) do paciente",
                [
                    { text: "OK" }
                ]
            );
            return;
        }

        const data: INewPatient = {
            nome: form.nome,
            cpf: form.cpf,
            dataNascimento: form.dataNascimento, //form.dataNascimento,
            celular: form.celular,
            telefoneRecado: form.celular,
            email: form.email,
            tipoAtendimento: appointmentType.key,
            temComorbidade: temComorbidade.key == 0 ? false : true,
            logradouro: form.endereco,
            uf: 0,
            bairro: "bairroOo",
            referencia: form.referencia,
            queixamotivo: form.queixa,
            diagnosticos: form.diagnostico,
            comorbidades: form.comorbidades,
            agendamentos: appointmentList
        }

        console.warn("Ativar a funcao de api após as alterações");
        console.log(data);

        console.log("APRENDER SOBRE REDUX p/ botar o token");
        console.log("APRENDER SOBRE REDUX p/ botar o token");
        console.log("criacao desativada");

     //   CreateNewPatient(data);

    }

    async function CreateNewPatient(data: INewPatient){

        await api("aa").post('/paciente/', data ).then(res =>{

            console.log("Cadastrou?");;
            console.log(res);

            alert("Paciente cadastrado com sucesso!");

        }).catch(err =>{
            console.error("Erro ao cadastrar paciente");
            console.log(err.response);
            console.log(err.response.data);
        });

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
            let newArray = [...appointmentList, appointment];
           
            newArray = Array.from(new Set(newArray.map(JSON.stringify))).map(JSON.parse);

            setAppointmentList(newArray);
            setAppointment(null);
        }
    },[appointment]);


    useEffect(()=>{
        console.log("USRSTATE:");
        console.log(usrState.api);
    },[]);

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
                        title={appointmentType.name}
                        isActive={appointmentType.key}
                        onPress={()=>{HandleSelectCategoryModal(1)}}
                    />

                    <Select 
                        title={"Paciente com comorbidade: "+ temComorbidade.name}
                        isActive={temComorbidade.key}
                        onPress={()=>{HandleSelectCategoryModal(2)}}
                    /> 

                    { temComorbidade.key == 1 && 
                           <InputForm 
                           name="comorbidades"
                           control={control}
                           placeholder="Comorbidade(s) do paciente"
                           autoCapitalize="words"
                           autoCorrect={false}
                           multiline={true}
                           numberOfLines={4}
                           error={errors.comorbidades && errors.comorbidades.message}
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

                    <InputForm 
                        name="referencia"
                        control={control}
                        placeholder="Referência"
                        autoCapitalize="words"
                        autoCorrect={false}
                        error={errors.referencia && errors.referencia.message}
                    />

                    <InputForm 
                        name="queixa"
                        control={control}
                        placeholder="Queixa e/ou motivo do Atendimento"
                        autoCapitalize="words"
                        autoCorrect={false}
                        multiline={true}
                        numberOfLines={4}
                        error={errors.queixa && errors.queixa.message}
                    />

                    <InputForm 
                        name="diagnostico"
                        control={control}
                        placeholder="Diagnóstico Inícial"
                        autoCapitalize="words"
                        autoCorrect={false}
                        multiline={true}
                        numberOfLines={4}
                        error={errors.diagnostico && errors.diagnostico.message}
                    />

                    
                </Fields>

                <Wrap>
                    { appointmentList && appointmentList.length > 0 && appointmentList.map( (item, key) => {
                        return(
                            <AppointmentList
                                key={key}
                                status={item.status}
                                hour={item.hora}
                                date={item.data}
                                type={item.tipo}
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
                    type="ok"
                />
            </WrapFooterCadastro>
                
            <Modal visible={categoryModalOpen}>
               { wichModalIsOpened == 1 &&
                    <ModalSelect 
                        titulo="Tipo de Paciente"
                        category={appointmentType}
                        setCategory={setAppointmentType}
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