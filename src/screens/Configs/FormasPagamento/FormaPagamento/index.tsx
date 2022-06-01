import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Alert, RefreshControl, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import { State } from '../../../../state';
import { 
    Container,
    WrapToast,
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
            Toast.show({
                type: 'error',
                text1: '⚠️ Erro ao obter informações',
            });
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

            Toast.show({
                type: 'success',
                text1: '😃 informações salvas com sucesso!',
                text2: 'uhull!'
            });

            setTimeout(()=>{
                navigation.goBack();
            }, 1500);

        }).catch(err => {
            console.log("ERRO");
            console.log(err);
            Toast.show({
                type: 'error',
                text1: '⚠️ Erro ao atualizar as informações',
            });
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

            Toast.show({
                type: 'success',
                text1: '😃 informações salvas com sucesso!',
                text2: 'uhull!'
            });

            setTimeout(()=>{
                navigation.goBack();
            }, 1500);

        }).catch(err => {
            console.log("ERRO");
            console.log(err);
            Toast.show({
                type: 'error',
                text1: '⚠️ Erro ao criar forma de pagamento',
            });
        });

        setLoading(false);
    }

    async function ExcluirFormaPagamento(id: number){
        setLoading(true);
       
        await api(apiState.token).delete(`/paymentmethod/${payment.id}` ).then(res =>{

            console.log("excluiu!");
            console.log(res.data);

            Toast.show({
                type: 'success',
                text1: '❌ Forma de pagamento excluída!',
            });

            setTimeout(()=>{
                navigation.goBack();
            }, 1500);

        }).catch(err => {
            console.log("ERRO");
            console.log(err);
            Toast.show({
                type: 'error',
                text1: '⚠️ Erro ao excluir forma de pagamento',
            });
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
        <Container>
        <WrapToast>
            <Toast position={'top'}  autoHide={true} visibilityTime={6000} onPress={()=>Toast.hide()}/>
        </WrapToast>

        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>{ GetFormaPagamento(id) }}/> } 
         contentContainerStyle={{flexGrow: 1}}>

            { payment &&
                <Cabecalho 
                    titulo="Forma de Pagamento" 
                    onPress={()=> navigation.goBack() } 
                    onPressDel={ ()=>  
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
    )
}