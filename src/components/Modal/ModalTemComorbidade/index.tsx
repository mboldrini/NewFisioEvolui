import React from 'react';
import { Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Cabecalho } from '../../Cabecalho';
import { Button } from '../../Forms/Button/Index';
import Modal from 'react-native-modal';
import { 
    Container,
    Wrap,
    Category,
    Name,
    Separator,
    Footer,
} from './styles';


interface ICategory{
    key: number;
    name: string;
}

interface Props{
    setCategory: ( ativo: ICategory )=> void;
    statusAtual: ICategory,
    isVisible: boolean;
    setIsVisible: () => void;
}

export function ModalTemComorbidade({ setCategory, statusAtual, isVisible, setIsVisible }: Props ){

    function handleCategorySelect(category: ICategory){
        let categ = category;
        if(category.key == 1){
            categ.name = "Paciente com comorbidade"
        }else if( category.key == 0){
            categ.name = "Paciente SEM comorbidade"
        }
        setCategory(categ);
    }

    function ItemIsActive(selectedName: number, itemName: number){
        if( selectedName == itemName){
            return true;
        }
        return false;
    }

    let optionsList = [
        {key: 1, name: "Sim"},
        {key: 0, name: "Não"}
    ]

    return(
        <Modal isVisible={isVisible} animationIn='slideInUp' animationOut='slideOutDown' animationInTiming={700}  style={{width: '100%', margin: 0}} >
            <Container>

                <Cabecalho titulo="Paciente tem Comorbidade" onPress={()=> setIsVisible() } arrowSide="chevron-down" />

                <Wrap>

                    { <FlatList 
                        data={optionsList}
                        keyExtractor={(item) => item.name}
                        renderItem={({item}) =>(
                            <Category onPress={() => handleCategorySelect(item) } isActive={ ItemIsActive( statusAtual.key, item.key) } >
                                <Name>{item.name}</Name>
                            </Category>
                        )}
                        ItemSeparatorComponent={() => <Separator />}
                    /> }

                    <Footer>
                        <Button title="Selecionar" onPress={ setIsVisible } />
                    </Footer>

                </Wrap>
            </Container>
        </Modal>
    )
}