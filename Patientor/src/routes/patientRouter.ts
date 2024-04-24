import express from 'express';
import { getNonSensitiveData } from '../services/patientService';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
    res.json(getNonSensitiveData());
    res.status(200);
});

export default patientRouter;