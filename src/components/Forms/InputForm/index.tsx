import React, { useEffect, useState } from 'react';
import { Input } from '../Input';
import { Text, TextInputProps } from 'react-native';
import { Container, PHolder } from './styles';
import { Control, Controller } from 'react-hook-form';

interface Props extends TextInputProps{
    control: Control;
    name: string;
    error: any;
}

export function InputForm({
    control,
    name,
    error,
    placeholder,
    ...rest
}: Props){


    return(
        <Container>
            { error ? <PHolder hasErr={error}>{error}</PHolder> : <PHolder hasErr={error}>{ placeholder }</PHolder>}
            <Controller
                control={control}
                render={({field: {onChange, value}}) =>(
                    <Input 
                        onChangeText={onChange}
                        placeholder={placeholder}
                        value={value}
                        {...rest}
                    />
                )}
                name={name}
            />
        </Container>
    )
}


