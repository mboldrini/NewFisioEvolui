import React from 'react';
import { InputMask } from '../InputMask';
import { TextInputProps } from 'react-native';
import { Container } from './styles';
import { Control, Controller } from 'react-hook-form';
import { PHolder } from '../InputForm/styles';

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
    placeholder,
    ...rest
}: Props){
    return(
        <Container>
            { error ? <PHolder hasErr={error}>{error}</PHolder> : <PHolder hasErr={error}>{ placeholder }</PHolder>}
            <Controller
                control={control}
                render={({field: {onChange, value}}) =>(
                    <InputMask 
                        onChangeText={onChange}
                        placeholder={placeholder}
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


