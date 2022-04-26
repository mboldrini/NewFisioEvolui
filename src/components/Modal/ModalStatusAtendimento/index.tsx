import React, { useState } from 'react';
import { Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Button } from '../../Forms/Button/Index';
import Modal from 'react-native-modal';
import { 
    Container,
    Header,
    Titulo,
    WrapIcon,
    Icone,
    Category,
    Name,
    Separator,
    Footer,
} from './styles';

// 'Default',/// JAMAIS ALTERAR ESSA SEQUÊNCIA
// 1'Não Atendido',/// JAMAIS ALTERAR ESSA SEQUÊNCIA
// 2'Atendido',/// JAMAIS ALTERAR ESSA SEQUÊNCIA
// 3'Remarcado',/// JAMAIS ALTERAR ESSA SEQUÊNCIA
// 4'Cancelado',/// JAMAIS ALTERAR ESSA SEQUÊNCIA
// 5'Desmarcado',/// JAMAIS ALTERAR ESSA SEQUÊNCIA
// 6'Avaliação'/// JAMAIS ALTERAR ESSA SEQUÊNCIA

interface ICategory{
    key: number;
    name: string;
}

interface Props{
    setCategory: ( ativo: ICategory )=> void;
    closeModal: () => void;
    visible: boolean;
    statusAtual: ICategory
}

export function ModalStatusAtendimento({
    setCategory,
    visible,
    closeModal,
    statusAtual
}: Props){

    const [ visivel, setVisivel ] = useState(visible);

     function handleCategorySelect(category: ICategory){
        setCategory(category);
    }

    function ItemIsActive(selectedName: number, itemName: number){
        if( selectedName == itemName){
            return true;
        }
        return false;
    }

    let optionsList = [
        {key: 1, name: "Não Atendido"},
        {key: 2, name: "Atendido"},
        {key: 3, name: "Remarcado"},
        {key: 4, name: "Cancelado"},
        {key: 5, name: "Desmarcado"},
        // {key: 6, name: "Avaliação"},  
    ]

    return(
        <Modal 
            isVisible={visible} 
            animationIn='slideInUp' 
            animationOut='slideOutDown' 
            animationInTiming={700} 
            style={{width: '100%', margin: 0}}
        >
        <Container>
            <Header>
                <WrapIcon onPress={closeModal}>
                    <Icone name="chevron-down"/>
                </WrapIcon>
                <Titulo>Status do Atendimento</Titulo>
            </Header>


            { <FlatList 
                data={optionsList}
                keyExtractor={(item) => item.name}
                renderItem={({item}) =>(
                    <Category
                        onPress={() => handleCategorySelect(item) }
                        isActive={ ItemIsActive( statusAtual.key, item.key) }
                        status={item.key}
                    >
                        <Name>{item.name}</Name>
                    </Category>
                )}
                ItemSeparatorComponent={() => <Separator />}
            /> }

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