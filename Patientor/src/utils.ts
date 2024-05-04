import { v1 as uuid } from 'uuid';
import { Gender, patient, Entry, HospitalEntry, Diagnosis, HealthCheckEntry, OccupationalHealthcareEntry } from './types';

const isString = (text: unknown): text is string => {
    return text instanceof String || typeof(text) == 'string';
};


const isDate = (value: unknown): boolean => {
    return Boolean(isString(value) && Date.parse(value));
};

const isGender = (text: unknown): text is Gender => {
    if (isString(text)) {
        return Object.values(Gender).map(gender => gender.toString()).includes(text);
    } else {
        throw new Error("Invalid Gender");
    }
};

const isPatient = (person: unknown): person is patient => {
    if (person && typeof(person) === 'object' && "name" in person && "dateOfBirth" in person && "ssn" in person && "gender" in person && "occupation" in person) {
        return isString(person.name) && isDate(person.dateOfBirth) && isString(person.ssn) && isGender(person.gender) && isString(person.occupation);
    } else {
        throw new Error('Invalid or incomplete patient object');
    }
};

const isType = (value: unknown): value is Entry["type"] => {
    if (isString(value)) {
        return value == "Hospital" || value == "OccupationalHealthcare" || value == "HealthCheck";
    }
    return false;
};


export const parsePatient = (person: unknown): patient => {
    if (!isPatient(person)) {
        throw new Error('Invalid or incomplete patient object');
    } else {
        return {
            ...person,
            id: uuid()
        };
    }
};

const isEntry = (value: unknown): value is Entry => {
    if (value instanceof Object && "date" in value && "specialist" in value && "description" in value && "type" in value) {
        return isString(value.date) && isString(value.specialist) && isString(value.description) && isType(value.type);
    }
    return false;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
      // we will just trust the data to be in correct form
      return [] as Array<Diagnosis['code']>;
    }
    return object.diagnosisCodes as Array<Diagnosis['code']>;
};

export const parseEntry = (entry: unknown): Entry => {
    if (isEntry(entry)) {
        return {
            ...entry,
            diagnosisCodes: parseDiagnosisCodes(entry),
            id: uuid()
        };
    } else {
        throw new Error("Bad Entry! Invalid data entered");
    }
};

export const parseHospitalEntry = (value: unknown): HospitalEntry => {
    const entry = parseEntry(value);
    if ("discharge" in entry && "date" in entry.discharge && "criteria" in entry.discharge && isString(entry.discharge.criteria) && isString(entry.discharge.date)) {
        return entry;
    } else {
        throw new Error("Invalid discharge data");
    }
};

export const parseHealthCheckEntry = (value: unknown): HealthCheckEntry => {
    const entry = parseEntry(value);
    if ("healthCheckRating" in entry && entry.healthCheckRating in [0, 1, 2, 3]) {
        return entry;
    } else {
        throw new Error("Invalid or missing healthCheckRating");
    }
};

export const parseOccupationalHealthcareEntry = (value: unknown): OccupationalHealthcareEntry => {
    const entry = parseEntry(value);
    if ("employerName" in entry && typeof(entry.employerName) == "string") {
        return entry;
    } else {
        throw new Error ("Invalid employerName");
    }
};
