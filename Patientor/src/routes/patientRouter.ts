import express from 'express';
import { patient} from '../types';
import { addPatient, getSensitiveData, getNonSensitiveData } from '../services/patientService';
import { parsePatient } from '../utils';


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

patientRouter.get('/:id', (req, res) => {
    const patients = getSensitiveData();
    const pati = patients.find((pa: patient) => pa.id == req.params.id);
    res.json(pati);
});

export default patientRouter;