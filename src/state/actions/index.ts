import { ActionType } from '../action-types/index';

// interfaces dos tipos q consigo setar/definir,
// aparentemente no payload consigo definir o tipo vai ser setado
type SetInfos = {
    type: ActionType.SETINFOS,
    payload: any
}

interface SetId{
    type: ActionType.SETID,
    payload: any
}

interface SetEmail{
    type: ActionType.SETEMAIL,
    payload: any
}

interface SetAPIToken{
    type: ActionType.SETAPITOKEN,
    payload: any
}

/// Tipos de atendimentos
interface SetAtendimentos{
    type: ActionType.SETATENDIMENTOS,
    payload: any
}
interface SetAtualizaAtendimento{
    type: ActionType.SETATUALIZAATENDIMENTO,
    payload: any,
}
/// Formas de Pagamento
interface SetFormasPgto{
    type: ActionType.SETFORMASPGTO,
    payload: any,
}
interface SetAtualizaFormasPgto{
    type: ActionType.SETUPDATEFORMASPGTO,
    payload: any,
}


export type Action = SetInfos | SetId | SetEmail | SetAPIToken | SetAtendimentos | SetAtualizaAtendimento | SetFormasPgto | SetAtualizaFormasPgto; // | OutraAction