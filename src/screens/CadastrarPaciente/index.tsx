import React, { useEffect, useState } from 'react';
import { Modal, TouchableWithoutFeedback, Keyboard, Alert, View, ScrollView, FlatList } from 'react-native';
import { InputMasked } from '../../components/Forms/InputMasked';
import { useForm } from 'react-hook-form';
import { InputForm } from '../../components/Forms/InputForm';
import { Button } from '../../components/Buttons/Button/Index';
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
    WrapFooterCadastro,

    Iscrol,

    
    FieldGroup,
    TitleGroup,
    Title,

    WrapList

} from './styles';

import { Select } from '../../components/Forms/Select';
// API
import { api } from '../../global/api';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../state';
// Interface's
import IApointment from '../../global/DTO/Apointment';
import { INewPatient } from '../../global/DTO/Pacient';
import { FormData } from '../../global/DTO/PatientFormData';
// Modal's
import { ModalLoading } from '../../components/Modal/ModalLoading';
import { ModalAgendamento } from '../../components/Modal/ModalAgendamento';
import { ModalTemComorbidade } from '../../components/Modal/ModalTemComorbidade';
// import { ModalTipoAtendimento } from '../../components/Modal/ModalTipoAtendimento';

import { format } from 'date-fns';

import { ButtonSimple } from '../../components/Buttons/ButtonSimple/Index';
import { AppointmentList } from '../../components/AppointmentList';
import ActionSheet, { SheetManager } from "react-native-actions-sheet";

const schema = Yup.object().shape({
    nome: Yup.string().required("Nome é obrigatório").default("Bartolomeu Junior"),
    cpf: Yup.string().required("CPF é obrigatório").length(14, "CPF deve ter 11 dígitos").default("159.451.647-99"),
    dataNascimento: Yup.string().optional().length(10, "Formato de data: 00/00/0000").default("01/07/1995"),
    celular: Yup.string().required("Telefone de contato é obrigatório").default("(27) 99877-1424"),
    email: Yup.string().required("Email é obrigatório").default("admin@admin.com"),
    endereco: Yup.string().required("Endereço é obrigatório").default("Rua bartolomeu pinto"),
    hpp: Yup.string().optional().default("Hpp padrao"),
    diagnostico: Yup.string().optional().default("diagnostico padrao"),
    queixa: Yup.string().optional().default("queixa padrao"),
    hda: Yup.string().optional().default("hda padrao"),
    diagnosticoFuncional: Yup.string().optional().default("diagnostico funcional Padrao"),
    avaliacaoFisica: Yup.string().optional().default("avaliacao fisica padrão"),
    avaliacaoRespiratoria: Yup.string().optional().default("avaliação respiratória padrao"),
    objetivos: Yup.string().optional(),
    orientacoes: Yup.string().optional(),
});

import Toast from 'react-native-toast-message';
import { List_TipoPagamento } from '../../components/List_Items/TiposDePagamentos';

import {LogBox} from "react-native";
LogBox.ignoreLogs([
    "ViewPropTypes will be removed",
    "ColorPropType will be removed",
    ])

export function CadastrarPaciente(){

    /// Redux 
    const apiState = useSelector((state: State) => state.apiReducer);
    const atendimentosState = useSelector((state: State) => state.atendimentoReducer); 

    /// Modal's
    const [loading, setLoading] = useState(false);
    /// New Modal's Way
    const [ isAgendarVisible, setIsAgendarVisible ] = useState(false);
    // const [ isTipoAtendimentoVisible, setTipoAtendimentoVisible] = useState(false);
    const [ isTemComorbidadeVisible, setTemComorbidadeVisible ] = useState(false);

    const [appointmentType, setAppointmentType] = useState({key: -1,name: 'Tipo de Atendimento'});
    const [temComorbidade, setTemComorbidade] = useState({key: -1, name: 'Paciente tem comorbidade'});

    /// APPOINTMENT'S
    /// Appointment received from Modal
    const [appointment, setAppointment] = useState({} as IApointment | null);
    const [appointmentList, setAppointmentList] = useState([]);

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(schema)
    });

    function handleRegister(form: FormData){

        if(temComorbidade.key == -1){
            Alert.alert( "Ops!", "Você precisa informar se o paciente tem comorbidade(s)", [ { text: "OK" } ] );
            return;
        }
        if(temComorbidade.key == 1 && (form.hpp?.length < 20 || !form.hpp) ){
            Alert.alert( "Ops!", "Você precisa informar a(s) comorbidade(s) do paciente", [ { text: "OK" } ] );
            return;
        }
        if(appointmentType.key == -1){
            Alert.alert( "Ops!", "Você precisa informar o tipo de atendimento", [ { text: "OK" } ] );
            return;
        }
        
        const date = format(new Date(), "yyyy-MM-dd");;

        let data: any = {
            name: form.nome,
            dataNascimento: form.dataNascimento, 
            document: form.cpf,
            email: form.email,
            celphone: form.celular,
            second_celphone: form.celular,
            instagram: '.',
            address: form.endereco,
            latitude: '0',
            longitude: '0',
            serviceType_id: appointmentType.key
        }

        if(form.hpp){
            data = {
                ...data,
                "hpp": {
                    "hpp": form.hpp,
                    "date": date
                }
            }
        }
        if(form.diagnostico){
            data = {
                ...data,
                "diagnostic": {
                    "diagnostic": form.diagnostico,
                    "date": date
                }
            }
        }
        if(form.queixa){
            data = {
                ...data,
                "complaint": {
                    "complaint": form.queixa,
                    "date": date
                }
            }
        }
        if(form.hda){
            data = {
                ...data,
                "hda": {
                    "hda": form.queixa,
                    "date": date
                }
            }
        }
        if(form.diagnosticoFuncional){
            data = {
                ...data,
                "funcionalDiagnosis": {
                    "diagnostic": form.diagnosticoFuncional,
                    "date": date
                }
            }
        }
        if(form.avaliacaoFisica){
            data = {
                ...data,
                "physicalEval": {
                    "evaluation": form.diagnosticoFuncional,
                    "date": date
                }
            }
        }
        if(form.avaliacaoRespiratoria){
            data = {
                ...data,
                "respiratoryEval": {
                    "evaluation": form.avaliacaoRespiratoria,
                    "date": date
                }
            }
        }
        if(form.objetivos){
            data = {
                ...data,
                "objective": {
                    "objective": form.objetivos,
                    "date": date
                }
            }
        }
        if(form.orientacoes ){
            data = {
                ...data,
                "guideline": {
                    "guideline": form.orientacoes,
                    "date": date
                }
            }
        }
        if(appointmentList.length > 0){
            let appList = appointmentList.map(appointment => ({
                type: appointment.type,
                date_scheduled: appointment.date_scheduled,
                start_hour: appointment.start_hour +":00"
            }));
            data = {
                ...data,
                "appointment": appList
            }
        }

        console.log(form);
        console.log("NOVO:");
        console.log(data);

        console.log(JSON.stringify(data));

        CreateNewPatient(data);

    }

    async function CreateNewPatient(data: INewPatient){

        setLoading(true);

        await api(apiState.token).post('/clients/', data ).then(res =>{

            Toast.show({
                type: 'success',
                text1: 'Paciente cadastrado!',
                text2: `${data.name} foi cadastrado(a) na lista de pacientes` // 'This is some something 👋'
              });

            reset({
                nome: '',
                cpf: '',
                dataNascimento: '',
                celular: '',
                email: '',
                endereco: '',
                hpp: '',
                diagnostico: '',
                queixa: '',
                hda: '',
                diagnosticoFuncional: '',
                avaliacaoFisica: '',
                avaliacaoRespiratoria: '',
                objetivos: '',
                orientacoes: ''
            });
            setAppointmentType({key: -1,name: 'Tipo de Atendimento'});
            setTemComorbidade({key: -1, name: 'Paciente tem comorbidade'});


        }).catch(err =>{
            console.error("Erro ao cadastrar paciente");
            console.log(err.response.data);
            if(err.response.data){
                console.error(err.response.data.message, err.response.data.statusCode);
            }
            Toast.show({
                type: 'error',
                text1: 'Erro ao cadastrar paciente',
                text2: err.response.data.message
            });
        });

        setLoading(false);

    }

    function AlertExcludeAppointment(item: IApointment, key: number){
        let [year, month, day] = item.start_hour.split("-");
        let date = day +"/"+ month +"/"+ year;
        Alert.alert(
            "Atenção!",
            `Deseja excluir o agendamento do dia: ${date} as ${item.start_hour} Horas`,
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
        if(appointment && appointment.date_scheduled){

            console.log("APPOINTMENT:");
            console.log(appointment);

            let newArray = [...appointmentList, appointment];

            console.log(newArray);
           
            // newArray = Array.from(new Set(newArray.map(JSON.stringify))).map(JSON.parse);

            setAppointmentList(newArray);
            setAppointment(null);

        }
    },[appointment]);

    useEffect(()=>{
        setAppointment(null);
        setAppointmentList([]);
    }, [appointmentType]);

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
            <Toast position={'top'}  autoHide={true} visibilityTime={6000} onPress={()=>Toast.hide()}/>
        <Iscrol>

            <Header>
                <Titulo>Cadastrar Paciente</Titulo>
            </Header>

            <Form >
                <Fields>

                    <TitleGroup>
                        <Title>Sobre o Paciente</Title>
                    </TitleGroup>

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

                    <InputForm 
                        name="instagram"
                        control={control}
                        placeholder="instagram"
                        autoCorrect={false}
                        error={errors.instagram && errors.instagram.message}
                    />
                    
                    <InputForm 
                        name="endereco"
                        control={control}
                        placeholder="Endereço"
                        autoCapitalize="words"
                        autoCorrect={false}
                        error={errors.endereco && errors.endereco.message}
                    />

                    <TitleGroup>
                        <Title>Atendimento</Title>
                    </TitleGroup>

                    <Select 
                        title={appointmentType.name}
                        isActive={appointmentType.key}
                        onPress={()=>{ SheetManager.show("modalTiposAtendimentos") }}
                    />

                    <Select 
                        title={ temComorbidade.name }
                        isActive={ temComorbidade.key }
                        onPress={()=>{ setTemComorbidadeVisible(true) }}
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
                        name="diagnostico"
                        control={control}
                        placeholder="Diagnóstico Clínico"
                        autoCapitalize="words"
                        autoCorrect={false}
                        multiline={true}
                        numberOfLines={4}
                        error={errors.diagnostico && errors.diagnostico.message}
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
                        name="hda"
                        control={control}
                        placeholder="Histórico de Doença Atual"
                        autoCapitalize="words"
                        autoCorrect={false}
                        multiline={true}
                        numberOfLines={4}
                        error={errors.hda && errors.hda.message}
                    />

                    <InputForm 
                        name="diagnosticoFuncional"
                        control={control}
                        placeholder="Diagnóstico Funcional"
                        autoCapitalize="words"
                        autoCorrect={false}
                        multiline={true}
                        numberOfLines={4}
                        error={errors.diagnosticoFuncional && errors.diagnosticoFuncional.message}
                    />

                    <InputForm 
                        name="avaliacaoFisica"
                        control={control}
                        placeholder="Avaliação Física"
                        autoCapitalize="words"
                        autoCorrect={false}
                        multiline={true}
                        numberOfLines={4}
                        error={errors.avaliacaoFisica && errors.avaliacaoFisica.message}
                    />

                    <InputForm 
                        name="avaliacaoRespiratoria"
                        control={control}
                        placeholder="Avaliação Respiratória"
                        autoCapitalize="words"
                        autoCorrect={false}
                        multiline={true}
                        numberOfLines={4}
                        error={errors.avaliacaoRespiratoria && errors.avaliacaoRespiratoria.message}
                    />

                    <InputForm 
                        name="objetivos"
                        control={control}
                        placeholder="Objetivos e Metas"
                        autoCapitalize="words"
                        autoCorrect={false}
                        multiline={true}
                        numberOfLines={4}
                        error={errors.objetivos && errors.objetivos.message}
                    />

                    <InputForm 
                        name="orientacoes"
                        control={control}
                        placeholder="Orientações"
                        autoCapitalize="words"
                        autoCorrect={false}
                        multiline={true}
                        numberOfLines={4}
                        error={errors.orientacoes && errors.orientacoes.message}
                    /> 

                </Fields>

                <TitleGroup>
                    <Title>Agendamentos</Title>
                </TitleGroup>

                <Wrap>
                    { !isAgendarVisible && appointmentList.length > 0 && appointmentList.map( (item, key) => {
                        return(
                            <AppointmentList
                                key={key}
                                status={item.status}
                                type={item.type}
                                date_scheduled={item.date_scheduled}
                                start_hour={item.start_hour}
                                end_hour={item.end_hour}
                                onPress={()=>{ AlertExcludeAppointment(item, key) }}
                            />   
                        )
                    }) } 

                    { appointmentType.key != -1 &&
                        <WrapBtn>
                            <ButtonSimple
                                type="default"
                                title="Agendar Horario" 
                                onPress={()=>setIsAgendarVisible(true)}
                            />
                        </WrapBtn>
                    }
                  
                </Wrap>
               
            </Form>

            <WrapFooterCadastro>
                <Button 
                    title="Cadastrar Paciente" 
                    onPress={handleSubmit((d) =>  handleRegister(d as any) )}
                    type="ok"
                />
            </WrapFooterCadastro>

            <ModalLoading visible={loading} infos={{mensagem:"Carregando informaões do paciente...", tipo: 'loading'}}/>

            <ActionSheet id="modalTiposAtendimentos" initialOffsetFromBottom={1} gestureEnabled={true} headerAlwaysVisible={true} elevation={3} extraScroll={3}  containerStyle={{backgroundColor: '#63C2D1'}} >
                <ScrollView nestedScrollEnabled={true} >
                    <FlatList 
                        data={atendimentosState.atendimentos}
                        keyExtractor={(item) => item.name}
                        renderItem={({item}) =>(
                            <WrapList>
                                <List_TipoPagamento 
                                    paymentMethod_name={item.name} 
                                    description={item.description} 
                                    onPress={()=>{ 
                                        setAppointmentType({key: item.id ,name: item.name })
                                        SheetManager.hide("modalTiposAtendimentos")  
                                    }} 
                                />
                            </WrapList>
                        )}
                    />
                </ScrollView>
            </ActionSheet>

            <ModalAgendamento 
                isVisible={isAgendarVisible} 
                setIsVisible={()=> setIsAgendarVisible(false) }
                setSelectedApointment={setAppointment}
                idServiceType={appointmentType.key}
            />

            {/* <ModalTipoAtendimento
                isVisible={isTipoAtendimentoVisible} 
                setIsVisible={()=> setTipoAtendimentoVisible(false) }
                setCategory={setAppointmentType}
                statusAtual={appointmentType}
            /> */}

            <ModalTemComorbidade 
                setCategory={setTemComorbidade}
                statusAtual={temComorbidade}
                isVisible={ isTemComorbidadeVisible }
                setIsVisible={()=> setTemComorbidadeVisible(false) }
            />

        </Iscrol>
        </Container>
        </TouchableWithoutFeedback>
    )
}