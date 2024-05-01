import { Entry } from '../../types';

const RenderEntry = ({entry}: { entry: Entry }): JSX.Element => {
    return (
        <>
            <p>{entry.date} {entry.description}</p>
            <ul>
                {entry.diagnosisCodes?.map((code) => <li key={code} >{code} </li>)}
            </ul>

        </>
    );
};

export default RenderEntry;