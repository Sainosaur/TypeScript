import express from 'express';

const app = express();

app.get('/api/ping', (_req, res) => {
    console.log('Get request recieved');
    res.json('pong');
});


app.listen(4000, () => {
    console.log('Server Listening at port 4000');
});