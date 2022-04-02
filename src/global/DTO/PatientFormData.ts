export interface FormData{
    nome: string,
    cpf: number,
    dataNascimento: string,
    celular: number,
    email: string,
    endereco: string,
    temComorbidade: boolean,
    descricaoComorbidade?: string;
    referencia?: string,
    queixa?: string,
    diagnostico?: string;
}