import React from 'react';
import { ToastCustom } from "../components/Toast"

export const toastConfig = {
 
    success: (props: any) => (
        <ToastCustom title={props.text1} description={props.text2} type="success"/>
    ),
    info: (props: any) => (
        <ToastCustom title={props.text1} description={props.text2} type="info"/>
    ),
    warning: (props: any) => (
        <ToastCustom title={props.text1} description={props.text2} type="warning"/>
    ),
    error: (props: any) => (
        <ToastCustom title={props.text1} description={props.text2} type="error"/>
    )
}