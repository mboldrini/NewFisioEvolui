import React from 'react';
import { Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Button } from '../../components/Forms/Button/Index';
import { 
    Container,
    Header,
    Titulo,
    Category,
    Name,
    Separator,
    Footer,
} from './styles';


interface Category{
    key: number;
    name: string;
}

interface Props{
    titulo: string;
    category: Category;
    setCategory: (category: Category) => void;
    closeSelectCategory: () => void;
    optionsList: Category[];
}

export function CategorySelect({
    titulo,
    category,
    setCategory,
    closeSelectCategory,
    optionsList
}: Props){

    console.log(optionsList);

    function handleCategorySelect(category: Category){
        setCategory(category);
    }

    return(
        <Container>
            <Header>
                <Titulo>{ titulo }</Titulo>
            </Header>

            <FlatList 
                data={optionsList}
                keyExtractor={(item) => item.key}
                renderItem={({item}) =>(
                    <Category
                        onPress={() => handleCategorySelect(item) }
                        isActive={category.key === item.key}
                    >
                        <Name>{item.name}</Name>
                    </Category>
                )}
                ItemSeparatorComponent={() => <Separator />}
            />

            <Footer>
                <Button 
                    title="Selecionar" 
                    onPress={closeSelectCategory}
                />
            </Footer>

        </Container>
    )
}