import express from 'express';
import { getData } from '../services/diagnosesService';

const diagnosesRouter = express.Router();

diagnosesRouter.get('/', (_req, res) => {
    const data = getData();
    res.json(data);
    res.status(200)
});

export default diagnosesRouter;