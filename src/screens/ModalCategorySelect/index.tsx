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

import { categories } from '../../global/variaveis/categories';

interface Category{
    key: string;
    name: string;
}

interface Props{
    category: Category;
    setCategory: (category: Category) => void;
    closeSelectCategory: () => void;
}

export function CategorySelect({
    category,
    setCategory,
    closeSelectCategory
}: Props){

    function handleCategorySelect(category: Category){
        setCategory(category);
    }

    return(
        <Container>
            <Header>
                <Titulo>Titulo do Modal</Titulo>
            </Header>

            <FlatList 
                data={categories}
                style={{flex: 1, width: '100%'}}
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