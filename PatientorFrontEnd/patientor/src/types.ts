export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface HealthCheckValues {
  0: "Healthy",
  1: "LowRisk",
  2: "HighRisk",
  3: "CriticalRisk",
  "Healthy" : 0,
  "LowRisk" : 1,
  "HighRisk" : 2,
  "CriticalRisk" : 3
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
  sickLeave: sickLeave;
}

export interface HealthCheckEntry extends BasicEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

type UnionOmit<T, K extends string | number | symbol> = T extends K ? T : Omit<T, K>;

export type AddEntry = UnionOmit<Entry, "id">;


export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;