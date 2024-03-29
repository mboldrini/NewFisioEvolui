export enum ActionType{
    SETINFOS = "setInfos",
    SETEMAIL = "setEmail",
    SETID = "setId",
    SETAPITOKEN = "setApiToken",
    
    SETATENDIMENTOS = "setAtendimentos",
    SETATUALIZAATENDIMENTO = "setAtualizaAtendimento",

    SETPACIENTES = "setPacientes",
    SETATUALIZAPACIENTES = "setAtualizaPacientes",

    SETFORMASPGTO = "setFormasPgto",
    SETUPDATEFORMASPGTO = "setUpdateFormasPgto",

    SETCONFIGS = "setConfigs"
}

export interface IUserType{
    user_code: string,
    name: string,
    family_name: string,
    given_name?: string,
    picture: string,
    email: string,
    enabled: boolean,
    created_at: string,
    address: IAddress,
    configs: IConfigs,
    personal_infos: IPersonalInfos
}

interface IAddress{
    address: string,
    number: number,
    city: string,
    district: string,
    state: string,
    country: string
}
export interface IConfigs{
    allow_retroactiveDate: boolean,
    allow_notifications: boolean,
    schedule_startDay: boolean,
    user_premium: boolean,
    premium_type: number,
    premium_until: string
}
interface IPersonalInfos{
    description?: string,
    professional_mail: string,
    celphone: string,
    second_celphone?: string,
    website?: string,
    instagram?: string,
    twitter?: string,
    tiktok?: string
}

/// Tipos de Atendimentos
export interface atendimento{
    id: number,
    name: string,
    description: string,
    duration: string,
    price: string,
    created_at: string,
    updated_at: string,
}
export interface IAtendimentos{
    atualiza: boolean;
    atendimentos: atendimento[];
}
/// Lista de Pacientes - Paciente II
export interface IPacientes{
    id: number,
    name: string,
    dataNascimento: string,
    document: string,
    email: string,
    celphone: string,
    address: string,
    serviceType_id: number,
    serviceType_name: string
}
export interface IPaciente{
    atualiza: boolean;
    pacientes: IPacientes[];
}


/// Formas de Pagamento
export interface IPgtos{
    id: number,
    description: string;
    paymentMethod_id: number,
    paymentMethod_name: string,
    created_at: string,
    updated_at: string
}
export interface IFormasPgto{
    atualiza: boolean;
    pagamentos: IPgtos[];
}


export interface IApiInfos{
    token: string;
    date: Date;
}