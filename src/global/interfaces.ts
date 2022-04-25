// Tipos de agendamentos q serão recebidos pela api (vai vim uma lista com os agendamentos da data enviada)
export interface ITipoAgendamento{
    id: number,
    dataHora: string,
    data: string,
    hora: number,
    tipo: string,
    status: number,
    paciente_id: number,
    paciente_nome: string
}
