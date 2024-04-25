import express from 'express';
import { addPatient, getNonSensitiveData } from '../services/patientService';
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
    } catch {
        res.status(500);
    }

});

export default patientRouter;