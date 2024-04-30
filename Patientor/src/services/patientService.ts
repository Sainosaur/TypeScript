import data from "../../data/patients";
import { NonSensitivePatient, patient} from "../types";

// Creates copy of data that can be changed during runtime
let localData = data;

export const getNonSensitiveData = (): NonSensitivePatient[] => {
    return localData.map(patient => {
        return {
            id: patient.id,
            name: patient.name,
            dateOfBirth: patient.dateOfBirth,
            gender: patient.gender,
            occupation: patient.occupation,
            entries: patient.entries || []
        };
    });
};

export const getSensitiveData = () : patient[] => {
    return data;
}

export const addPatient = (person: patient) => {
    localData = localData.concat(person);
};