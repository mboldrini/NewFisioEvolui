import IApointment from "./Apointment"

export interface INewPatient{
    nome: string,
    cpf: number,
    dataNascimento: number,
    celular: number,
    telefoneRecado: number,
    email: string,
    tipoAtendimento: number,
    temComorbidade: boolean,
    logradouro: string,
    uf: number,
    bairro: string,
    numero: string,
    referencia: string,
    queixamotivo: string,
    diagnosticos: string,
    comorbidades: string,
    agendamentos: IApointment[]
}