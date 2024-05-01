import { Entry, Diagnosis } from '../../types';

const RenderEntry = ({ entry, diagnoses } : { entry: Entry, diagnoses: Diagnosis[] }): JSX.Element => {
    return (
        <>
            <p>{entry.date} {entry.description}</p>
            <ul>
                {entry.diagnosisCodes?.map((code) => <li key={code} >{code} {diagnoses.find((diagnosis) => diagnosis.code === code)?.name}  </li>)}
            </ul>

        </>
    );
};

export default RenderEntry;