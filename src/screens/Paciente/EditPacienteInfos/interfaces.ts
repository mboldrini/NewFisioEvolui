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
