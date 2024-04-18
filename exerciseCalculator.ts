import processedArgs from "./helpers/argsHelper"

interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}
// Remember going forward, output type always comes after parameters and before the arrow notation.

const exerciseCalculator = (hours: number[]): Result => {
    const trainingDays = hours.filter(day => day !== 0);
    let totalHours = 0;
    let rating;
    let ratingDescription;
    trainingDays.forEach(hours => totalHours += hours);
    const average = totalHours / hours.length;
    if (average > 3) {
        rating = 3
        ratingDescription = "Excellent Job !"
    } if (average > 1) {
        rating = 2
        ratingDescription = "Good Job but can do better !"
    } else {
        rating = 1
        ratingDescription = "Significant room to improve..."
    }
    return {
        periodLength: hours.length,
        trainingDays: trainingDays.length,
        success: average >= 2,
        rating,
        ratingDescription,
        target: 2,
        average
    }
}

console.log(exerciseCalculator(processedArgs()))