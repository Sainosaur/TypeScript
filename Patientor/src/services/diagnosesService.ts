import data from "../../data/diagnoses";
import { diagnosis } from "../types";

export const getData = (): diagnosis[] => {
    return data;
};