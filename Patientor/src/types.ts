export enum Gender {
    Male =  "male",
    Female = "female",
    Other = "other"
}

export interface diagnosis  {
    code: string
    name: string
    latin?: string
}

export interface patient {
    id: string
    name: string
    dateOfBirth: string
    ssn: string
    gender: Gender
    occupation: string
}

export type NonSensitivePatient = Omit<patient, "ssn">;