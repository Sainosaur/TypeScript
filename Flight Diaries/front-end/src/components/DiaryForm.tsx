import axios from 'axios';
import { useState } from 'react';
import Notification from './Notification';

const baseURL = "http://localhost:3000/api";


const DiaryForm = () => {
    const [date, setDate] = useState('');
    const [visibility , setVisibility] = useState('');
    const [weather, setWeather] = useState('');
    const [comment, setComment] = useState('');
    const [notification, setNotification] = useState('');


// aynchronous functions didn't work with this for some reason so had to use this method

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        axios.post(`${baseURL}/diaries`, {
            date,
            visibility,
            weather,
            comment
        })
        .catch((error: unknown) => {
            if (axios.isAxiosError(error) ) {
                setNotification(error.response?.data || "Unknown server error");
                setTimeout(() => setNotification(''), 5000);

            } else {
                setNotification("Unknown server error")
                setTimeout(() => setNotification(''), 5000);
            }
        });
    };
    return (
        <div>
            <Notification notification={notification} />
            <form onSubmit={(event) => handleSubmit(event)}>
                <p>date: <input value={date} type="date" onChange={(event) => setDate(event.target.value)} /> </p>
                <p>visibility: <input value={visibility} onChange={(event) => setVisibility(event.target.value)}/></p>
                <p>weather: <input value={weather} onChange={(event) => setWeather(event.target.value)} /></p>
                <p>comment: <input value={comment} onChange={(event) => setComment(event.target.value)} /></p>
                <button type="submit" >Submit</button>
            </form>
        </div>

    );
};

export default DiaryForm;