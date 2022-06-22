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
import { List_TipoPagamento } from '../../../../components/List_Items/TiposDePagamentos';

// /// REDUX
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators, State } from '../../../../state';

interface IListaTipos{
    id: number,
    paymentMethod_name: string,
    description: string,
    paymentMethod_id: number,
    created_at: string,
    updated_at: string,    
}

export function ListarFormasPagamento(){
    
    const navigation = useNavigation();
    const [refreshing, setRefresh] = useState(false);

    const [loading, setLoading] = useState(true);

    const [listaTipos, setListaTipos] = useState<IListaTipos[]>([]);

    ///Reducer
    const dispatch = useDispatch();
    const { setFormasPgto } = bindActionCreators(actionCreators, dispatch);
    const formasPgtoState = useSelector((state: State) => state.formasPgtoReducer);   

    const apiState = useSelector((state: State) => state.apiReducer);


    function HandleListaAtendimentos(){
        if(formasPgtoState.pagamentos.length >= 1 || formasPgtoState.pagamentos[0].id != 0 ){
            console.log("já tem a lista de formas de pagamento no redux");
            setListaTipos(formasPgtoState.pagamentos);
        }else{
            GetListaAtendimentos();
            console.log("vai pegar a lista dos pagamentos via api");
        }
    }

    async function GetListaAtendimentos(){

        setListaTipos([]);
        setLoading(true);
       
        await api(apiState.token).get('paymentmethod/user/all').then(res =>{

            setListaTipos(res.data);
            setFormasPgto(res.data);

        }).catch(err => {
            console.log("ERRO");
            console.log(err);
            Toast.show({
                type: 'error',
                text1: '⚠️ Erro ao obter lista de formas de pagamento',
            });
        });

        setLoading(false);
    }

    useEffect(()=>{
        HandleListaAtendimentos();
    },[]);

    useEffect(()=>{
        console.group("FormasPgtoState");
            console.log(formasPgtoState);
        console.groupEnd();
    },[formasPgtoState]);

 

    return(
        <Container>
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>{ GetListaAtendimentos() }}/> } 
         contentContainerStyle={{flexGrow: 1}}>

            <Cabecalho 
                titulo="Formas de Pagamento" 
                onPress={()=> navigation.goBack() } 
                onPressSecond={()=> { navigation.navigate('FormaPagamento' as never, { id: null } as never  ) }} 
                onPressSecondIcon="plus"
            />

            <WrapCentral>

            <WrapItens>

                { listaTipos &&
                    <FlatList 
                        data={listaTipos}
                        keyExtractor={(item) => item.paymentMethod_name}
                        renderItem={({item}) =>(
                            <List_TipoPagamento
                                paymentMethod_name={item.paymentMethod_name}
                                description={item.description}
                                onPress={()=>{ navigation.navigate('FormaPagamento' as never, { id: item.id } as never ) }}
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
        </ScrollView>
        </Container>
    )
}