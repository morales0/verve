import Exercise from "../Exercise/Exercise";
import { StyledExerciseGrid } from "./styles";

const ExerciseGrid = ({ status, exercises, emptyMessage }) => {
  console.log("--- <ExerciseGrid />");

  return (
    <StyledExerciseGrid>
      {status === "loading" ? (
        <div>Loading exercises...</div>
      ) : status === "success" ? (
        exercises &&
        exercises.length > 0 &&
        exercises?.map((ex, i) => <Exercise key={ex.name + i} {...ex} />)
      ) : (
        <div>Something went wrong...</div>
      )}
    </StyledExerciseGrid>
  );
};

export default ExerciseGrid;
