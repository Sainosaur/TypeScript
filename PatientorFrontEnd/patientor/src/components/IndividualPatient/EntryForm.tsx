import { Alert, Button, Card, Stack, TextField, Select, MenuItem, InputLabel, Switch } from '@mui/material';
import { useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { sickLeave, Entry, discharge, HealthCheckRating } from "../../types";

const OccupationalHealthcareForm = ({employerName, setEmployerName, sickLeave, setSickLeave}: {employerName: string | undefined, setEmployerName: React.Dispatch<React.SetStateAction<string | undefined>>, sickLeave: sickLeave | null, setSickLeave: React.Dispatch<React.SetStateAction<sickLeave | null>>}) => {
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
                <TextField id="outlined-basic" label="Sick Leave Start" variant="outlined" value={sickLeave.startDate} onChange={(event) => setSickLeave({...sickLeave, startDate: event.target.value})} fullWidth margin="normal"/>
                <TextField id="outlined-basic" label="Sick Leave End" variant="outlined" value={sickLeave.endDate} onChange={(event) => setSickLeave({...sickLeave, endDate: event.target.value})} fullWidth margin="normal"/>
            </> : null}
            
        </>
    );
};

const HopsitalForm = ({discharge, setDischarge}: {discharge: discharge, setDischarge: React.Dispatch<React.SetStateAction<discharge>>}) => {
    return (
        <>
            <TextField id="outlined-basic" label="Discharge date" variant="outlined" value={discharge.date} onChange={(event) => setDischarge({...discharge, date: event.target.value})} fullWidth margin="normal"/>
            <TextField id="outlined-basic" label="Discharge criteria" variant="outlined" value={discharge.criteria} onChange={(event) => setDischarge({...discharge, criteria: event.target.value})} fullWidth margin="normal"/>
        </>
    ); 
};

const HealthCheckForm = ({healthCheckRating, setHealthCheckRating}: {healthCheckRating: HealthCheckRating, setHealthCheckRating: React.Dispatch<React.SetStateAction<HealthCheckRating>>}) => {
    return (
        <>
            <TextField id="outlined-basic" label="Health Check Rating" variant="outlined" value={healthCheckRating} onChange={(event) => setHealthCheckRating(Number(event.target.value))} fullWidth margin="normal"/>
        </>
    );
};

const EntryForm = ({ setShowForm }: { setShowForm: React.Dispatch<React.SetStateAction<boolean>>}): JSX.Element => {
    const [alert, setAlert] = useState("");
    const [entryType, setEntryType] = useState<Entry["type"]>("Hospital");

    const [description, setDescription] = useState<string>();
    const [date, setDate] = useState<string>();
    const [specialist, setSpecialist] = useState<string>();

    const [employerName, setEmployerName] = useState<string>();
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>();
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
                <Select labelId="EntryTypeLabel" id="entryType"  value={entryType} onChange={(event) => setEntryType(event.target.value as Entry["type"])} >
                    <MenuItem value={"Hospital"}>Hospital</MenuItem>
                    <MenuItem value={"OccupationalHealthcare"}>Occupational Healthcare</MenuItem>
                    <MenuItem value={"HealthCheck"}>Health Check</MenuItem>
                </Select>

                <TextField id="outlined-basic" label="Description" variant="outlined" value={description} onChange={(event) => setDescription(event.target.value)} fullWidth margin="normal" />
                <TextField id="outlined-basic" label="Date" variant="outlined" value={date} onChange={(event) => setDate(event.target.value)} fullWidth margin="normal" />
                <TextField id="outlined-basic" label="Specialist" variant="outlined" value={specialist} onChange={(event) => setSpecialist(event.target.value)} fullWidth margin="normal"/>
                <TextField id="outlined-basic" label="Diagnosis Codes" variant="outlined" value={diagnosisCodes} onChange={(event) => setDiagnosisCodes(event.target.value.split(","))} fullWidth margin="normal"/>
                
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