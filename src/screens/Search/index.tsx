import React, {useEffect, useRef, useState}from 'react';
import { FlatList, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
// API
import { api } from '../../global/api';
// REDUX
import { useSelector } from 'react-redux';
import { State } from '../../state';
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
    LoadingIcon,
    WrapFlatList
} from './styles';
import { PacienteList } from '../../components/PacienteList';

import { toast } from '@backpackapp-io/react-native-toast';

interface IListPcts{
    address: string,
    celphone: string,
    dataNascimento: string,
    document: string,
    email: string,
    id: number,
    instagram: string,
    latitude: string,
    longitude: string,
    name: string,
    second_celphone: string
    serviceType: {
        id: number, 
        name: string, 
        description: string
    },
    created_at: Date,
    updated_at: Date
}

export function Search(){

    const opcoes = [
        {nome: "Nome", slug:"nome" },
        {nome: "Email", slug:"email" },
        {nome: "CPF", slug:"cpf" },
        {nome: "Endereço", slug:"endereco" },
        {nome: "Telefone", slug:"telefone" },
    ];

    const navigation = useNavigation();
    const apiState = useSelector((state: State) => state.apiReducer);


    const [opcao, setOpcao] = useState('nome');
    const [text, onChangeText] = useState("");

    const [loading, setLoading] = useState(false);

    const [optionsList, setOptionsList] = useState<IListPcts[]>(null);

    async function HandlePesquisa(){
        console.group("HandlePesquisa");

        setOptionsList(null);

        if(text.length < 1) return;

        console.log("vai pesquisar por: "+ text  +" - "+ opcao);

        setLoading(true);

        let params = {};

        if(opcao == "email")    { params = { email:    text } }
        if(opcao == "nome")     { params = { name:     text } }
        if(opcao == "cpf")      { params = { cpf:      text } }
        if(opcao == "telefone") { params = { telefone: text } }
        if(opcao == "endereco") { params = { endereco: text } }
        

        console.log(params);

        await api(apiState.token).post('clients/findFF', params).then(res => {

            console.log(res.data);
            setOptionsList(res.data);

        }).catch(err =>{
            console.log("ERRO!");
            console.log(err.message);
      
            toast.error('Ops! Erro ao obter a lista de pacientes', {duration: 6000, icon: '❌'});
        });

        setLoading(false);


        console.groupEnd();
    }
    
    function HandleNavigate(id: number){
        navigation.navigate('PacientePerfil' as never,{
            id: id
        } as never);
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

        {!loading && optionsList?.length &&
            <WrapFlatList>
                <FlatList 
                    data={optionsList}
                    keyExtractor={pct => pct.id+""}
                    renderItem={({item}) =>(
                        <PacienteList
                            key={item.id}
                            companyIcon={"hospital"}/*{item.companyIcon}*/
                            companyName={ item.serviceType.name }
                            personName={ item.name }
                            address={ item.address }
                            onPress={()=>{ HandleNavigate(item.id) }}
                        />
                    )}
                />
            </WrapFlatList>
        }





    </Container>
</SafeAreaView>
)}