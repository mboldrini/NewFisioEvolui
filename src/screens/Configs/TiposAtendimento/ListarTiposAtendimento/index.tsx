import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {FlatList, RefreshControl, ScrollView} from 'react-native';
import { toast } from '@backpackapp-io/react-native-toast';
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
import { SafeAreaView } from 'react-native-safe-area-context';

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

    function HandleListaAtendimentos(){

        if(atendimentosState.atendimentos.length > 0 && atendimentosState.atendimentos[0].id > 0 ){
            setListaTipos(atendimentosState.atendimentos);
            setLoading(false);
            console.log("Tem atendimentos via Redux, só seta");
        }else{
            GetListaAtendimentos();
            console.log("não tinha lista de atendimentos via redux");
        }
    }

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
            
            toast.error('Ops! Erro ao obter a lista de formas de pagamento', {duration: 6000, icon: '❌'});
        });

        setLoading(false);
    }

    function OpenModalTipoAtendimento(id: number){
        setModalId(id);
        setShowModal(true);
    }

    useEffect(()=>{
        // GetListaAtendimentos();
        // console.log("tem attendimentnos state?");
        // console.log(atendimentosState);
        HandleListaAtendimentos();
    },[]);

    useEffect(()=>{
        if(atendimentosState.atualiza){
            GetListaAtendimentos();
        }
    },[atendimentosState]);
 

    return(
<SafeAreaView style={{flex: 1, backgroundColor: '#63C2D1'}}>
    <Container >

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
                        <AvisoSemAtendimentos>Nenhum tipo de atendimento cadastrado</AvisoSemAtendimentos>
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
</SafeAreaView>
    )
}