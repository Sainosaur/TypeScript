interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescription{
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartSpecial extends CoursePartDescription {
  requirements: string[];
  kind: "special";

}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

const Part = ({ coursePart }: { coursePart: CoursePart }): JSX.Element => {
  const UnhandledCourse = (coursePart: never): never => {
    throw new Error(`Incomplete type checking or invalid type! for the course ${JSON.stringify(coursePart)}`)
  }
  switch (coursePart.kind) {
    case "basic": 
      return (
        <div>
          <h3> {coursePart.name} {coursePart.exerciseCount} </h3>
          <p> {coursePart.description}</p>
        </div>
      );
    case "group":
      return (
        <div>
          <h3> {coursePart.name} {coursePart.exerciseCount} </h3>
          <p>Number of group exercises: {coursePart.groupProjectCount}</p>
        </div>
      );
    case "background": 
      return (
        <div>
          <h3> {coursePart.name} {coursePart.exerciseCount} </h3>
          <p>{coursePart.description}</p>
          <p> Background Learning: <a href={coursePart.backgroundMaterial} >{coursePart.backgroundMaterial}</a></p>
        </div>
      );
    case "special":
      return (
        <div>
          <h3> {coursePart.name} {coursePart.exerciseCount} </h3>
          <p>{coursePart.description}</p>
          <p> Requirements for the course: {coursePart.requirements.join(', ')}</p>
        </div>
      )
    default:
      return UnhandledCourse(coursePart);

  }
};

const Content = ({ partList }: { partList: CoursePart[] }): JSX.Element => {
  return (
    <div>
      {partList.map((part) => {
        return (
          <Part coursePart={part} />
        );
      })}
    </div>
  );
};

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    }
  ];
  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <h1>{courseName}</h1>
      <Content partList={courseParts} />
      <p>
        Number of exercises {totalExercises}
      </p>
    </div>
  );
};

export default App;