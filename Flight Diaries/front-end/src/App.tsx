import axios from "axios";
import { DiaryEntry } from "./types";
import { useEffect, useState } from "react";
import Content from "./components/content";
import { parseDiaries } from "./utils";

const baseURL = "http://localhost:3000/api"

const App = (): JSX.Element => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  useEffect(() => {
    axios.get(`${baseURL}/diaries`).then((res) => {
      setDiaries(parseDiaries(res.data));
    })
  }, [])

  return (
    <>
      <h1>Entries:</h1>
      <Content diaries={diaries}/>
    </>
  )
}

export default App
