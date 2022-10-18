import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Alert, RefreshControl, ScrollView } from 'react-native';
import { toast } from '@backpackapp-io/react-native-toast';

// /// REDUX
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators, State } from '../../../../state';

import { 
    Container,
    WrapCentral,
    WrapItens,
    LoadingIcon,

    Wrap,
    
    ContentCreated,
    WrapCreated,
    TitleCreated,
    DateCreated,
    WrapFooterCadastro,


} from './styles';
import { Cabecalho } from '../../../../components/Cabecalho';

import { api } from '../../../../global/api';
/// Input's
import { InputForm } from '../../../../components/Forms/InputForm';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Button } from '../../../../components/Buttons/Button/Index';
import { SafeAreaView } from 'react-native-safe-area-context';

interface IRouteParam{
    id?: number;
}

interface IPayment{
    id: number;
    paymentMethod_name: string;
    description: string;
    paymentMethod_id: number;
    updated_at: string;
    created_at: string;
}

const schema = Yup.object().shape({
    formaPagamento: Yup.string().required("Nome é obrigatório"),
    descricao: Yup.string().optional(),
});

export function FormaPagamento(){
    
    const navigation = useNavigation();
    const route = useRoute();
    const [refreshing, setRefresh] = useState(false);

    const [loading, setLoading] = useState(true);

    const { id } = route.params as IRouteParam;
    
    const apiState = useSelector((state: State) => state.apiReducer);

    ///Reducer
    const dispatch = useDispatch();
    const { setUpdateFormasPgto } = bindActionCreators(actionCreators, dispatch);

    const [payment, setPayment] = useState<IPayment>(null);

    const { control, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(schema) });


    async function GetFormaPagamento(idPagamento: number){

        setLoading(true);

        console.log("Pega o id: "+ idPagamento);
       
        await api(apiState.token).get('/paymentmethod/'+ idPagamento).then(res =>{

            setPayment(res.data);

            if(res.data.paymentMethod_name){
                reset({
                    formaPagamento: res.data.paymentMethod_name,
                    descricao: res.data.description
                });
            }
          

        }).catch(err => {
            console.log("ERRO");
            console.log(err.message);
            
            toast.error('Ops! Erro ao obter as informações', {duration: 6000, icon: '❌'});
        });

        setLoading(false);
    }

    function HandleRegister(formInfos: FormData){
        if(payment){
            AtualizaFormaPagamento(formInfos);
        }else{
            CriaFormaPagamento(formInfos);
        }
    }

    async function AtualizaFormaPagamento(formInfos: any){
        setLoading(true);

        let nome = formInfos.formaPagamento.toUpperCase()

        let infos = {
            name: nome,
            description: formInfos.descricao
        }
       
        await api(apiState.token).patch(`/paymentmethod/${payment.id}`, infos ).then(res =>{

            console.log("SALVOUU!");
            console.log(res.data);

            setUpdateFormasPgto(true);

            toast.success('Informações salvas com sucesso!', {duration: 6000, icon: '✅'});

            setTimeout(()=>{
                navigation.goBack();
            }, 1500);

        }).catch(err => {
            console.log("ERRO");
            console.log(err);
        
            toast.error('Ops! Erro ao atualizar as informações', {duration: 6000, icon: '❌'});
        });

        setLoading(false);
    }

    async function CriaFormaPagamento(formInfos: any){
        setLoading(true);

        let nome = formInfos.formaPagamento.toUpperCase()

        let infos = {
            name: nome,
            description: formInfos.descricao
        }
       
        await api(apiState.token).post("/paymentmethod/", infos ).then(res =>{

            console.log("SALVOUU!");
            console.log(res.data.message);

            setUpdateFormasPgto(true);

            toast.success('Informações salvas com sucesso!', {duration: 6000, icon: '✅'});

            setTimeout(()=>{
                navigation.goBack();
            }, 1500);

        }).catch(err => {
            console.log("ERRO");
            console.log(err);
            toast.error('Ops! Erro ao criar forma de pagamento', {duration: 6000, icon: '❌'});
        });

        setLoading(false);
    }

    async function ExcluirFormaPagamento(id: number){
        setLoading(true);
       
        await api(apiState.token).delete(`/paymentmethod/${payment.id}` ).then(res =>{

            console.log("excluiu!");
            console.log(res.data);

            setUpdateFormasPgto(true);

            toast.success('Forma de pagamento excluída!', {duration: 6000, icon: '✅'});

            setTimeout(()=>{
                navigation.goBack();
            }, 1500);

        }).catch(err => {
            console.log("ERRO");
            console.log(err.response.data);
        
            toast.error('Ops! Erro ao excluir forma de pagamento', {duration: 6000, icon: '❌'});

            if(err.response.data.status === 'error'){
                navigation.goBack();
            }
        });

        setLoading(false);
    }

    useEffect(()=>{
        if(id && id != null){
            GetFormaPagamento(id);
        }else{
            setLoading(false);
        }
    }, [id]);



    return(
<SafeAreaView style={{flex: 1, backgroundColor: '#63C2D1'}}>
    <Container >
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>{ GetFormaPagamento(id) }}/> } 
         contentContainerStyle={{flexGrow: 1}}>

            { payment &&
                <Cabecalho 
                    titulo="Forma de Pagamento" 
                    onPress={()=> navigation.goBack() } 
                    onPressSecond={ ()=>  
                        Alert.alert(
                            "Atenção", "Deseja excluir essa forma de pagamento",
                            [
                                { text: "Sim", onPress: () => ExcluirFormaPagamento(payment.id) },
                                { text: "Cancelar", style: "cancel" },
                            ]
                        )
                    } 
                />
            }
            { !payment &&
                <Cabecalho titulo="Forma de Pagamento" onPress={()=> navigation.goBack() } />
            }

        <WrapCentral>

            <WrapItens>

                { loading &&
                    <LoadingIcon size="large" color="#FFFFFF"/>            
                }

            </WrapItens>

            { loading == false &&
            <Wrap>

                <InputForm 
                    name="formaPagamento"
                    control={control}
                    placeholder="Forma de Pagamento"
                    autoCapitalize="words"
                    autoCorrect={false}
                    error={errors.formaPagamento && errors.formaPagamento.message}
                />

                <InputForm 
                    name="descricao"
                    control={control}
                    placeholder="Descrição"
                    autoCapitalize="words"
                    autoCorrect={false}
                    multiline={true}
                    numberOfLines={4}
                    error={errors.descricao && errors.descricao.message}
                />

                { payment &&
                <ContentCreated>
                    <WrapCreated>
                        <TitleCreated>Criado em: </TitleCreated>
                        <DateCreated>{ payment.created_at.split(" ")[0] }</DateCreated>
                    </WrapCreated>
                    <WrapCreated>
                        <TitleCreated>Ultima atualização: </TitleCreated>
                        <DateCreated>{ payment.updated_at.split(" ")[0] }</DateCreated>
                    </WrapCreated>
                </ContentCreated>
                }

            </Wrap>
            }

            { loading == false &&
            <WrapFooterCadastro>
                <Button 
                    title="Salvar" 
                    onPress={handleSubmit((d) =>  HandleRegister(d as any) )}
                    // onPress={()=> { console.log("ué")}}
                    type="ok"
                />
            </WrapFooterCadastro>
            }
           
           

        </WrapCentral>
        </ScrollView>
    </Container>
</SafeAreaView>
    )
}