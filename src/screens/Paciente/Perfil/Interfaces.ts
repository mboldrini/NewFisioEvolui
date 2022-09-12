interface IServiceType{
    id: number,
    name: string,
    description: string
}

export interface IPctInfos{
    id: number,
    name: string,
    dataNascimento: Date,
    document: string,
    email: string,
    celphone: string,
    second_celpone: string,
    instagram: string,
    address: string,
    latitude: string,
    longitude: string,
    created_at: Date,
    updated_at: Date,
    serviceType: IServiceType 
}

export interface IAgendamentos{
    id: number,
    tipo: number,
    status: number,
    timestamp: number,
}

export interface IAgendamentosApi{
    id: number,
    timestamp: string,
    data: string,
    tipo: number,
    status: number
}

export interface IRoute{
    id: number
}






interface IComplaints{
    id: number,
    about: string,
    comments: string,
    date: Date,
    client_id: number,
    user_id: number,
    created_at: Date,
    updated_at: Date,
}
interface IDiagnostic{
    id: number,
    about: string,
    comments: string,
    date: Date,
    client_id: number,
    user_id: number,
    created_at: Date,
    updated_at: Date,
}
interface IFunctional{
    id: number,
    about: string,
    comments: string,
    date: Date,
    client_id: number,
    user_id: number,
    created_at: Date,
    updated_at: Date,
}
interface IGuideline{
    id: number,
    about: string,
    comments: string,
    date: Date,
    client_id: number,
    user_id: number,
    created_at: Date,
    updated_at: Date,
}
interface IHda{
    id: number,
    about: string,
    comments: string,
    date: Date,
    client_id: number,
    user_id: number,
    created_at: Date,
    updated_at: Date,
}
interface IHpp{
    id: number,
    about: string,
    comments: string,
    date: Date,
    client_id: number,
    user_id: number,
    created_at: Date,
    updated_at: Date,
}
interface IObjectives{
    id: number,
    about: string,
    comments: string,
    date: Date,
    client_id: number,
    user_id: number,
    created_at: Date,
    updated_at: Date,
}
interface IPhysical{
    id: number,
    about: string,
    comments: string,
    date: Date,
    client_id: number,
    user_id: number,
    created_at: Date,
    updated_at: Date,
}
interface IRespiratory{
    id: number,
    about: string,
    comments: string,
    date: Date,
    client_id: number,
    user_id: number,
    created_at: Date,
    updated_at: Date,
}
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

export interface IPctInfosList{
    clinicalDiagnostic?: IDiagnostic[],
    complaints?: IComplaints[],
    functionalDiagnostic?: IFunctional[],
    guideline?: IGuideline[],
    hda?: IHda[],
    hpp?: IHpp[],
    objectives?: IObjectives[],
    physicalEvaluation?: IPhysical[],
    respiratoryEvaluation?: IRespiratory[],
    appointment?: IAppointment[],
    evolution: string,
}

export interface IExpandablesShow{
    clinicalDiagnostic: boolean,
    complaint: boolean,
    hda: boolean,
    hpp: boolean,
    physical: boolean,
    respiratory: boolean,
    functional: boolean,
    objectives: boolean,
    evolution: boolean,
    guideline: boolean,
    appointments: boolean,
}



