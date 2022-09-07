export interface IRouteInfos{
    id: number,
    tipo: string,
    id_paciente: number,
    status: 'editar' | 'novo';
}

export interface IDefaultFormInfos{
    about: string,
    comments?: string,
}

export interface IInfos{
    about: string,
    client_id: number,
    comments: string,
    created_at: string,
    date: string,
    id: number,
    updated_at: string,
}

export interface IStatusAgendamento{
    key: number,
    title: string
}

export interface IEditAppointment{
    id: number,
    description: string,
    comments: string,
    status: number,
    type: number,
    date_scheduled: string,
    start_hour: string,
    end_hour: string,
    duration: string,
    price: string,
    scheduled: boolean,
    serviceType_id: number,
    serviceType_name: string,
    created_at: string,
    updated_at: string
}