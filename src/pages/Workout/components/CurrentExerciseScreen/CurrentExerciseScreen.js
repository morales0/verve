import { useWorkout } from "pages/Workout/WorkoutContainer.jsx";
import { useState } from "react";
import { Button } from "components/ui";
import {
  AddSetButton,
  Body,
  ControlGroup,
  Header,
  LabelContainer,
  MeasureLabel,
  RemoveSetButton,
  SetGrid,
  SetRow,
  SetValInput,
  StyledCurrentExerciseScreen,
} from "./styles.js";
import WeightInput from "./WeightInput.jsx";

const CurrentExerciseScreen = ({ name, measures, starterSets, id }) => {
  const { api } = useWorkout();

  const [sets, setSets] = useState(starterSets);

  const updateSetVal = (set, measure, newVal) => {
    let updatedSets = [...sets];
    updatedSets[set][measure] = newVal;

    setSets(updatedSets);
  };

  const addSet = () => {
    let updatedSets = [...sets];
    updatedSets.push({ ...updatedSets[sets.length - 1] });

    setSets(updatedSets);
  };

  const removeSet = (i) => {
    let updatedSets = [...sets];
    updatedSets.splice(i, 1);

    setSets(updatedSets);
  };

  const cancelExercise = () => {
    api.removeExercise();
  };

  const finishExercise = () => {
    const finalSets = [];

    sets.forEach((set, i) => {
      finalSets.push({});
      measures.forEach((m) => {
        finalSets[i][m] = set[m];
      });
    });

    api.completeExercise({ name, sets, id });
  };

  return (
    <StyledCurrentExerciseScreen>
      <Header>
        <h2>{name}</h2>
      </Header>
      <Body>
        <LabelContainer>
          {measures?.map((measure, i) => (
            <MeasureLabel key={`mesaure-label-${measure}`}>
              {measure}
            </MeasureLabel>
          ))}
        </LabelContainer>
        <AddSetButton setSize={measures.length} onClick={addSet}>
          +
        </AddSetButton>
        <SetGrid>
          {sets?.map((set, i) => (
            <SetRow key={`setRow-${i}`}>
              {Object.entries(set).map(([m, val], j) =>
                m === "lbsLATER" ? (
                  <WeightInput givenValue={val} />
                ) : (
                  <SetValInput
                    key={`${i}-${j}`}
                    type="number"
                    value={val}
                    onChange={(e) => updateSetVal(i, m, e.target.value)}
                    onFocus={(e) => e.target.select()}
                  />
                )
              )}
              {i > 0 && (
                <RemoveSetButton onClick={() => removeSet(i)}>
                  x
                </RemoveSetButton>
              )}
            </SetRow>
          ))}
        </SetGrid>
        <ControlGroup>
          <Button size={"small"} btnStyle={"danger"} onClick={cancelExercise}>
            Cancel Exercise
          </Button>
          <Button size={"small"} btnStyle={"success"} onClick={finishExercise}>
            Finish Exercise
          </Button>
        </ControlGroup>
      </Body>
    </StyledCurrentExerciseScreen>
  );
};

export default CurrentExerciseScreen;
