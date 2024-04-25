import { v1 as uuid } from 'uuid';
import { patient } from './types';

const isString = (text: unknown): text is string => {
    return text instanceof String || typeof(text) == 'string';
};


const isPatient = (person: unknown): person is patient => {
    if (person && typeof(person) === 'object' && "name" in person && "dateOfBirth" in person && "ssn" in person && "gender" in person && "occupation" in person) {
        return isString(person.name) && isString(person.dateOfBirth) && isString(person.ssn) && isString(person.gender) && isString(person.occupation);
    } else {
        throw new Error('Invalid or incomplete patient object');
    }
};



export const parsePatient = (person: unknown): patient => {
    if (!isPatient(person)) {
        throw new Error('Missing fields or invalid patient entry');
    } else {
        return {
            ...person,
            id: uuid()
        };
    }
};

