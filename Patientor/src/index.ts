import express from 'express';
import cors from 'cors';
import diagnosesRouter from './routes/diagnosesRouter';

const app = express();

const PORT = 3001;

app.use(cors());
app.use('/api/diagnoses', diagnosesRouter);


app.get('/api/ping', (_req, res) => {
    console.log('Get request recieved');
    res.json('pong');
});


app.listen(PORT, () => {
    console.log(`Server Listening at port ${PORT}`);
});