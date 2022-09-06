import { DefaultAppValues } from "../styles/theme";

   
/// TRANSFORMAR EM ENUM
export const statusAtendimento = [
    'Não Atendido',/// JAMAIS ALTERAR ESSA SEQUÊNCIA
    'Não Atendido',/// JAMAIS ALTERAR ESSA SEQUÊNCIA
    'Atendido',/// JAMAIS ALTERAR ESSA SEQUÊNCIA
    'Remarcado',/// JAMAIS ALTERAR ESSA SEQUÊNCIA
    'Cancelado',/// JAMAIS ALTERAR ESSA SEQUÊNCIA
    'Desmarcado',/// JAMAIS ALTERAR ESSA SEQUÊNCIA
    'Avaliação'/// JAMAIS ALTERAR ESSA SEQUÊNCIA
];

export const tiposAtendimentos = [
    "Atendimento Comum",
    "Avaliação",
]


export const StorageKeys = {
    appToken: 'fisioevolui:appToken',
    googleUserInfos: 'fisioevolui:googleUserInfos',
    user: 'fisioEvolui:user'
};



export const tiposDeAtendimentos = [
    {title: 'Não Atendido', slug: 'naoAtendido',    cor: DefaultAppValues.statusAtendimento.status_default      },
    {title: 'Não Atendido', slug: 'naoAtendido',    cor: DefaultAppValues.statusAtendimento.status_default      },
    {title: 'Atendido',     slug: 'atendido',       cor: DefaultAppValues.statusAtendimento.status_atendido     },
    {title: 'Remarcado',    slug: 'remarcado',      cor: DefaultAppValues.statusAtendimento.status_remarcado    },
    {title: 'Cancelado',    slug: 'cancelado',      cor: DefaultAppValues.statusAtendimento.status_cancelado    },
    {title: 'Desmarcado',   slug: 'desmarcado',     cor: DefaultAppValues.statusAtendimento.status_desmarcado   },
    {title: 'Avaliação',    slug: 'avaliacao',      cor: DefaultAppValues.statusAtendimento.status_avaliacao    },
]




// tipoAgendamento: [
//     'Recorrente',/// JAMAIS ALTERAR ESSA SEQUÊNCIA
//     'Único',/// JAMAIS ALTERAR ESSA SEQUÊNCIA
//     'Avaliação'/// JAMAIS ALTERAR ESSA SEQUÊNCIA
// ],

