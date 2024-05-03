import { Entry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry, Diagnosis, HealthCheckRating, HealthCheckValues } from '../../types';
import { assertNever } from '../../utils';
import { Card, CardContent } from "@mui/material";

import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import WarningIcon from '@mui/icons-material/Warning';


import { Rating } from '@mui/material';

const RenderHealthCheckEntry = ({ entry, diagnoses } : { entry: HealthCheckEntry , diagnoses: Diagnosis[] }): JSX.Element => {
    const healthCheckValues: HealthCheckValues = HealthCheckRating.valueOf();
    return (
        <Card variant="outlined">
            <CardContent>
                <p>{entry.date} <HealthAndSafetyIcon /> </p> 
                <p>{entry.description}</p>
                <ul>
                    {entry.diagnosisCodes?.map((code) => <li key={code} >{code} {diagnoses.find((diagnosis) => diagnosis.code === code)?.name}  </li>)}
                </ul>
                <p>Diagnosed by {entry.specialist}</p>
                <p>Health Check Rating: <Rating
                value={entry.healthCheckRating}
                icon={<WarningIcon color="error" />}
                emptyIcon ={<WarningIcon />}
                max={3}
                readOnly /> {healthCheckValues[entry.healthCheckRating]} </p>
            </CardContent>
        </Card>
    );
};

const RenderOccupationalHealthcareEntry = ({ entry, diagnoses } : { entry: OccupationalHealthcareEntry , diagnoses: Diagnosis[] }): JSX.Element => {
    return (
        <Card variant="outlined">
            <CardContent>
                <p>{entry.date} <MedicalServicesIcon /> </p> 
                <p>{entry.description}</p>
                <ul>
                    {entry.diagnosisCodes?.map((code) => <li key={code} >{code} {diagnoses.find((diagnosis) => diagnosis.code === code)?.name}  </li>)}
                </ul>
                <p>Employer: {entry.employerName}</p>
                <p>Diagnosed by {entry.specialist}</p>
                {entry.sickLeave ? <div>
                    <h3>Sick Leave</h3>
                    <p>Start: {entry.sickLeave.startDate}</p>
                    <p>End: {entry.sickLeave.endDate}</p>
                </div> : <p> No Sick Leave</p>}
            </CardContent>
        </Card>
    );
};

const RenderHospitalEntry = ({ entry, diagnoses } : { entry: HospitalEntry, diagnoses: Diagnosis[] }): JSX.Element => {
    return (
        <Card variant="outlined">
            <CardContent>
                <p>{entry.date} <LocalHospitalIcon /> </p> 
                <p>{entry.description}</p>
                <ul>
                    {entry.diagnosisCodes?.map((code) => <li key={code} >{code} {diagnoses.find((diagnosis) => diagnosis.code === code)?.name}  </li>)}
                </ul>
                <p>Diagnosed by {entry.specialist}</p>
                <p>Discharged: {entry.discharge.date}</p>
            </CardContent>
        </Card>
    );
};

const RenderEntry = ({ entry, diagnoses } : { entry: Entry, diagnoses: Diagnosis[] }): JSX.Element => {
    switch(entry.type) {
        case "Hospital":
            return <RenderHospitalEntry entry={entry} diagnoses={diagnoses} />;
        case "OccupationalHealthcare":
            return <RenderOccupationalHealthcareEntry entry={entry} diagnoses={diagnoses} />;
        case "HealthCheck":
            return <RenderHealthCheckEntry entry={entry} diagnoses={diagnoses} />;
        default:
            return assertNever(entry);
    }
};


export default RenderEntry;