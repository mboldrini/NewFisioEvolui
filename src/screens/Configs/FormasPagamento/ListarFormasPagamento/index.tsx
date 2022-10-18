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
import { List_TipoPagamento } from '../../../../components/List_Items/TiposDePagamentos';

// /// REDUX
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators, State } from '../../../../state';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    const { setFormasPgto, setUpdateFormasPgto } = bindActionCreators(actionCreators, dispatch);
    const formasPgtoState = useSelector((state: State) => state.formasPgtoReducer);   

    const apiState = useSelector((state: State) => state.apiReducer);


    function HandleListaAtendimentos(){
        if(formasPgtoState.pagamentos.length > 1){
            console.log("já tem a lista de formas de pagamento no redux");
            setListaTipos(formasPgtoState.pagamentos);
            setLoading(false);
        }else{
            GetListaPagamentos();
            console.log("vai pegar a lista dos pagamentos via api");
        }
    }

    async function GetListaPagamentos(){

        setListaTipos([]);
        setLoading(true);
       
        await api(apiState.token).get('paymentmethod/user/all').then(res =>{

            setListaTipos(res.data);
            setFormasPgto(res.data);
            setUpdateFormasPgto(false);
            console.log("Lista Formas de PGTO atualizada!");

        }).catch(err => {
            console.log("ERRO");
            console.log(err);
         
            toast.error('Ops! Erro ao obter a lista de formas de pagamento', {duration: 6000, icon: '❌'});
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
        if(formasPgtoState.atualiza){
            GetListaPagamentos();
        }
    },[formasPgtoState]);

 

    return(
<SafeAreaView style={{flex: 1, backgroundColor: '#63C2D1'}}>
    <Container >
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>{ GetListaPagamentos() }}/> } 
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

                { loading == true &&
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
</SafeAreaView>
    )
}