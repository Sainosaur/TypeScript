import { useParams } from "react-router-dom";
import patientService from "../services/patients";
import { useState, useEffect } from "react";
import { Patient, Gender } from "../types";
import { Man2 as Man, Woman2 as Woman, QuestionMark } from "@mui/icons-material";

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
    const [patientData, setPatientData] = useState<Patient>({
        name: "",
        id: "",
        gender: Gender.Other,
        occupation: "",
    });
    const params = useParams();

        useEffect(() => {
            if (params.id) {   
                patientService.getID(params.id).then((data) => {
                    setPatientData(data);
                });
            } else {
                throw new Error("Invalid ID!");
            }
        }, [params.id]);
        return (
            <>
                <h2>{patientData.name} {renderGender(patientData.gender)}</h2>
                <p>SSN: {patientData.ssn || "Unknown"}</p>
                <p>occupation: {patientData.occupation}</p>
            </>
        );
};

export default IndividualPatient;