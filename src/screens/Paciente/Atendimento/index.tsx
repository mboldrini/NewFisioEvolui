import React, {useEffect, useState}from 'react';
import {RefreshControl} from 'react-native';
import {useNavigation } from '@react-navigation/native';
import { 
    Container,
    WrapDiaAtendimento,
    WrapBorder,
    Dia,
    DiaAtendimento,

    WrapContent
} from './styles';

import { Cabecalho } from '../../../components/Cabecalho';
import { PacienteHeader } from '../../../components/PacienteHeader';

import { Select } from '../../../components/Forms/Select';
import { InputForm } from '../../../components/Forms/InputForm';
// Formulario
import { useForm } from 'react-hook-form';
// Yup do Formulário
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ModalStatusAtendimento } from '../../../components/Modal/ModalStatusAtendimento';
import { ModalTipoEvolucao } from '../../../components/Modal/ModalTipoEvolucao';

const schema = Yup.object().shape({
    nome: Yup.string().required("Nome é obrigatório"),
})

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

    useEffect(()=>{
        console.log(status);
    }, [status]);


    return(
        <Container refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>{}}/>}>
            
            <Cabecalho 
                titulo="Atendimento do Paciente"
                onPress={()=>{}}
            />

            <PacienteHeader 
                iconeTipo="hospital"
                tipo="Plano Unimed SP"
                nome="Paulo Muzzy"
            />
              
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

        </Container>
    )
}