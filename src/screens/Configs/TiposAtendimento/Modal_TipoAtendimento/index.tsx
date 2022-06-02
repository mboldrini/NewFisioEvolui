import React from 'react';
import Modal from 'react-native-modal';
import { Button } from '../../../../components/Buttons/Button/Index';
import { Cabecalho_Modal } from '../../../../components/Cabecalho_Modal';
import { 
    Container,
    Header,
    Titulo,
    WrapIcon,
    Icone,
    Footer,
} from './styles';


interface Props{
    visible: boolean;
    closeModal: () => void;
    id?: number
}

export function Modal_TipoAtendimento({
    visible,
    closeModal,
    id
}: Props){

    return(
        <Modal 
            isVisible={visible} 
            animationIn='slideInUp' 
            animationOut='slideOutDown' 
            animationInTiming={700} 
            style={{width: '100%', margin: 0}}
        >
        <Container>

            <Cabecalho_Modal 
                titulo='Tipo de Atendimento ' 
                onPress={closeModal} 
            />

            <Footer>
                <Button 
                    title="Selecionar" 
                    onPress={closeModal}
                />
            </Footer>
            

        </Container>
        </Modal>
    )
}