export enum HealthCheckRating {
"Healthy" = 0,
"LowRisk" = 1,
"HighRisk" = 2,
"CriticalRisk" = 3
}

export interface discharge {
date: string;
criteria: string;
}

export interface sickLeave {
startDate: string;
endDate: string;
}

export interface BasicEntry {
id: string;
date: string;
specialist: string;
diagnosisCodes?: string[];
description: string
}

export interface HospitalEntry extends BasicEntry {
type: "Hospital";
discharge: discharge;
}

export interface OccupationalHealthcareEntry extends BasicEntry {
type: "OccupationalHealthcare";
employerName: string;
sickLeave?: sickLeave;
}

export interface HealthCheckEntry extends BasicEntry {
type: "HealthCheck";
healthCheckRating: HealthCheckRating;
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;


export enum Gender {
    Male =  "male",
    Female = "female",
    Other = "other"
}

export interface Diagnosis  {
    code: string
    name: string
    latin?: string
}

export interface patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}

export type NonSensitivePatient = Omit<patient, "ssn">;