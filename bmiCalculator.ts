type Response = "Under-weight" | "Normal (healthy weight)" | "Over-weight" | "Error"

const calculateBmi = (height: number, weight: number) : Response => {
    const BMI: number = weight / Math.pow((height / 100), 2);
    if (BMI < 18.5) {
        return "Under-weight"
    } else if ( 18.5 < BMI && 24.9 > BMI ) {
        return "Normal (healthy weight)"
    } else if ( 24.9 < BMI) {
        return "Over-weight"
    } else {
        return "Error"
    }
}

export default calculateBmi