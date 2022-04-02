export interface FormData{
    nome: string,
    cpf: number,
    dataNascimento: string,
    celular: number,
    email: string,
    endereco: string,
    temComorbidade: boolean,
    comorbidades?: string;
    referencia?: string,
    queixa?: string,
    diagnostico?: string;
}