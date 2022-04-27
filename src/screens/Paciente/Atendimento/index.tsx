import React, {useEffect, useState}from 'react';
import {RefreshControl} from 'react-native';
import {useNavigation } from '@react-navigation/native';
import { 
    Container,
    IsCroll,
    WrapToast,
    WrapDiaAtendimento,
    WrapBorder,
    Dia,
    DiaAtendimento,
    WrapBtn,
    WrapContent
} from './styles';
// Cabeçalho, parte estetica
import { Cabecalho } from '../../../components/Cabecalho';
import { PacienteHeader } from '../../../components/PacienteHeader';
//Campos dos forms e botão
import { Select } from '../../../components/Forms/Select';
import { InputForm } from '../../../components/Forms/InputForm';
import { ButtonSimple } from '../../../components/Forms/ButtonSimple/Index';
// Formulario
import { useForm } from 'react-hook-form';
// Yup do Formulário
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ModalStatusAtendimento } from '../../../components/Modal/ModalStatusAtendimento';
import { ModalTipoEvolucao } from '../../../components/Modal/ModalTipoEvolucao';
// ToastMessage para avisos ao usuário
import Toast from 'react-native-toast-message';

const schema = Yup.object().shape({
    evolucao: Yup.string().optional(),
    observacao: Yup.string().optional()
});

interface IFormData{
    evolucao?: string;
    descricao?: string;
}

export function PacienteAtendimento(){

    const navigation = useNavigation();

    const [refreshing, setRefresh] = useState(false);

    const [statusVisible, setStatusVisible] = useState(false);
    const [evolucaoVisible, setEvolucaoVisible] = useState(false);

    const [status, setStatus] = useState({key: -1,name: 'Status do Atendimento'});
    const [tipoEvolucao, setTipoEvolucao] = useState({key: -1,name: 'Tipo de Evolução'});

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(schema)
    });

    function HandleRegister(form: IFormData){
        console.log(form);

        if( tipoEvolucao.key == -1 ){
            Toast.show({
                type: 'error',
                text1: '⚠️ É necessário informar o tipo da evolução.',
                text2: 'Ex.: Atendimento comum, avaliação...'
            });
            return;
        }

        if( status.key == -1){
            Toast.show({
                type: 'error',
                text1: '⚠️ É necessário informar o status do atendimento.',
                text2: 'Ex.: Atendido, Cancelado, Remarcado...'
            });
            return;
        }

        if( !form?.evolucao && !form?.descricao ){
            Toast.show({
                type: 'error',
                text1: '⚠️ É necessário preencher a descrição',
                text2: 'Ou informar alguma observação.'
            });
            return;
        }


    }

    useEffect(()=>{
        console.log(status);
    }, [status]);


    useEffect(()=>{
        console.log("carregou!");

        // Toast.show({
        //     type: 'error',
        //     text1: 'Hello',
        //     text2: 'This is some something 👋'
        //   });

    },[]);


    return(
        <Container>

        <WrapToast>
            <Toast position={'top'}  autoHide={true} visibilityTime={6000} onPress={()=>Toast.hide()}/>
        </WrapToast>

        <IsCroll refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>{}}/>}>
            
            <Cabecalho titulo="Atendimento do Paciente" onPress={()=>{}} />

            <PacienteHeader iconeTipo="hospital" tipo="Plano Unimed SP" nome="Paulo Muzzy" />
              
            <WrapDiaAtendimento>
                <WrapBorder>
                    <DiaAtendimento>Atendimento do dia <Dia>26/04/2022</Dia></DiaAtendimento>
                </WrapBorder>
            </WrapDiaAtendimento>

            <WrapContent>
            
                <Select 
                    title={ tipoEvolucao.name }
                    isActive={ tipoEvolucao.key }
                    onPress={()=>{ setEvolucaoVisible(true) }}
                />

                <Select 
                    title={ status.name }
                    isActive={ status.key}
                    onPress={()=>{ setStatusVisible(true) }}
                />

                <InputForm 
                    name="evolucao"
                    control={control}
                    placeholder="Descrição do Atendimento/Evolução"
                    autoCapitalize="words"
                    autoCorrect={false}
                    multiline={true}
                    numberOfLines={4}
                    error={errors.evolucao && errors.evolucao.message}
                />

                <InputForm 
                    name="observacao"
                    control={control}
                    placeholder="Observações"
                    autoCapitalize="words"
                    autoCorrect={false}
                    multiline={true}
                    numberOfLines={4}
                    error={errors.observacao && errors.observacao.message}
                />

                <WrapBtn>
                    <ButtonSimple
                        type="default"
                        title="Salvar Informações" 
                        onPress={handleSubmit((d) =>  HandleRegister(d as any) )}
                    />
                </WrapBtn>

            </WrapContent>


            <ModalStatusAtendimento 
                setCategory={setStatus}
                visible={ statusVisible }
                statusAtual={status}
                closeModal={()=> setStatusVisible(false) }
            />

            <ModalTipoEvolucao 
                setCategory={setTipoEvolucao}
                visible={ evolucaoVisible }
                statusAtual={ tipoEvolucao }
                closeModal={()=> setEvolucaoVisible(false) }
            />

        </IsCroll>
        </Container>
    )
}