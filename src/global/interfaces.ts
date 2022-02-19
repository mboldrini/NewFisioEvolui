// Tipos de agendamentos q serão recebidos pela api (vai vim uma lista com os agendamentos da data enviada)
export interface ITipoAgendamento{
    id: string,
    status: number,
    dataHora: string,
    tipo: string,
}

