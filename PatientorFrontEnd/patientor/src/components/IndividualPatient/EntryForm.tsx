import { Alert, Button, Card, Stack, TextField } from '@mui/material';
import { useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { sickLeave } from "../../types";

const EntryForm = ({ setShowForm }: { setShowForm: React.Dispatch<React.SetStateAction<boolean>>}): JSX.Element => {
    const [alert, setAlert] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [specialist, setSpecialist] = useState("");
    const [employerName, setEmployerName] = useState("");
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
    const [sickLeave, setSickLeave] = useState<sickLeave>({startDate: "", endDate: ""});

    const params = useParams();
    const sendEntry = () => {
        if (params.id) {
            patientService.addEntry({type: "OccupationalHealthcare", description, date, specialist, employerName, sickLeave, diagnosisCodes}, params.id).then((data) => {
                console.log(data);
            }).catch((error) => {
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
                <TextField id="outlined-basic" label="Description" variant="outlined" value={description} onChange={(event) => setDescription(event.target.value)} fullWidth margin="normal" />
                <TextField id="outlined-basic" label="Date" variant="outlined" value={date} onChange={(event) => setDate(event.target.value)} fullWidth margin="normal" />
                <TextField id="outlined-basic" label="Specialist" variant="outlined" value={specialist} onChange={(event) => setSpecialist(event.target.value)} fullWidth margin="normal"/>
                <TextField id="outlined-basic" label="Diagnosis Codes" variant="outlined" value={diagnosisCodes} onChange={(event) => setDiagnosisCodes(event.target.value.split(","))} fullWidth margin="normal"/>
                <TextField id="outlined-basic" label="Employer Name" variant="outlined" value={employerName} onChange={(event) => setEmployerName(event.target.value)} fullWidth margin="normal"/>
                <TextField id="outlined-basic" label="Sick Leave Start" variant="outlined" value={sickLeave.startDate} onChange={(event) => setSickLeave({...sickLeave, startDate: event.target.value})} fullWidth margin="normal"/>
                <TextField id="outlined-basic" label="Sick Leave End" variant="outlined" value={sickLeave.endDate} onChange={(event) => setSickLeave({...sickLeave, endDate: event.target.value})} fullWidth margin="normal"/>
                <Stack direction="row" justifyContent="space-between">
                    <Button color="error" variant="contained" onClick={() => setShowForm(false)} >Cancel</Button>
                    <Button color="primary" variant="contained" onClick={() => sendEntry()}>Add</Button>
                </Stack>

            </form>
        </Card>
    );
};

export default EntryForm;