import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Button } from '../../Forms/Button/Index';

// REDUX
import { useSelector } from 'react-redux';
import { State } from '../../../state';

// API
import { api } from '../../../global/api';

import { 
    Container,
    Header,
    Titulo,
    Category,
    Name,
    Separator,
    Wrap,
    AvisoLoading,
    Footer,
} from './styles';


interface ITipoList{
    id: number,
    tipo: string,
    valor_atendimento: number,
    descricao: string
}

interface ITipoSimples{
    key: number,
    name: string
}

interface Props{
    setCategory: ( ativo: ITipoSimples )=> void;
    closeSelectCategory: () => void;
 /*   statusAtual: ICategory*/
}

export function ModalTipoAtendimento({
    setCategory,
    closeSelectCategory,
    /*statusAtual*/
}: Props ){

    const apiState = useSelector((state: State) => state.apiReducer);

    const [listaTipo, setListaTipo] = useState<ITipoList[]>([]);

    async function GetTypeList(){
        console.log("Pegando via api?");

        await api(apiState.token).get('/tipoAtendimento/all').then(res =>{
            console.log(res.data);
            setListaTipo(res.data);
        }).catch(err => {
            console.log("ERRO");
            console.log(err);;
        });
    }

    function HandleCategorySelect(item: ITipoList){
        setCategory({
            key: item.id,
            name: item.tipo
        });
    }

    useEffect(()=>{
        console.log("Modal Abriu");
        GetTypeList();
    },[]);

    return(
        <Container>
            <Header>
                <Titulo>Tipo de Atenedimento</Titulo>
            </Header>

            { listaTipo.length < 1 &&
                <Wrap>
                    <AvisoLoading>Carregando lista...</AvisoLoading>
                </Wrap>
            }

            { listaTipo.length > 0 &&
                <FlatList 
                    data={listaTipo}
                    keyExtractor={(item) => item.tipo}
                    renderItem={({item}) =>(
                        <Category
                            onPress={() => HandleCategorySelect(item) }
                            isActive={ false }
                        >
                            <Name>{item.tipo}</Name>
                        </Category>
                    )}
                    ItemSeparatorComponent={() => <Separator />}
                /> 
            }

        

            <Footer>
                <Button 
                    title="Selecionar" 
                    onPress={closeSelectCategory}
                />
            </Footer>
            

        </Container>
    )
}