import express from 'express'
import calculateBmi from './bmiCalculator';

const PORT = 4000;
const app = express();

app.use(express.json());

// When using TypeScript, _variable means a variable which will not be used but must be there

app.get('/api/hello', (_req, res) => {
    res.json('Hello Full Stack!');
    res.status(200);
})

app.get('/api/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    if (height && weight) {
        const bmiResponse = calculateBmi(height, weight);
        res.json({
            weight,
            height,
            bmi: bmiResponse
        });
    } else {
        res.status(500);
        res.json("Bad Request")
    }
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`)
})