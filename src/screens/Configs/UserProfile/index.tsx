import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Alert, RefreshControl, ScrollView } from 'react-native';
import { toast } from '@backpackapp-io/react-native-toast';

// /// REDUX
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators, State } from '../../../state';

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
    WrapExpandTitle,
    ExpandableTitle,


} from './styles';
import { Cabecalho } from '../../../components/Cabecalho';

import { api } from '../../../global/api';
/// Input's
import { InputForm } from '../../../components/Forms/InputForm';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Button } from '../../../components/Buttons/Button/Index';
import { SafeAreaView } from 'react-native-safe-area-context';
import { InputMasked } from '../../../components/Forms/InputMasked';
import { InputFake } from '../../../components/Forms/InputFake';

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

export function UserProfile(){
    
    const navigation = useNavigation();
    const route = useRoute();
    const [refreshing, setRefresh] = useState(false);

    const [loading, setLoading] = useState(false);

    
    const apiState = useSelector((state: State) => state.apiReducer);

    const { control, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(schema) });


    return(
<SafeAreaView style={{flex: 1, backgroundColor: '#63C2D1'}}>
    <Container >
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>{ console.log('pega infos de novo') }}/> } 
         contentContainerStyle={{flexGrow: 1}}>

        <Cabecalho titulo="Forma de Pagamento" onPress={()=> navigation.goBack() } />

        <WrapCentral>

            <WrapItens>

                { loading &&
                    <LoadingIcon size="large" color="#FFFFFF"/>            
                }

            </WrapItens>

            { loading == false &&
            <Wrap>

                <InputForm name="nome" control={control} placeholder="Nome" autoCapitalize="words" autoCorrect={false}
                    error={errors.nome && errors.nome.message}
                />

                <InputForm name="sobrenome" control={control} placeholder="Sobrenome" autoCapitalize="words" autoCorrect={false}
                    error={errors.sobrenome && errors.sobrenome.message}
                />


                <WrapExpandTitle>
                    <ExpandableTitle>Informações de Contato</ExpandableTitle>
                </WrapExpandTitle>

                <InputForm name="email" control={control} placeholder="Email Profissional" autoCapitalize="words" autoCorrect={false}
                    error={errors.email && errors.email.message}
                />

                <InputForm name="celular" control={control} placeholder="Tel. Celular" autoCapitalize="words" autoCorrect={false}
                    error={errors.celular && errors.celular.message}
                />

                <InputForm name="instagram" control={control} placeholder="Instagram" autoCapitalize="words" autoCorrect={false}
                    error={errors.instagram && errors.instagram.message}
                />

                <InputForm name="website" control={control} placeholder="Website" autoCapitalize="words" autoCorrect={false}
                    error={errors.website && errors.website.message}
                />

                <WrapExpandTitle>
                    <ExpandableTitle>Endereço</ExpandableTitle>
                </WrapExpandTitle>


                <InputForm name="endereco" control={control} placeholder="Logradouro" autoCapitalize="words" autoCorrect={false}
                    error={errors.endereco && errors.endereco.message}
                />

                <InputForm name="numero" control={control} placeholder="Nº" autoCapitalize="words" autoCorrect={false}
                    error={errors.numero && errors.numero.message}
                />

                <InputForm name="cidade" control={control} placeholder="Cidade" autoCapitalize="words" autoCorrect={false}
                    error={errors.cidade && errors.cidade.message}
                />

                <InputForm name="bairro" control={control} placeholder="Bairro" autoCapitalize="words" autoCorrect={false}
                    error={errors.bairro && errors.bairro.message}
                />

                <InputForm name="estado" control={control} placeholder="Estado" autoCapitalize="words" autoCorrect={false}
                    error={errors.estado && errors.estado.message}
                />



                

                {/* <InputForm 
                    name="descricao"
                    control={control}
                    placeholder="Descrição"
                    autoCapitalize="words"
                    autoCorrect={false}
                    multiline={true}
                    numberOfLines={4}
                    error={errors.descricao && errors.descricao.message}
                /> */}


            </Wrap>
            }

            { loading == false &&
            <WrapFooterCadastro>
                <Button 
                    title="Salvar" 
                    // onPress={handleSubmit((d) =>  HandleRegister(d as any) )}
                    onPress={()=> { console.log("ué")}}
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