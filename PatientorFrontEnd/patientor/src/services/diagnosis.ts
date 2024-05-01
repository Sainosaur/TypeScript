import axios from 'axios';
import { Diagnosis } from '../types';
import { apiBaseUrl } from '../constants';

export const getAll = async (): Promise<Diagnosis[]> => {
    const res = await axios.get(`${apiBaseUrl}/diagnoses`); 
    return res.data;
};
