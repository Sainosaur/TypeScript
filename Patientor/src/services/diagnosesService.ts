import data from "../../data/diagnoses";
import { diagnosis } from "../types";

// Note to self, when using a function, the type must always be specified AFTER THE PARAMETERS otherwise we are stating that the function is of certain type which is incorrect. 
export const getData = (): diagnosis[] => {
    return data;
};