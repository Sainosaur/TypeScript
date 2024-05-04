import axios from "axios";
import { Patient, PatientFormValues, AddEntry } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getID = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  
  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );
  return data;
};

const addEntry = async (object: AddEntry, patientID: string) => {
  const { data } = await axios.post(`${apiBaseUrl}/patients/${patientID}/entries`, object);
  return data;
};

export default {
  getAll, create, getID, addEntry
};

