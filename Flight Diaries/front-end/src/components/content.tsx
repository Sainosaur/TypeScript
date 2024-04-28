import { DiaryEntry } from "../types";

const Content = ({diaries}: {diaries: DiaryEntry[]}): JSX.Element => {
    return (
        <>
            {diaries.map((diary) => {
                return (
                    <div key={diary.id}>
                        <h3>{diary.date}</h3>
                        <p>visibility: {diary.visibility}</p>
                        <p>weather: {diary.weather} </p>
                    </div>

                );
            })}
        </>
    );
};

export default Content;