import { Alert, Button, Card, Stack, TextField, Select, MenuItem, InputLabel, Switch, Input, Box, Chip } from '@mui/material';
import { useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { sickLeave, Entry, discharge, HealthCheckRating, Diagnosis } from "../../types";

const OccupationalHealthcareForm = ({employerName, setEmployerName, sickLeave, setSickLeave}: {employerName: string, setEmployerName: React.Dispatch<React.SetStateAction<string>>, sickLeave: sickLeave | null, setSickLeave: React.Dispatch<React.SetStateAction<sickLeave | null>>}) => {
    const [checked, setChecked] = useState(false);
    const Invert = () => {
        if (sickLeave) {
            setSickLeave(null);
        } else {
            setSickLeave({startDate: "", endDate: ""});
        }
       setChecked(!checked);
    };

    return (
        <>
            <TextField id="outlined-basic" label="Employer Name" variant="outlined" value={employerName} onChange={(event) => setEmployerName(event.target.value)} fullWidth margin="normal"/>
            <p>Sick Leave?<Switch checked={checked} onChange={() => Invert()} /></p>
            {sickLeave ? <>
                <InputLabel>Sick Leave Start</InputLabel>
                <Input type="date" value={sickLeave.startDate} onChange={(event) => setSickLeave({...sickLeave, startDate: event.target.value})} fullWidth />
                <InputLabel>Sick Leave Start</InputLabel>
                <Input type="date" value={sickLeave.endDate} onChange={(event) => setSickLeave({...sickLeave, endDate: event.target.value})} fullWidth />
            </> : null}
            
        </>
    );
};

const HopsitalForm = ({discharge, setDischarge}: {discharge: discharge, setDischarge: React.Dispatch<React.SetStateAction<discharge>>}) => {
    return (
        <>
            <InputLabel> Discharge date:</InputLabel>
            <Input type="date"  value={discharge.date} onChange={(event) => setDischarge({...discharge, date: event.target.value})} fullWidth/>
            <TextField id="outlined-basic" label="Discharge criteria" variant="outlined" value={discharge.criteria} onChange={(event) => setDischarge({...discharge, criteria: event.target.value})} fullWidth margin="normal"/>
        </>
    ); 
};

const HealthCheckForm = ({healthCheckRating, setHealthCheckRating}: {healthCheckRating: HealthCheckRating, setHealthCheckRating: React.Dispatch<React.SetStateAction<HealthCheckRating>>}) => {
    return (
        <>
            <Select value={healthCheckRating} onChange={(event) => setHealthCheckRating(Number(event.target.value))}>
                <MenuItem value={0}>0: Healthy</MenuItem>
                <MenuItem value={1}>1: Low Risk</MenuItem>
                <MenuItem value={2}>2: High Risk</MenuItem>
                <MenuItem value={3}>3: Critical Risk</MenuItem>
            </Select>
        </>
    );
};

const EntryForm = ({ setShowForm, diagnoses }: { setShowForm: React.Dispatch<React.SetStateAction<boolean>>, diagnoses: Diagnosis[]}): JSX.Element => {

    const [alert, setAlert] = useState("");
    const [entryType, setEntryType] = useState<Entry["type"]>("HealthCheck");

    const [description, setDescription] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [specialist, setSpecialist] = useState<string>("");

    const [employerName, setEmployerName] = useState<string>("");
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
    const [sickLeave, setSickLeave] = useState<sickLeave | null>(null);

    const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(0);

    const [discharge, setDischarge] = useState<discharge>({date: "", criteria: ""});

    const params = useParams();

    const sendEntry = () => {
        if (params.id) {
            let entry;
            switch(entryType) {
                case "OccupationalHealthcare":
                    entry = {type: "OccupationalHealthcare", description, date, specialist, employerName, sickLeave, diagnosisCodes};
                    break;
                case "Hospital":
                    entry = {type: "Hospital", description, date, specialist, discharge, diagnosisCodes};
                    break;
                case "HealthCheck":
                    entry = {type: "HealthCheck", description, date, specialist, healthCheckRating, diagnosisCodes};
                    break;
            }
            patientService.addEntry(entry as Entry, params.id)
            .catch((error) => {
                setAlert(error.response.data);
                setTimeout(() => {
                    setAlert("");
                }, 5000);
            });
        }
    };

    return (
        <Card variant='outlined'>
            <h2>Add Entry:</h2>
            <form>
                {alert === "" ? null : <Alert variant='filled' severity="error" >{alert}</Alert>}
                <InputLabel id="EntryTypeLabel">Entry Type</InputLabel>
                <Select labelId="EntryTypeLabel" id="entryType"  value={entryType} onChange={(event) => setEntryType(event.target.value as Entry["type"])} fullWidth>
                    <MenuItem value={"Hospital"}>Hospital</MenuItem>
                    <MenuItem value={"OccupationalHealthcare"}>Occupational Healthcare</MenuItem>
                    <MenuItem value={"HealthCheck"}>Health Check</MenuItem>
                </Select>

                <TextField id="outlined-basic" label="Description" variant="outlined" value={description} onChange={(event) => setDescription(event.target.value)} fullWidth margin="normal" />
                <InputLabel id="DateLabel">Date</InputLabel>
                <Input type="date" value={date} onChange={(event) => setDate(event.target.value)} fullWidth ></Input>
                <TextField id="outlined-basic" label="Specialist" variant="outlined" value={specialist} onChange={(event) => setSpecialist(event.target.value)} fullWidth margin="normal"/>
                <InputLabel id="DateLabel">Diagnosis Codes</InputLabel>

                <Select multiple value={diagnosisCodes} onChange={(event) => setDiagnosisCodes(event.target.value as string[])} renderValue={(selected) => (<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>{selected.map((value) => (<Chip key={value} label={value} />))}</Box>)} fullWidth >{diagnoses.map((diagnosis) => {
                    return (
                        <MenuItem key={diagnosis.code} value={diagnosis.code} > {diagnosis.code} {diagnosis.name}</MenuItem>
                    );
                })}</Select>

                {entryType == "OccupationalHealthcare" ? <OccupationalHealthcareForm employerName= {employerName} setEmployerName={setEmployerName} sickLeave={sickLeave} setSickLeave={setSickLeave} /> : null}
                {entryType == "Hospital" ? <HopsitalForm discharge={discharge} setDischarge={setDischarge} /> : null}
                {entryType == "HealthCheck" ? <HealthCheckForm healthCheckRating={healthCheckRating} setHealthCheckRating={setHealthCheckRating} />: null}  
                
                <Stack direction="row" justifyContent="space-between">
                    <Button color="error" variant="contained" onClick={() => setShowForm(false)} >Cancel</Button>
                    <Button color="primary" variant="contained" onClick={() => sendEntry()}>Add</Button>
                </Stack>

            </form>
        </Card>
    );
};

export default EntryForm;