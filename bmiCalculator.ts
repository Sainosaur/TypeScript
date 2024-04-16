import processedArgs from "./helpers/argsHelper";

const calculateBmi = (height: number, weight: number) => {
    const BMI: number = weight / Math.pow((height / 100), 2);
    if (BMI < 18.5) {
        return "Under-weight"
    } else if ( 18.5 < BMI && 24.9 > BMI ) {
        return "Normal (healthy weight)"
    } else if ( 24.9 < BMI) {
        return "Over-weight"
    }
}

console.log(calculateBmi(processedArgs()[0], processedArgs()[1]))
