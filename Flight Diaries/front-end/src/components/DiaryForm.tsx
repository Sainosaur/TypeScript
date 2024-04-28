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
                setNotification(String(error.response?.data) || "Unknown server error");
                setTimeout(() => setNotification(''), 5000);

            } else {
                setNotification("Unknown server error");
                setTimeout(() => setNotification(''), 5000);
            }
        });
    };
    return (
        <div>
            <Notification notification={notification} />
            <form onSubmit={(event) => handleSubmit(event)}>
                <p>date: <input value={date} type="date" onChange={(event) => setDate(event.target.value)} /> </p>
                <div>visibility: 
                    <input type="radio" value="great" onChange={(event) => setVisibility(event.target.value)} /> <label>Great</label>
                    <input type="radio" value="good" onChange={(event) => setVisibility(event.target.value)} /> <label>Good</label>
                    <input type="radio" value="ok" onChange={(event) => setVisibility(event.target.value)} /> <label>Ok</label>
                    <input type="radio" value="poor" onChange={(event) => setVisibility(event.target.value)} /> <label>Poor</label>
                </div>
                <div>weather: 
                    <input type="radio" value="sunny" onChange={(event) => setWeather(event.target.value)} /> <label>Sunny</label>
                    <input type="radio" value="rainy" onChange={(event) => setWeather(event.target.value)} /> <label>Rainy</label>
                    <input type="radio" value="cloudy" onChange={(event) => setWeather(event.target.value)} /> <label>Cloudy</label>
                    <input type="radio" value="stormy" onChange={(event) => setWeather(event.target.value)} /> <label>Stormy</label>
                    <input type="radio" value="windy" onChange={(event) => setWeather(event.target.value)} /> <label>Windy</label>
                </div>
                <p>comment: <input value={comment} onChange={(event) => setComment(event.target.value)} /></p>
                <button type="submit" >Submit</button>
            </form>
        </div>

    );
};

export default DiaryForm;