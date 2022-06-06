import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {FlatList, RefreshControl, ScrollView} from 'react-native';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import { State } from '../../../../state';
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
import { RoundButton } from '../../../../components/Buttons/RoundButton/Index';
import { List_TipoPagamento } from '../../../../components/List_Items/TiposDePagamentos';

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
    
    const apiState = useSelector((state: State) => state.apiReducer);

    const [listaTipos, setListaTipos] = useState<IListaTipos[]>([]);


    async function GetListaAtendimentos(){

        setListaTipos([]);
        setLoading(true);
       
        await api(apiState.token).get('paymentmethod/user/all').then(res =>{

            setListaTipos(res.data);

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
        GetListaAtendimentos();
    },[]);

 

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