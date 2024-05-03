import express from 'express';
import { patient} from '../types';
import { addPatient, getSensitiveData, getNonSensitiveData, addEntry } from '../services/patientService';
import { parsePatient, parseHealthCheckEntry, parseHospitalEntry, parseOccupationalHealthcareEntry } from '../utils';


const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
    res.json(getNonSensitiveData());
    res.status(200);
});

patientRouter.post('/', (req, res) => {
    const patient = parsePatient(req.body);
    try {
        addPatient(patient);
        res.json(patient);
        res.status(200);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.json("Error" + error.message);
            res.status(500);
        }
    }
});

patientRouter.post('/:id/entries', (req, res) => {
    switch(req.body.type) {
        case "Hospital":
            const hospitalEntry = parseHospitalEntry(req.body);
            addEntry(hospitalEntry, req.params.id);
            res.json(hospitalEntry);
            break;
        case "HealthCheck":
            const healthCheckEntry = parseHealthCheckEntry(req.body);
            addEntry(healthCheckEntry, req.params.id);
            res.json(healthCheckEntry);
            break;
        case "OccupationalHealthcare":
            const OccupationalHealthcareEntry = parseOccupationalHealthcareEntry(req.body);
            addEntry(OccupationalHealthcareEntry, req.params.id);
            res.json(OccupationalHealthcareEntry);
            break;
        default:
            throw new Error(`Invalid type ${req.body.type}`);
    }
});

patientRouter.get('/:id', (req, res) => {
    const patients = getSensitiveData();
    const pati = patients.find((pa: patient) => pa.id == req.params.id);
    res.json(pati);
});

export default patientRouter;