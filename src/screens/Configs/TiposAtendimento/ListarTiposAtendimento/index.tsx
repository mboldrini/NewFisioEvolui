import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {FlatList, RefreshControl, ScrollView} from 'react-native';
import Toast from 'react-native-toast-message';
import { 
    Container,
    WrapCentral,
    WrapItens,
    LoadingIcon,
    WrapSemAtendimentos,
    AvisoSemAtendimentos,
} from './styles';
import { Cabecalho } from '../../../../components/Cabecalho';

import { api } from '../../../../global/api';
import { List_TipoAtendimento } from '../../../../components/List_Items/TiposDeAtendimentos';
import { Modal_TipoAtendimento } from '../Modal_TipoAtendimento';
// /// REDUX
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators, State } from '../../../../state';

interface IListaTipos{
    id: number,
    name: string;
    description: string,
    duration: string,
    price: number,
    created_at: string,
    updated_at: string,    
}

export function ListarTiposAtendimento(){
    
    const navigation = useNavigation();
    const [refreshing, setRefresh] = useState(false);

    const [loading, setLoading] = useState(true);


    const dispatch = useDispatch();
    const { setAtendimentos, setAtualizaAtendimentos } = bindActionCreators(actionCreators, dispatch);

    const atendimentosState = useSelector((state: State) => state.atendimentoReducer);    
    const apiState = useSelector((state: State) => state.apiReducer);

    const [listaTipos, setListaTipos] = useState<IListaTipos[]>([]);

    const [modalId, setModalId] = useState(null);
    const [showModal, setShowModal] = useState(false);


    async function GetListaAtendimentos(){

        setListaTipos([]);
        setLoading(true);
       
        await api(apiState.token).get('servicesTypes/user/all').then(res =>{

            setAtualizaAtendimentos(
                false
            );

            setListaTipos(res.data);
            setAtendimentos(res.data);

        }).catch(err => {
            console.log("ERRO");
            console.log(err);
            Toast.show({
                type: 'error',
                text1: '⚠️ Ops!',
                text2: 'erro ao obter lista de formas de pagamento',
            });
        });

        setLoading(false);
    }

    function OpenModalTipoAtendimento(id: number){
        setModalId(id);
        setShowModal(true);
    }

    useEffect(()=>{
        GetListaAtendimentos();
    },[]);

    useEffect(()=>{
        if(atendimentosState.atualiza){
            GetListaAtendimentos();
        }
    },[atendimentosState]);
 

    return(
        <Container>

        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>{ GetListaAtendimentos() }}/> } 
         contentContainerStyle={{flexGrow: 1}}>

            <Cabecalho 
                titulo="Tipos de Atendimentos" 
                onPress={()=> navigation.goBack() } 
                onPressSecond={()=> { setModalId(null); setShowModal(true) }} 
                onPressSecondIcon="plus"
            />

            <WrapCentral>

            <WrapItens>

                { listaTipos &&
                    <FlatList 
                        data={listaTipos}
                        keyExtractor={(item) => item.id +""}
                        renderItem={({item}) =>(
                            <List_TipoAtendimento 
                                nome={item.name} 
                                preco={item.price} 
                                duracao={item.duration} 
                                id={item.id} 
                                onPress={()=> { OpenModalTipoAtendimento(item.id) }}    
                            />
                            
                        )}
                    />
                }

                { loading &&
                    <LoadingIcon size="large" color="#FFFFFF"/>            
                }

                { !loading && listaTipos.length < 1 &&
                    <WrapSemAtendimentos>
                        <AvisoSemAtendimentos>Nenhuma forma de pagamento cadastrada </AvisoSemAtendimentos>
                    </WrapSemAtendimentos>
                }

            </WrapItens>
            
            </WrapCentral>

            <Modal_TipoAtendimento 
                visible={showModal} 
                closeModal={() => setShowModal(false) } 
                id={modalId}
            />

        </ScrollView>
    </Container>
    )
}