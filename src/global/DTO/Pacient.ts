
export interface INewPatient{
    name: string,
    dataNascimento: string,
    document: string,
    email: string,
    celphone: string,
    second_celphone: string,
    instagram?:string,
    address: string,
    latitude?: string,
    longitude?: string,
    serviceType_id: number,
    diagnostic?: { diagnostic: string, date: Date },
    complaint?: { complaint: string, date: Date },
    hda?: { hda: string, date: Date },
    hpp?: { hpp: string, date: Date },
    funcionalDiagnosis?: { diagnostic: string, date: Date },
    physicalEval?: { evaluation: string, date: Date },
    respiratoryEval?: { evaluation: string, date: Date },
    objective?: { objective: string, date: Date },
    guideline?: { guideline: string, date: Date },
}

