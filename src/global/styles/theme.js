export default{

    space: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48],

    colors: {
        primary: '#63C2D1',

        secondary: '#4EADBE',
        secondary_light: 'rgba(78, 173, 190, 0.6)',

        success: '#12A454',
        success_light: 'rgba(18,164,84,0.5)',
        success_super: '#3BFF29',

        attention: '#E83F5B',
        attention_light: 'rgba(232,63,91, 0.5)',

        shape: '#FFFFFF',
        title: '#363F5F',
        text: '#969CB2',
        text_dark: '#268596',
        background: '#F0F2F5',

        input_background: '#83D6E3',

        status_default: '#c3c3c3',
        status_atendido: '#5cb85c',
        status_remarcado: '#f0ad4e',
        status_cancelado: '#d9534f',
        status_desmarcado: '#3a86ff',
        status_avaliacao: '#8338ec',


        /*******************************\
        | Cadastro e Perfil do Paciente |
        \*******************************/
        status_recorrente: '#219ebc',

        button_ok: '#268596',


        /*******************************\
        | Toast Message                 |
        \*******************************/
        background: '#FFF',
        border: '#E2E8F0',
        muted: '#F0F1F3',
        toast_success: '#5cb85c',
        toast_error: '#FC0021',
        toast_info: '#00FFFF',
        toast_warning: '#f0ad4e',


    },
    fonts:{
        regular: 'Poppins_400Regular',
        medium: 'Poppins_500Medium',
        bold: 'Poppins_700Bold',
        thin: 'Poppins_300Light',
    },
    bordas:{
        padrao: 10,
        modal_top: 20
    },
    padding:{
        lateral: 24,
        lateral_half: 12,
        superior: 5,
    },
    margin:{
        input_bottom: 10,
        lateral: 24,
        lateral_half: 12,
        bottom: 10,
        lateral_third: 8,
        top: 10
    },
    fontSize:{
        um: 10,
        dois: 12,
        tres: 14,
        quatro: 16
    }
}

export const DefaultAppValues = {
    fontSize: {
        title: 14,
        description: 10
    },
    bordas: {
        padrao: 10,
        modal_top: 20,
        modal_top: 25
    },
    margin:{
        input_bottom: 10,
        lateral: 24,
        lateral_half: 12,
        bottom: 10,
        lateral_third: 8,
        top: 10
    },
    padding:{
        lateral: 24,
        lateral_half: 12,
        superior: 5,
    },
    fontSize:{
        um: 10,
        dois: 12,
        tres: 14,
        quatro: 16
    },
    statusAtendimento:{
        status_default: '#c3c3c3',
        status_atendido: '#5cb85c',
        status_remarcado: '#f0ad4e',
        status_cancelado: '#d9534f',
        status_desmarcado: '#3a86ff',
        status_avaliacao: '#8338ec',
    }
}
