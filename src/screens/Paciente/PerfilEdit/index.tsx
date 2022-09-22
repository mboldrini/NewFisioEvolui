import React, { useEffect, useState } from 'react';
import { Keyboard, Alert, ScrollView, FlatList, RefreshControl } from 'react-native';
import Toast from 'react-native-toast-message';
import { InputMasked } from '../../../components/Forms/InputMasked';
import { useForm } from 'react-hook-form';
import { InputForm } from '../..//../components/Forms/InputForm';
import { Button } from '../../../components/Buttons/Button/Index';
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

    WrapList,

    WrapLoadingPctInfos,
    LoadingIcon

} from './styles';

import { Select } from '../../../components/Forms/Select';
// API
import { api } from '../../../global/api';
// REDUX
import { useDispatch, useSelector, } from 'react-redux';
import { actionCreators, State } from '../../../state';

import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import { List_TipoPagamento } from '../../../components/List_Items/TiposDePagamentos';
import { CabecalhoMenu } from '../../../components/CabecalhoMenu';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Footer_Modal } from '../../../components/Footers/Footer_Modal';
import { Footer_CreatedAt } from '../../../components/Footers/Footer_CreatedAt';
import { format } from 'date-fns';
import { bindActionCreators } from 'redux';


const schema = Yup.object().shape({
    nome: Yup.string().required("Nome é obrigatório"),
    cpf: Yup.string().required("CPF é obrigatório").length(14, "CPF deve ter 11 dígitos"),
    dataNascimento: Yup.string().optional().length(10, "Formato de data: 00/00/0000"),
    celular: Yup.string().required("Telefone de contato é obrigatório"),
    email: Yup.string().required("Email é obrigatório"),
    endereco: Yup.string().required("Endereço é obrigatório"),
    instagram: Yup.string().required("Endereço é obrigatório"),
});

interface IRouteInfos{
    id: number
}

interface IPacientApi{
    id: number,
    name: string,
    dataNascimento: string,
    document: string,
    email: string,
    celphone: string,
    second_celphone: string,
    instagram: string,
    address: string,
    latitude: string,
    longitude: string,
    created_at: string,
    updated_at: string,
    serviceType: {
        id: number,
        name: string,
        description: string
    }
}

interface IForm{
    celular: string,
    cpf: string,
    dataNascimento: string,
    email: string,
    endereco : string,
    instagram: string,
    nome: string,
}

export function EditarPaciente(){

    const navigation = useNavigation();
    const [refreshing, setRefresh] = useState(false);

    /// Route Params
    const route = useRoute();
    const { id } = route.params as IRouteInfos;

    /// Redux 
    const dispatch = useDispatch();
    const apiState = useSelector((state: State) => state.apiReducer);
    const atendimentosState = useSelector((state: State) => state.atendimentoReducer); 
    const { setAtualizaPacientes } = bindActionCreators(actionCreators, dispatch);


    const pacientesReducer = useSelector((state: State) => state.pacientesReducer);



    /// Form Infos Obtido da API
    const [formInfosApi, setFormInfosApi] = useState<IPacientApi>(null);

    /// Modal's
    const [loading, setLoading] = useState(false);

    const [appointmentType, setAppointmentType] = useState({key: -1,name: 'Tipo de Atendimento'});

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(schema)
    });

    const listaMenuPerfil = [{ title: 'Excluir', slug:'excluir', icone: 'trash', }];
    const [menuEscolhido, setMenuEscolhido] = useState(null);

    async function GetPacienteInfos(id: number){
        console.group("GetPacienteInfos");

        setLoading(true);

        await api(apiState.token).get('/clients/'+ id ).then(res =>{

            console.log(res.data);

            let infos: IPacientApi = res.data;

            setFormInfosApi(res.data);

            let [dtt, time] = infos.dataNascimento.split("T");

            reset({
                nome: infos.name,
                cpf: infos.document,
                dataNascimento: format(new Date(dtt), 'dd/MM/yyyy'),
                celular: infos.celphone,
                email: infos.email,
                instagram: infos.instagram,
                endereco: infos.address
            });

            setAppointmentType({key: res.data.serviceType.id, name: res.data.serviceType.name});

            setLoading(false);

        }).catch(err =>{
            console.log("Erro ao obter paciente");
            console.log(err.response.data);
            if(err.response.data){
                console.error(err.response.data.message, err.response.data.statusCode);
            }

            Toast.show({
                type: 'error',
                text1: 'OPS! erro ao obter informações do paciente.',
                text2: `${JSON.stringify(err.response.data.message)}`
            });

            setTimeout(()=>{
                navigation.goBack();
            }, 1000);
        });


        console.groupEnd();
    }

    async function HandleRegister(formInfos: IForm){
        console.group("Salva infos do usuario");

        setLoading(true);

        const [dia, mes, ano] = formInfos.dataNascimento.split("/");

        let infos = {
            "name": formInfos.nome,
            "dataNascimento": ano +"-"+ mes +"-"+ dia,
            "document": formInfos.cpf,
            "email": formInfos.email,
            "celphone": formInfos.celular,
            "second_celphone": formInfos.celular,
            "instagram": formInfos.instagram,
            "address": formInfos.endereco,
            "serviceType_id": appointmentType.key,
            "latitude": formInfosApi.latitude,
            "longitude": formInfosApi.longitude
        };

        await api(apiState.token).patch('/clients/'+ id, infos).then(res =>{

            setAtualizaPacientes(true);

            Toast.show({
                type: 'success',
                text1: '😃 Informações salvas com sucesso!',
            });


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

        console.groupEnd();
    }


    useEffect(()=>{
        console.log("ID: "+ id);
        if(id){
            GetPacienteInfos(id);
        }
    }, [id]);

    useEffect(()=>{
        console.group("pacientesReducer");
        console.log(pacientesReducer);
        console.groupEnd();
    },[pacientesReducer]);

    return(
<Container >
    <SafeAreaView>
        <Iscrol refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>{ console.log("FF") }}/>}>

            <CabecalhoMenu titulo='Perfil do Paciente' onPress={()=> navigation.goBack() } setMenuEscolhido={setMenuEscolhido} menuList={listaMenuPerfil} />

            { !loading &&
            <>
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
                            format: 'dd/MM/yyyy'
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

                </Fields>

                {!loading && formInfosApi?.created_at && formInfosApi?.updated_at &&
                    <Footer_CreatedAt created_at={ formInfosApi?.created_at } updated_at={ formInfosApi?.updated_at }/>
                }
               
            </Form>

            <Footer_Modal onPressOk={handleSubmit((d) => HandleRegister(d as any) ) } onPressCancel={()=> navigation.goBack() } />
            </>
            }

            { loading == true && 
                <WrapLoadingPctInfos>
                    <LoadingIcon size="large" color="#FFFFFF"/>  
                </WrapLoadingPctInfos>
            }

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

        </Iscrol>
    </SafeAreaView>
</Container>
    )
}