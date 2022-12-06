import { ExerciseView } from "components/app";
import { useState } from "react";
import { StyledCompletedScreen } from "./styles";
import { Button } from "components/ui";
import useCustomExercises from "hooks/customExercises";

const CompletedScreen = ({ exercises, cancelWorkout, completeWorkout }) => {
  const [open, setOpen] = useState(false);
  const customExercises = useCustomExercises();

  if (customExercises.status === "loading") {
    return null;
  }

  return (
    <StyledCompletedScreen open={open}>
      <header onClick={() => setOpen(!open)}>
        <p>Completed: {exercises ? Object.keys(exercises).length : 0}</p>
        <div>Click to {open ? "close" : "open"}</div>
      </header>
      <div className="body">
        {exercises &&
          Object.entries(exercises).map(([id, sets], i) => {
            return (
              <ExerciseView
                key={`exview-${i}`}
                name={customExercises.data[id].name}
                sets={sets}
                measures={Object.keys(sets[0])}
              />
            );
          })}
      </div>
      <div className="footer">
        <Button btnStyle={"danger"} onClick={cancelWorkout}>
          Cancel Workout
        </Button>
        <Button btnStyle={"success"} onClick={completeWorkout}>
          Complete Workout
        </Button>
      </div>
    </StyledCompletedScreen>
  );
};

export default CompletedScreen;
