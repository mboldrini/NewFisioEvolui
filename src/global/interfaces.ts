// Tipos de agendamentos q serão recebidos pela api (vai vim uma lista com os agendamentos da data enviada)
export interface ITipoAgendamento{
    client_id: number,
    client_name: string,
    date_scheduled: Date,
    duration: string,
    end_hour: string,
    id: number,
    scheduled: boolean,
    serviceType_id: number,
    start_hour: string,
    status: number,
    type: number,
}
