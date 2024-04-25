import { v1 as uuid } from 'uuid';
import { Gender, patient } from './types';

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

