import React from 'react';
import { InputMask } from '../InputMask';
import { TextInputProps } from 'react-native';
import { Container, Error } from './styles';
import { Control, Controller } from 'react-hook-form';

interface Props extends TextInputProps{
    control: Control;
    name: string;
    error: any;
    options?: Object;
    type?: any;
}

export function InputMasked({
    control,
    name,
    error,
    type,
    options,
    ...rest
}: Props){
    return(
        <Container>
            {error && <Error>{error}</Error>}
            <Controller
                control={control}
                render={({field: {onChange, value}}) =>(
                    <InputMask 
                        onChangeText={onChange}
                        value={value}
                        type={type}
                        options={options}
                        {...rest}
                    />
                )}
                name={name}
            />
        </Container>
    )
}


