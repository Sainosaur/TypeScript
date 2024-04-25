import express from 'express';
import cors from 'cors';
import diagnosesRouter from './routes/diagnosesRouter';
import patientRouter from './routes/patientRouter';

const app = express();

const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientRouter);

app.get('/api/ping', (_req, res) => {
    res.json('pong');
});


app.listen(PORT, () => {
    console.log(`Server Listening at port ${PORT}`);
});