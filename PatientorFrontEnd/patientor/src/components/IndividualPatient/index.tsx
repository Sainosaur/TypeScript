import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { useState, useEffect } from "react";
import { Patient, Diagnosis } from "../../types";
import { getAll } from '../../services/diagnosis';

import { Man2 as Man, Woman2 as Woman, QuestionMark } from "@mui/icons-material";
import RenderEntry from './Entry';

const renderGender = (gender: string): JSX.Element => {
    if (gender == "male") {
        return (
            <Man />
        );
    } else if (gender == "female") {
        return (
            <Woman />
        );
    } else {
        return (
            <QuestionMark />
        );
    }
};

const IndividualPatient = (): JSX.Element => {
    const [patientData, setPatientData] = useState<Patient>();
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();
    const params = useParams();
    useEffect(() => {
        if (params.id) {   
            patientService.getID(params.id).then((data) => {
                setPatientData(data);
            });
            getAll().then((data) => {
                setDiagnoses(data);
            });
        } else {
            throw new Error("Invalid ID!");
        }
    }, [params.id]);
    if (!patientData || !diagnoses) {
        return (
            <>
                Loading...
            </>
        );
    } else {
        return (
            <>
                <h2>{patientData.name} {renderGender(patientData.gender)}</h2>
                <p>SSN: {patientData.ssn || "Unknown"}</p>
                <p>occupation: {patientData.occupation}</p>
                <h2>entries:</h2>
                {patientData.entries.map((entry) => <RenderEntry key={entry.id} entry={entry} diagnoses={diagnoses} />)}
            </>
        );
    }

};

export default IndividualPatient;