import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RefreshControl, ScrollView, Alert} from 'react-native';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import { State } from '../../../state';
import { 
    Container,
    WrapToast,

    WrapHeader,
    WrapIconQtd,
    IconeQtd,
    WrapHeaderInfos,
    Qtd,
    InfosDesc,

    WrapCentral,
    WrapForm,
    WrapItens,

    WrapHistoric,
    History,
    DtHistory,

    WrapBtnCadastro,
    WrapBtnCancelar


} from './styles';

import { api } from '../../../global/api';
// Cabeçalho padrão das páginas
import { Cabecalho } from '../../../components/Cabecalho';
//Formulario
import { InputForm } from '../../../components/Forms/InputForm';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputMasked } from '../../../components/Forms/InputMasked';
import { Button } from '../../../components/Forms/Button/Index';
// Datas
import { format } from 'date-fns';
// Loading
import { ModalLoading } from '../../../components/Modal/ModalLoading';
const schema = Yup.object().shape({
    nome: Yup.string().required("Nome é obrigatório"),
    valor: Yup.string().required("Valor do atendimento é obrigatório"),
    descricao: Yup.string().optional()
})

interface IRoute{
    id: number
}

interface IFormData{
    descricao: string,
    nome: string,
    valor: string
}

interface IUpdateData{
    id_tipo: number,
    tipo: string,
    valor_atendimento: number,
    descricao: string,
}


interface IAtendimentoInfos{
    id: number,
    nome: string,
    valor: number,
    descricao: string,
    created_at: Date,
    updated_at: Date,
    qtdPacientes: number
}

const DefaultPctInfos = {
    id: 0,
    nome: '',
    valor: 0,
    descricao: '',
    created_at: new Date(),
    updated_at: new Date(),
    qtdPacientes: 0
}

const statusTitulo = ['Cadastrar Atendimento', 'Salvar'];

export function TipoAtendimento(){
    
    const navigation = useNavigation();
    const [refreshing, setRefresh] = useState(false);
    const [loading, setLoading] = useState(true);

    // Route.url params
    const route = useRoute();
    const { id } = route.params as IRoute;

    // Redux
    const usrState = useSelector((state: State) => state.user);

    const { control, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(schema) });

    const [status, setStatus] = useState(0);
    const [infos, setInfos] = useState<IAtendimentoInfos>(DefaultPctInfos);

    async function GetAtendimentoInfos(id: number){
        setLoading(true);
        await api(usrState.token).get('tipoAtendimento/id/'+ id).then(res => {
            
            setInfos(res.data);
            setLoading(false);

        }).catch(err =>{
            console.log("ERRO");
            console.log(err);
            setLoading(false);
            Toast.show({
                type: 'error',
                text1: '⚠️ Erro ao obter informações.',
            });
            setTimeout(()=>{
                navigation.goBack();
            },1500);
        });
    }

    function HandleRegister(form: IFormData){''

        if( parseInt(form.valor) <= 0 ){
            Toast.show({
                type: 'error',
                text1: '💸 É necessário informar um valor.',
            });
            return;
        }

        let newInfos = {
            id_tipo: id,
            tipo: form.nome,
            valor_atendimento: parseInt(form.valor),
            descricao: form.descricao
        }

        if( id && infos.id > 0 ){
            UpdateAtendimento(newInfos);
        }else{
            CriaAtendimento(newInfos);
        }

    }

    async function UpdateAtendimento(form: IUpdateData){

        setLoading(true);

        await api(usrState.token).put('tipoAtendimento/', form).then(res =>{
            // console.log("OK! atualizou");
            // console.log(res.data);

            setLoading(false);
            Toast.show({
                type: 'success',
                text1: '😄 Tipo de Atendimento atualizado!',
            });

            setTimeout(()=>{ navigation.goBack(); },2500);

        }).catch(err => {
            // console.log("erro ao atualizar");
            // console.log(err);

            setLoading(false);
            Toast.show({
                type: 'error',
                text1: '⚠️ Erro ao salvar informações.',
            });

            setTimeout(()=>{ navigation.goBack(); },2500);

        });       

    }

    async function CriaAtendimento(form: IUpdateData){

        setLoading(true);

        let newInfo = {
            tipo: form.tipo,
            valor_atendimento: form.valor_atendimento,
            descricao: form.descricao
        }

        await api(usrState.token).post('tipoAtendimento/', newInfo).then(res =>{

            // console.log("OK! atualizou");
            // console.log(res.data);

            setLoading(false);
            Toast.show({
                type: 'success',
                text1: '😄 Tipo de Atendimento criado!',
            });
            setTimeout(()=>{ navigation.goBack(); },2500);

        }).catch(err => {

            console.log("erro ao atualizar");
            console.log(err);

            setLoading(false);
            Toast.show({
                type: 'error',
                text1: '⚠️ Erro ao salvar informações.',
            });
            setTimeout(()=>{ navigation.goBack(); },2500);

        });      
    }

    function HandleAvisoExcluir(id: number){

        if(infos.qtdPacientes > 0 ){
            Toast.show({
                type: 'error',
                text1: '⚠️Não é possível excluir esse atendimento.',
                text2: 'Existem pacientes cadastrados vinculados.'
            });
            return;
        }

        Alert.alert(
            "Atenção!",
            "Deseja excluir esse tipo de atendimento?",
            [
                {
                    text: "Sim, Excluir",
                    onPress: () => ExcluirTipoAtendimento(id),
                    style: "default",
                  },
              {
                text: "Cancelar",
                style: "cancel",
              },
            ],
            {
              cancelable: true,
            }
        )
    }

    async function ExcluirTipoAtendimento(id: number){
        setLoading(true);
        await api(usrState.token).delete('tipoAtendimento/'+ id).then(res =>{
            console.log("EXCLUIDO!");
            navigation.goBack();
        }).catch(err => {
            console.log("erro ao excluir");
            console.log(err);

            setLoading(false);
            Toast.show({
                type: 'error',
                text1: '❌ Erro ao excluir atendimento.',
            });
            setTimeout(()=>{ navigation.goBack(); },2500);

        })
    }


    function SetaFormInfos(){
        reset({
            nome: infos.nome,
            valor: infos.valor,
            descricao: infos.descricao,
        });
    }

    useEffect(()=>{
        if(id){
            GetAtendimentoInfos(id);
            setStatus(1);
        }
    },[]);

    useEffect(()=>{
        SetaFormInfos();
    },[infos]);

    return(
        <Container>
        <WrapToast>
            <Toast position={'top'}  autoHide={true} visibilityTime={6000} onPress={()=>Toast.hide()}/>
        </WrapToast>
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>{ console.log("ff") }}/> } contentContainerStyle={{flexGrow: 1}}>

            <Cabecalho titulo="Tipo de Atendimento" onPress={()=> navigation.goBack() } onPressDel={() => HandleAvisoExcluir(id) } />

            <WrapCentral>

            <WrapItens> 
                <WrapHeader>
                    <WrapIconQtd>
                        <IconeQtd  name="users"/>
                    </WrapIconQtd>
                    <WrapHeaderInfos>
                        <Qtd>{ infos.qtdPacientes }</Qtd>
                        <InfosDesc>Pacientes Cadastrados</InfosDesc>
                    </WrapHeaderInfos>
                </WrapHeader>

                <WrapForm>

                    <InputForm 
                        name="nome"
                        control={control}
                        placeholder="Nome"
                        autoCapitalize="words"
                        autoCorrect={false}
                        error={errors.nome && errors.nome.message}
                    />
                    
                    <InputMasked 
                        name="valor"
                        control={control}
                        placeholder="valor"
                        error={errors.valor && errors.valor.message}
                        keyboardType="number-pad"
                        type={'money'}
                        options={{
                            precision: 2,
                            separator: ',',
                            delimiter: '.',
                            unit: '',
                            suffixUnit: ''
                        }}
                    />

                    <InputForm 
                        name="descricao"
                        control={control}
                        placeholder="Descrição"
                        autoCapitalize="words"
                        autoCorrect={false}
                        multiline={true}
                        numberOfLines={4}
                        error={errors.descricao && errors.descricao.message}
                    />

                </WrapForm>

                { id &&
                   <WrapHistoric>
                        <History>Criado em: <DtHistory>{ format( new Date( infos.created_at ) , 'dd/MM/yyyy')  }</DtHistory></History>
                        <History>Atualizado em: <DtHistory>{ format( new Date( infos.updated_at ) , 'dd/MM/yyyy') }</DtHistory></History>
                    </WrapHistoric>
                }
             

            </WrapItens>

            <>
                <WrapBtnCadastro>
                    <Button 
                        title={statusTitulo[status]} 
                        onPress={handleSubmit((d) =>  HandleRegister(d as  any) )}
                        type="ok"
                    />
                </WrapBtnCadastro>

                <WrapBtnCancelar>
                    <Button 
                        title="Cancelar" 
                        onPress={()=> navigation.goBack() }
                        type="cancel"
                    />
                </WrapBtnCancelar>
            </>
        
            </WrapCentral>

            <ModalLoading visible={loading} infos={{mensagem:"Salvando informações...", tipo: 'loading'}}/>

        </ScrollView>
        </Container>
    )
}

