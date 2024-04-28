import { DiaryEntry, Visibility, Weather } from "./types"

const isString = (value: unknown): value is string => {
    return typeof(value) === "string" || value instanceof String
}

const isNumber = (value: unknown): value is number => {
    return typeof(value) === "number" || value instanceof Number
}

const isVisibility = (value: unknown): value is Visibility => {
    if (value === "great" || value === "good" || value === "ok" || value === "poor") {
        return true
    } else {
        throw new Error("Illegal value recieved for visibility!")
    }
}

const isWeather = (value: unknown): value is Weather => {
    if (value === "sunny" || value === "rainy" || value === "cloudy" || value === "stormy" || value === "windy") {
        return true
    } else {
        throw new Error("Illegal value recieved for weather!")
    }
}

const isDiary = (object: unknown): object is DiaryEntry => {
    if ( object instanceof Object &&  "visibility" in object && "weather" in object && "date" in object && "id" in object ) {
        return isNumber(object.id) && isString(object.date) && isWeather(object.weather) && isVisibility(object.visibility)
    } else {
        throw new Error("Invalid diary object")
    }
}

export const parseDiaries = (diaries: unknown[]) => {
    diaries.forEach((diary) => {
        if (!isDiary(diary)) {
            throw new Error(`Illegal Diary ${JSON.stringify(diary)}`)
        }
    });
    // returns the input data as diary entries. If no errors are thrown by the code above, we can be sure that all of the incoming data contains diary entry objects. 
    return diaries as DiaryEntry[]
}