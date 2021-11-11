import React from 'react';
import {StyleSheet} from 'react-native';

import {
    Container
} from './styles';

interface Props{
    tipo: 'cel-phone' | 'cpf' | 'cnpj' | 'credit-card' | 'custom' | 'datetime' | 'money' | 'only-numbers' | 'zip-code';
    value: any;
    onChangeText: ()=> void;
    placeholder: string;
    opcoes?: any;
}


   
export function InputMasked({tipo, value, onChangeText, placeholder, opcoes}: Props){
    return(
        <Container
            type={tipo}
            options={opcoes}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor="#4EADBE"
        />
    );
}

