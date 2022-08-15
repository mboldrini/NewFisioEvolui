
interface IAppointment{
    id: number,
    status: number,
    type: number,
    date_scheduled: string,
    start_hour: string,
    end_hour: string,
    duration: string,
    client_id: number,
    serviceType_id: number,
    serviceType_name: string
}

export const parametrosDoTipo: any = {
    diagnosticoClinico: { 
        title: 'Diagnóstico Clínico',
        urlCreate: '/clients/diagnostic',
        urlRead: '/clients/diagnostic/',
        urlUpdate: '/clients/diagnostic/update/',
        urlDelete: '/clients/diagnostic/',
        urlList: '/clients/diagnostic/list/'
    }, 
    queixaPrincipal: { 
        title: 'Queixa Principal',
        urlCreate: '/clients/complaint',
        urlRead: '/clients/complaint/',
        urlUpdate: '/clients/complaint/',
        urlDelete: '/clients/complaint/',
        urlList: '/clients/complaint/list/'
    }, 
    hda: { 
        title: 'HDA',
        urlCreate: '/clients/hda',
        urlRead: '/clients/hda/',
        urlUpdate: '/clients/hda/',
        urlDelete: '/clients/hda/',
        urlList: '/clients/hda/list/'
   
    },
    hpp: { 
        title: 'HPP',
        urlCreate: '/clients/hpp/',
        urlRead: '/clients/hpp/',
        urlUpdate: '/clients/hpp/',
        urlDelete: '/clients/hpp/',
        urlList: '/clients/hpp/list/'
    },
    avaliacaoFisica: { 
        title: 'Avaliação Física',
        urlCreate: '/clients/pevaluation/',
        urlRead: '/clients/pevaluation/',
        urlUpdate: '/clients/pevaluation/',
        urlDelete: '/clients/pevaluation/',
        urlList: '/clients/pevaluation/list/'
    },
    avaliacaoRespiratoria: { 
        title: 'Avaliação Respiratória',
        urlCreate: '/clients/respevaluation/',
        urlRead: '/clients/respevaluation/',
        urlUpdate: '/clients/respevaluation/',
        urlDelete: '/clients/respevaluation/',
        urlList: '/clients/respevaluation/list/'
    },
    diagnosticoFuncional: { 
        title: 'Diagnóstico Funcional',
        urlCreate: '/clients/fcdiagnosis/',
        urlRead: '/clients/fcdiagnosis/',
        urlUpdate: '/clients/fcdiagnosis/',
        urlDelete: '/clients/fcdiagnosis/',
        urlList: '/clients/fcdiagnosis/list/'
    },
    objetivos: { 
        title: 'Objetivos e Metas',
        urlCreate: '/clients/objectives/',
        urlRead: '/clients/objectives/',
        urlUpdate: '/clients/objectives/',
        urlDelete: '/clients/objectives/',
        urlList: '/clients/objectives/list/'
    },
    evolucoes: { 
        title: 'Evoluções',
        urlCreate: '',
        urlRead: '',
        urlUpdate: '',
        urlDelete: '',
        urlList: ''
    },
    orientacoes: { 
        title: 'Orientações',
        urlCreate: '/clients/guideline/',
        urlRead: '/clients/guideline/',
        urlUpdate: '/clients/guideline/',
        urlDelete: '/clients/guideline/',
        urlList: '/clients/guideline/list/'
    },
    agendamentos: { 
        title: 'Agendamentos',
        urlCreate: '/appointments',
        urlRead: '',
        urlUpdate: '/appointments/',
        urlDelete: '/appointments/delete/',
        urlList: '/appointments/month/'
    },
};

export interface IAppointments{
    id: number,
    description: string,
    comments: string,
    status: number,
    type: number,
    date_scheduled: Date,
    start_hour: string,
    end_hour: string,
    duration: string,
    price: string,
    scheduled: boolean,
    user_id: number,
    client_id: number,
    serviceType_id: number,
    created_at: Date,
    updated_at: Date
}
