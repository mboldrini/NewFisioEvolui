import React, {useState, useEffect} from 'react';
import Modal from 'react-native-modal';
import { Cabecalho_Modal } from '../../../../components/Cabecalho_Modal';
import { Footer_Modal } from '../../../../components/Footers/Footer_Modal';
import { 
    Container,
    Body,
    LoadingIcon,
    WrapSemAtendimentos,
    AvisoSemAtendimentos
} from './styles';
/// Forms
import * as Yup from 'yup';

import { useSelector } from 'react-redux';
import { State } from '../../../../state';

import { api } from '../../../../global/api';

interface ICategory{
    key: number;
    name: string;
}


interface Props{
    visible: boolean;
    closeModal: () => void;
    setFormasPgto: (opcao: ICategory) => void;
}

const schema = Yup.object().shape({
    nome: Yup.string().required("Nome é obrigatório"),
});

interface IListaTipos{
    id: number,
    paymentMethod_name: string,
    description: string,
    paymentMethod_id: number,
    created_at: string,
    updated_at: string,    
}

import Toast from 'react-native-toast-message';
import { FlatList } from 'react-native';
import { List_TipoPagamento } from '../../../../components/List_Items/TiposDePagamentos';

export function Modal_ListarFormasPagamento({ visible, closeModal, setFormasPgto }: Props){

    const apiState = useSelector((state: State) => state.apiReducer);

    const [listaTipos, setListaTipos] = useState<IListaTipos[]>([]);

    const [loading, setLoading] = useState(true);

    async function GetFormasPagamento(){
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

            closeModal();
        });

        setLoading(false);
    }

    useEffect(()=>{
        if(visible == true){
            GetFormasPagamento();
        }
    }, [visible]);

    function SetOpcaoEscolhida(name: string, id: number){
        let ff = {
            key: id, 
            name: name
        };
        setFormasPgto(ff);
        console.log("Setou a opcao escolhida");
        console.log("FF");
        closeModal();
    }

    return(
    <Modal isVisible={visible} animationIn='slideInUp' animationOut='slideOutDown' animationInTiming={700} style={{width: '100%', margin: 0}}>
        <Container>

            <Cabecalho_Modal  titulo='Formas de Pagamento' onPress={()=> { closeModal() }} />

            <Body>


            { listaTipos &&
                    <FlatList 
                        data={listaTipos}
                        keyExtractor={(item) => item.paymentMethod_name}
                        renderItem={({item}) =>(
                            <List_TipoPagamento
                                paymentMethod_name={item.paymentMethod_name}
                                description={item.description}
                                onPress={()=>{ SetOpcaoEscolhida(item.paymentMethod_name, item.paymentMethod_id) }}
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

             


            </Body>

            <Footer_Modal onPressCancel={()=> { closeModal() }}/>

        </Container>
    </Modal>
    )
}