import express from 'express';
import calculateBmi from './bmiCalculator';
import exerciseCalculator from './exerciseCalculator';

const PORT = 4000;
const app = express();

app.use(express.json());

// When using TypeScript, _variable means a variable which will not be used but must be there

app.get('/api/hello', (_req, res) => {
    res.json('Hello Full Stack!');
    res.status(200);
});

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
        res.json("Bad Request");
    }
});

app.post('/api/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;
    // Checks for bad request
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!daily_exercises || !target) {
        res.status(400);
        res.json({
            error: "Missing parameters"
        });
        return;
    } // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    else if (!Array.isArray(daily_exercises) || typeof target !== 'number') {
        res.status(400);
        res.json({
            error: "Malformatted parameters"
        });
        return;
    } else {
        // else block used to confirm to TS and ESLint that the parameters are certainly an array of numbers and a number respectively. prevents the no-unsafe-call error
        // asserts type on daily_exercises allowing exerciseCalculator to function. 
        const exercises = daily_exercises as number[];
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const result = exerciseCalculator(exercises, target);
        res.json(result);
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});