import React, {useState, useEffect} from 'react';
import Modal from 'react-native-modal';
import { Cabecalho_Modal } from '../../../../components/Cabecalho_Modal';
import { Footer_Modal } from '../../../../components/Footers/Footer_Modal';
import { 
    Container,
    Body,
    WrapDuracao,
    Duracao,
    BotaoDuracao,
    TempoDuracao,
    ImageIcon
} from './styles';
/// Forms
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { InputForm } from '../../../../components/Forms/InputForm';
import { InputMasked } from '../../../../components/Forms/InputMasked';
import { Button } from '../../../../components/Buttons/Button/Index';

import { TimePickerModal } from 'react-native-paper-dates'
import { Select } from '../../../../components/Forms/Select';
import { Modal_ListarFormasPagamento } from '../../FormasPagamento/Modal_ListarFormasPagamento';


interface Props{
    visible: boolean;
    closeModal: () => void;
    id?: number
}

const schema = Yup.object().shape({
    nome: Yup.string().required("Nome é obrigatório"),
});



export function Modal_TipoAtendimento({ visible, closeModal, id }: Props){

    const { control, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(schema) });

    const [visible2, setVisible2] = React.useState(false);
    const [ hora, setHora ] = useState('00:30');

    const [formaPagamento, setFormaPagamento] = useState({key: -1, name: 'Forma de Pagamento'});

    const [ showModalFormaPgto, setShowModalFormaPgto ] = useState(false);
  
    const onConfirm = React.useCallback(
      ({ hours, minutes }) => {
        setVisible2(false);
        SetaHoras(hours, minutes);
      },
      [setVisible2]
    );
    
    function SetaHoras(hora: number, minuto: number){
      let hour = ''+ hora;
      let minute = ''+ minuto;
      if(hora < 10 ){
        hour = "0"+ hora;
      }
      if( minuto < 9 ){
        if(minuto < 1){
          minute = 10 +"";
        }else{
          minute = "0"+ minuto;
        }
      }
      setHora(hour +':'+ minute);
    }



    return(
    <Modal isVisible={visible} animationIn='slideInUp' animationOut='slideOutDown' animationInTiming={700} style={{width: '100%', margin: 0}}>
        <Container>

            <Cabecalho_Modal  titulo='Tipo de Atendimento' onPress={()=> { closeModal() }} />

            <Body>

                <InputForm 
                    name="nome"
                    control={control}
                    placeholder="Nome"
                    autoCapitalize="words"
                    autoCorrect={false}
                    error={errors.nome && errors.nome.message}
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

                <Select 
                  title={ formaPagamento.name }
                  isActive={ formaPagamento.key }
                  onPress={()=>{ setShowModalFormaPgto(true) }}
                /> 

                <WrapDuracao>
                  <BotaoDuracao>
                    <ImageIcon source={require('../../../../assets/stopwatch.png')}/>
                    <TempoDuracao onPress={()=> setVisible2(true)  }>{ hora }</TempoDuracao>
                  </BotaoDuracao>

                  <InputMasked 
                      name="valor"
                      control={control}
                      placeholder="Valor do Atendimento"
                      autoCapitalize="words"
                      autoCorrect={false}
                      type={'money'}
                      error={errors.valor && errors.valor.message}
                      value="100,00"
                  />
                </WrapDuracao>


            </Body>

            <Footer_Modal onPressOk={()=> console.log("pressionou OK")} onPressCancel={()=> { closeModal() }}/>



            <TimePickerModal
              visible={visible2}
              onDismiss={()=> {setVisible2(false) } }
              onConfirm={onConfirm}
              hours={0} // default: current hours
              minutes={30} // default: current minutes
              label="Selecione a Duração" // optional, default 'Select time'
              cancelLabel="Cancelar" // optional, default: 'Cancel'
              confirmLabel="Ok" // optional, default: 'Ok'
              animationType="fade" // optional, default is 'none'
              locale={'pt-BR'} // optional, default is automically detected by your system
            />

            <Modal_ListarFormasPagamento 
              visible={showModalFormaPgto} 
              closeModal={()=> { setShowModalFormaPgto (false) }} 
              setFormasPgto={setFormaPagamento} 
            />

        </Container>
    </Modal>
    )
}