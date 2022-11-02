import React, {useEffect, useState}from 'react';
import {RefreshControl, Alert} from 'react-native';
import {useNavigation, useRoute } from '@react-navigation/native';
import { 
    Container,
    IsCroll,
    WrapDiaAtendimento,
    WrapBorder,
    Dia,
    DiaAtendimento,
    WrapBtn,
    WrapContent,
    LoadingIcon,
    WrapLoading
} from './styles';
// Cabeçalho, parte estetica
import { Cabecalho } from '../../../components/Cabecalho';
import { PacienteHeader } from '../../../components/PacienteHeader';
//Campos dos forms e botão
import { Select } from '../../../components/Forms/Select';
import { InputForm } from '../../../components/Forms/InputForm';
import { ButtonSimple } from '../../../components/Buttons/ButtonSimple/Index';
// Formulario
import { useForm } from 'react-hook-form';
// Yup do Formulário
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ModalStatusAtendimento } from '../../../components/Modal/ModalStatusAtendimento';
import { ModalTipoEvolucao } from '../../../components/Modal/ModalTipoEvolucao';
// ToastMessage para avisos ao usuário
import { toast } from '@backpackapp-io/react-native-toast';

import { api } from '../../../global/api';

import { useSelector } from 'react-redux';
import { State } from '../../../state';

import { statusAtendimento, tiposAtendimentos } from '../../../global/variaveis/globais';

const schema = Yup.object().shape({
    evolucao: Yup.string().optional(),
    observacao: Yup.string().optional()
});

interface IFormData{
    evolucao?: string;
    observacao?: string;
}

interface IAtendInfos{
    id: number,
    evolucao: string
    observacoes: string,
    status: number,
    tipo: number,
    agendamento_id: number,
    paciente_id: number,
    paciente_nome: string,
    nome_tipoAtendimento: string,
    data: string,
    hora: number,
}

interface IAtendInfosUpdate{
    id: number,
    evolucao: string,
    observacoes: string,
    status: number,
    tipo: number,
}

interface ParamsProps{
    id?: number;
}

export function PacienteAtendimento(){

    const navigation = useNavigation();
    const route = useRoute();
    const [refreshing, setRefresh] = useState(false);

    const { id } = route.params as ParamsProps;
    
    const apiState = useSelector((state: State) => state.apiReducer);

    const [idEvolucao, setIdEvolucao] = useState(null);
    const [loading, setLoading] = useState(false);

    const [atendimentoInfos, setAtendimentoInfos] = useState<IAtendInfos>(null);

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

    function FormatDateHour(dt: string, horario: number){

        const [data, horaIgnore] = dt.split('T');
        const [ano, mes, dia] = data.split("-");

        let hora = 8.33;
        
        console.log ( Math.floor(hora % 1) );

        let dtt = new Date(parseInt(ano), parseInt(mes), parseInt(dia), 8, hora % 1 );
        console.log(dtt);

        return dia +"/"+ mes +"/"+ ano +" as ";
    }

    function HandleRegister(form: IFormData){

        if( tipoEvolucao.key == -1 ){
            toast.error('É necessário informar o tipo da evolução.', {duration: 6000, icon: '⚠️'});
            return;
        }

        if( status.key == -1){
            toast.error('É necessário informar o status do atendimento.', {duration: 6000, icon: '⚠️'});
            return;
        }

        if( !form?.evolucao && !form?.observacao ){
            toast.error('É necessário preencher a descrição.', {duration: 6000, icon: '⚠️'});
            return;
        }

        let infos = {
            id: atendimentoInfos.id,
            evolucao: form.evolucao,
            observacoes: form.observacao,
            status: status.key,
            tipo: tipoEvolucao.key,
        }

        UpdateAtendimentoInfos(infos);

    }

    async function UpdateAtendimentoInfos(infos: IAtendInfosUpdate){
        await api(apiState.token).put('/evolucao/', infos).then(res=>{

            setLoading(true);

            toast.success('Informações salvas com sucesso!', {duration: 6000, icon: '✅'});

            setTimeout(()=>{
                navigation.goBack();
            }, 2500);

        }).catch(err=>{
            console.error(err);

            toast.error('Ops! Erro ao salvar as informações do atendimento.', {duration: 6000, icon: '❌'});

            setTimeout(()=>{
                navigation.goBack();
            }, 2500);
        });

        setLoading(false);
    }

    async function GetAtendimentoInfos(id: number){
        await api(apiState.token).get('/evolucao/agendamentoId/'+ id).then(res=>{

            setAtendimentoInfos(res.data);

        }).catch(err=>{
            console.error(err);

            toast.error('Ops! Erro ao obter as informações do atendimento.', {duration: 6000, icon: '❌'});

            setTimeout(()=>{
                navigation.goBack();
            }, 2500);
        });
    }

    function AtualizaInfoCampos(){
        setStatus({
            key: atendimentoInfos.status,
            name: statusAtendimento[atendimentoInfos.status]
        });

        setTipoEvolucao({
            key: atendimentoInfos.tipo,
            name: tiposAtendimentos[atendimentoInfos.tipo]
        });

        reset({
            evolucao: atendimentoInfos.evolucao,
            observacao: atendimentoInfos.observacoes
        });

    }

    function HandleDeleteAppointment(id: number){

            console.log(atendimentoInfos);

        console.log(`Deleta o ID: ${id}`);

        Alert.alert(
            "Deseja excluir esse atendimento?",
            atendimentoInfos.paciente_nome,
            [
              {
                text: "Excluir",
                onPress: () => Alert.alert("Cancel Pressed"),
              },
              {
                text: "Cancelar",
              },
            ],
            
          );

    }

    useEffect(()=>{
        if(id){
            setIdEvolucao(id);
        }
    },[]);

    useEffect(()=>{
        if(idEvolucao){
            GetAtendimentoInfos(idEvolucao);
        }
    },[idEvolucao]);

    useEffect(()=>{
        if(atendimentoInfos){
            AtualizaInfoCampos();          
        }
    },[atendimentoInfos]);

    return(
        <Container>

        <IsCroll refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>{ navigation.goBack() }}/>}>
            
            <Cabecalho titulo="Atendimento do Paciente" onPress={()=>{ navigation.goBack() }} onPressSecond={()=> HandleDeleteAppointment(id) } />

            { atendimentoInfos && !loading &&
                <PacienteHeader iconeTipo="hospital" tipo={atendimentoInfos.nome_tipoAtendimento} nome={atendimentoInfos.paciente_nome} />
            }
              
            { atendimentoInfos && !loading &&
            <WrapDiaAtendimento>
                <WrapBorder>
                    <DiaAtendimento>Atendimento do dia <Dia>{ FormatDateHour(atendimentoInfos.data, atendimentoInfos.hora) }</Dia></DiaAtendimento>
                </WrapBorder>
            </WrapDiaAtendimento>
            }

            { atendimentoInfos && !loading &&
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
            }

            { !atendimentoInfos && loading &&
                <WrapLoading>
                    <LoadingIcon size="large" color="#FFFFFF"/>   
                </WrapLoading>
            }


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