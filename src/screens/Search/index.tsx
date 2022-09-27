import React, { useEffect, useState } from 'react';
import { FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
    Container,
    SearchInput,
    WrapCabecalho,
    Header,
    WrapBtn,
    Icone,

    WrapOpcoesList,
    BtnArea,
    BtnText,

    Wrap,
    LoadingIcon
} from './styles';

export function Search(){

    const opcoes = [
        {nome: "Nome", slug:"nome" },
        {nome: "Email", slug:"email" },
        {nome: "CPF", slug:"cpf" },
        {nome: "Endereço", slug:"endereco" },
        {nome: "Telefone", slug:"telefone" },
    ];

    const [opcao, setOpcao] = useState('nome');
    const [text, onChangeText] = useState("");

    const [loading, setLoading] = useState(false);

    async function HandlePesquisa(){
        console.group("HandlePesquisa");


        console.log("vai pesquisar por: "+ text  +" - "+ opcao);


        console.groupEnd();
    }


    useEffect(()=>{
        onChangeText("");
    }, [opcao]);

    return(
<SafeAreaView style={{flex: 1, backgroundColor: '#63C2D1'}}>
    <Container >

        <WrapCabecalho>
            <Header>
                <SearchInput placeholder="Pesquisar..." autoCapitalize="words" autoCorrect={false} onChangeText={onChangeText} value={text} />
                <WrapBtn onPress={()=> HandlePesquisa() }>
                    <Icone name="search" />
                </WrapBtn>
            </Header>

            <WrapOpcoesList>
                <FlatList
                    data={opcoes}
                    keyExtractor={(item) => item.nome}
                    horizontal={true}
                    renderItem={({item}) =>{
                        return (
                            <BtnArea enabled={ item.slug == opcao ? true : false } onPress={()=> setOpcao(item.slug) }>
                                <BtnText enabled={ item.slug == opcao ? true : false }>{item.nome}</BtnText>
                            </BtnArea>
                        )} 
                    }
                />
            </WrapOpcoesList>
        </WrapCabecalho>


        {loading &&
            <Wrap>
                <LoadingIcon size="large" color="#FFFFFF"/>   
            </Wrap>
        }
      

    </Container>
</SafeAreaView>
    )
}