import React from 'react';
import { Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Button } from '../../Forms/Button/Index';
import { 
    Container,
    Header,
    Titulo,
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
    closeSelectCategory: () => void;
    statusAtual: ICategory
}

export function ModalTemComorbidade({
    setCategory,
    closeSelectCategory,
    statusAtual
}: Props ){

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
        <Container>
            <Header>
                <Titulo>Paciente tem Comorbidade</Titulo>
            </Header>

            { <FlatList 
                data={optionsList}
                keyExtractor={(item) => item.name}
                renderItem={({item}) =>(
                    <Category
                        onPress={() => handleCategorySelect(item) }
                        isActive={ ItemIsActive( statusAtual.key, item.key) }
                    >
                        <Name>{item.name}</Name>
                    </Category>
                )}
                ItemSeparatorComponent={() => <Separator />}
            /> }

            <Footer>
                <Button 
                    title="Selecionar" 
                    onPress={closeSelectCategory}
                />
            </Footer>
            

        </Container>
    )
}