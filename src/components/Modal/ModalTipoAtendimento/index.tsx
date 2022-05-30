import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Button } from '../../Buttons/Button/Index';
import Modal from 'react-native-modal';
// REDUX
import { useSelector } from 'react-redux';
import { State } from '../../../state';
// API
import { api } from '../../../global/api';

import LottieView from 'lottie-react-native';
import { 
    Container,
    Category,
    Name,
    Separator,
    Wrap,
    WrapListaItens,
    AvisoLoading,
    AvisoSemTipoAtendimento,
    Footer,
    WrapContent
} from './styles';
import { Cabecalho } from '../../Cabecalho';


interface ITipoList{
    id: number,
    nome: string,
    valor_atendimento: number,
    descricao: string
}

interface ITipoSimples{
    key: number,
    name: string
}

interface Props{
    setCategory: ( ativo: ITipoSimples )=> void;
    isVisible: boolean;
    setIsVisible: () => void;
    statusAtual: ITipoSimples
}

export function ModalTipoAtendimento({
    setCategory,
    isVisible,
    setIsVisible,
    statusAtual
}: Props ){

    const apiState = useSelector((state: State) => state.apiReducer);

    const [loading, setLoading] = useState(true);

    const [listaTipo, setListaTipo] = useState<ITipoList[]>([]);

    async function GetTypeList(){
        
        setLoading(true);

        await api(apiState.token).get('/tipoAtendimento/all').then(res =>{
            console.log(res.data);
            setListaTipo(res.data);
        }).catch(err => {
            console.log("ERRO");
            console.log(err);
            alert("ERRO! "+ err);
        });

        setLoading(false);
    }

    function HandleCategorySelect(item: ITipoList){
        setCategory({
            key: item.id,
            name: item.nome
        });
    }

    useEffect(()=>{
        GetTypeList();
    },[]);

    return(
        <Modal 
            isVisible={isVisible} 
            animationIn='slideInUp' 
            animationOut='slideOutDown' 
            animationInTiming={700} 
            style={{width: '100%', margin: 0}}
        >
        <Container>
            <Cabecalho titulo="Tipos de Atendimentos" onPress={()=> setIsVisible() } arrowSide="chevron-down" />

            { loading &&
                <Wrap>
                    <LottieView
                        source={require('../../../assets/loadingAnimado250.json')}
                        autoSize
                        autoPlay
                        loop
                        resizeMode='contain'
                    />
                    <AvisoLoading>Carregando lista...</AvisoLoading>
                </Wrap>
            }

            { !loading  && listaTipo.length < 1 &&
                <AvisoSemTipoAtendimento>Nenhum tipo de atendimento cadastrado</AvisoSemTipoAtendimento>
            }

            <WrapContent>

            { !loading && listaTipo.length > 0 &&
                <WrapListaItens>
                <FlatList 
                    data={listaTipo}
                    keyExtractor={(item) => item.nome}
                    renderItem={({item}) =>(
                        <Category
                            onPress={() => HandleCategorySelect(item) }
                            isActive={ statusAtual.key == item.id }
                        >
                            <Name>{item.nome}</Name>
                        </Category>
                    )}
                    ItemSeparatorComponent={() => <Separator />}
                /> 
                </WrapListaItens>
            }
        
            { !loading && listaTipo.length > 0 &&
                <Footer>
                    <Button title="Selecionar"  onPress={()=> setIsVisible() } />
                </Footer>
            }

            </WrapContent>

        </Container>
        </Modal>
    )
}