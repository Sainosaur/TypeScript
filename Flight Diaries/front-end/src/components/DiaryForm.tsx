import axios from 'axios';
import { useState } from 'react';

const baseURL = "http://localhost:3000/api"

const DiaryForm = () => {
    const [date, setDate] = useState('');
    const [visibility , setVisibility] = useState('');
    const [weather, setWeather] = useState('');
    const [comment, setComment] = useState('');


    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault()
        console.log('called')
        await axios.post(`${baseURL}/diaries`, {
            date,
            visibility,
            weather,
            comment
        } )
    }
    return (
        <form onSubmit={(event) => handleSubmit(event)}>
            <p>date: <input value={date} type="date" onChange={(event) => setDate(event.target.value)} /> </p>
            <p>visibility: <input value={visibility} onChange={(event) => setVisibility(event.target.value)}/></p>
            <p>weather: <input value={weather} onChange={(event) => setWeather(event.target.value)} /></p>
            <p>comment: <input value={comment} onChange={(event) => setComment(event.target.value)} /></p>
            <button type="submit" >Submit</button>
        </form>
    )
}

export default DiaryForm