import React from 'react';
import { Container, InputSpecial } from './styles';
import { TextInputMaskProps } from 'react-native-masked-text';


import { Control, Controller } from 'react-hook-form';

// interface Props extends TextInputMaskProps{
//     control: Control;
//     name: string;
//     error: string;
//     options?: Object;
//     type: any;
// }

type Props = TextInputMaskProps;

export function InputHour({
    // control,
    // name,
    // error,
    // type,
    // options,
    ...rest
}: Props){
    return(
        <Container>
{/* 
            <Controller
                control={control}
                render={({field: {onChange, value}}) =>( */}
                    <InputSpecial 
                        // onChangeText={onChange}
                        // value={value}
                        // type={type}
                        // options={options}
                        {...rest}
                    />
                {/* )}
                name={name}
            /> */}
        
        </Container>
    )
}


