import { set, ref } from "@firebase/database";
import { useState } from "react";
import { useDatabase, useUser } from "reactfire";
import { CreateExerciseFormStyle } from "./styles";

const CreateExerciseForm = ({ children, handleAdd, closePopUp }) => {
  const user = useUser();
  const db = useDatabase();
  const [name, setName] = useState("");
  const [reps, setReps] = useState(false);
  const [weightSelected, setWeightSelected] = useState({
    selected: false,
    choice: "lbs",
  });
  const [timeSelected, setTimeSelected] = useState({
    selected: false,
    choice: "seconds",
  });
  const [distanceSelected, setDistanceSelected] = useState({
    selected: false,
    choice: "miles",
  });

  const createExercise = (e) => {
    e.preventDefault();

    // Create exercise object
    const newExercise = {
      name: name,
      measures: [],
    };

    if (weightSelected.selected) {
      newExercise.measures.push(weightSelected.choice);
    }
    if (timeSelected.selected) {
      newExercise.measures.push(timeSelected.choice);
    }
    if (distanceSelected.selected) {
      newExercise.measures.push(distanceSelected.choice);
    }
    if (reps) {
      newExercise.measures.push("reps");
    }

    // Add to user's custom exercise data
    const customExercisesRef = ref(
      db,
      `users/${user.data.uid}/custom-exercises/${name}`
    );
    set(customExercisesRef, newExercise);

    // Add to the workout
    handleAdd(newExercise.name, newExercise.measures);
    closePopUp();
  };

  const updateWeightSelection = (e, value) => {};

  const updateTimeSelection = (e, value) => {};

  const updateDistanceSelection = (e, value) => {};

  return (
    <CreateExerciseFormStyle onSubmit={(e) => createExercise(e)}>
      <div>
        <label htmlFor="customExerciseName">Name</label>
        <input
          id="customExerciseName"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <h3>Measures</h3>
        <div>
          <div>
            <input
              type="checkbox"
              id="exerciseMeasure-reps"
              value="reps"
              checked={reps}
              onChange={(e) => setReps(e.target.checked)}
            />
            <label htmlFor="exerciseMeasure-reps">Reps</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="exerciseMeasure-weight"
              onChange={(e) =>
                setWeightSelected((prev) => {
                  return { ...prev, selected: e.target.checked };
                })
              }
            />
            <label htmlFor="exerciseMeasure-weight">Weight</label>
          </div>
          <div
            style={{
              marginLeft: ".7rem",
              display: weightSelected.selected ? "block" : "none",
            }}
          >
            <h4>Units</h4>
            <div style={{ marginLeft: ".5rem" }}>
              <div>
                <input
                  type="radio"
                  name="weightUnits"
                  id="exerciseMeasure-weight-unit-lbs"
                  value="lbs"
                  checked={weightSelected.choice === "lbs"}
                  onChange={(e) =>
                    setWeightSelected((prev) => {
                      if (e.target.checked) {
                        return { ...prev, choice: "lbs" };
                      } else {
                        return prev;
                      }
                    })
                  }
                />
                <label htmlFor="exerciseMeasure-weight-unit-lbs">lbs</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="weightUnits"
                  id="exerciseMeasure-weight-unit-kg"
                  value="kg"
                  checked={weightSelected.choice === "kg"}
                  onChange={(e) =>
                    setWeightSelected((prev) => {
                      if (e.target.checked) {
                        return { ...prev, choice: "kg" };
                      } else {
                        return prev;
                      }
                    })
                  }
                />
                <label htmlFor="exerciseMeasure-weight-unit-kg">kg</label>
              </div>
            </div>
          </div>
          <div>
            <input
              type="checkbox"
              id="exerciseMeasure-time"
              onChange={(e) =>
                setTimeSelected((prev) => {
                  return { ...prev, selected: e.target.checked };
                })
              }
            />
            <label htmlFor="exerciseMeasure-time">Time</label>
          </div>
          <div
            style={{
              marginLeft: ".7rem",
              display: timeSelected.selected ? "block" : "none",
            }}
          >
            <h4>Units</h4>
            <div style={{ marginLeft: ".5rem" }}>
              <div>
                <input
                  type="radio"
                  name="timeUnits"
                  id="exerciseMeasure-time-unit-seconds"
                  value="seconds"
                  checked={timeSelected.choice === "seconds"}
                  onChange={(e) =>
                    setTimeSelected((prev) => {
                      if (e.target.checked) {
                        return { ...prev, choice: "seconds" };
                      } else {
                        return prev;
                      }
                    })
                  }
                />
                <label htmlFor="exerciseMeasure-weight-unit-seconds">
                  seconds
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  name="timeUnits"
                  id="exerciseMeasure-time-unit-minutes"
                  value="minutes"
                  checked={timeSelected.choice === "minutes"}
                  onChange={() =>
                    setTimeSelected((prev) => {
                      return { ...prev, choice: "minutes" };
                    })
                  }
                />
                <label htmlFor="exerciseMeasure-time-unit-minutes">
                  minutes
                </label>
              </div>
            </div>
          </div>
          <div>
            <input
              type="checkbox"
              id="exerciseMeasure-distance"
              onChange={(e) =>
                setDistanceSelected((prev) => {
                  return { ...prev, selected: e.target.checked };
                })
              }
            />
            <label htmlFor="exerciseMeasure-distance">Distance</label>
          </div>
          <div
            style={{
              marginLeft: ".7rem",
              display: distanceSelected.selected ? "block" : "none",
            }}
          >
            <h4>Units</h4>
            <div style={{ marginLeft: ".5rem" }}>
              <div>
                <input
                  type="radio"
                  name="distUnits"
                  id="exerciseMeasure-dist-unit-mi"
                  value="miles"
                  checked={distanceSelected.choice === "miles"}
                  onChange={() =>
                    setDistanceSelected((prev) => {
                      return { ...prev, choice: "miles" };
                    })
                  }
                />
                <label htmlFor="exerciseMeasure-dist-unit-mi">miles</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="distUnits"
                  id='ename="distUnits" xerciseMeasure-dist-unit-km'
                  value="km"
                  checked={distanceSelected.choice === "km"}
                  onChange={() =>
                    setDistanceSelected((prev) => {
                      return { ...prev, choice: "km" };
                    })
                  }
                />
                <label htmlFor="exerciseMeasure-dist-unit-km">kilometers</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <button>Cancel</button>

        <button>Create and Add</button>
      </div>
    </CreateExerciseFormStyle>
  );
};

export default CreateExerciseForm;
