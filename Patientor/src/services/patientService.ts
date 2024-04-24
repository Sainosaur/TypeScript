import data from "../../data/patients";
import { NonSensitivePatient } from "../types";

export const getNonSensitiveData = (): NonSensitivePatient[] => {
    return data.map(patient => {
        return {
            id: patient.id,
            name: patient.name,
            dateOfBirth: patient.dateOfBirth,
            gender: patient.gender,
            occupation: patient.occupation
        };
    });
};
