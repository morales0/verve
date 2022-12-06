import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import AddExercisePopUp from "./components/AddExercisePopUp/AddExercisePopUp";
import AddExerciseScreen from "./components/AddExerciseScreen/AddExerciseScreen";
import CompletedExercises from "./components/CompletedExercises/CompletedExercises";
import CompletedScreen from "./components/CompletedScreen/CompletedScreen";
import CurrentExercises from "./components/CurrentExercises/CurrentExercises";
import CurrentExerciseScreen from "./components/CurrentExerciseScreen/CurrentExerciseScreen";
import { StyledWorkoutView, Body } from "./styles";
import { useWorkout } from "./WorkoutContainer";

const WorkoutView = () => {
  const {
    workoutData,
    pageState: { currScreen, setCurrScreen },
    api,
  } = useWorkout();
  const currExercise = workoutData.data["currentExercise"];

  useEffect(() => {
    if (currExercise) {
      setCurrScreen("exercise");
    } else {
      setCurrScreen("add");
    }
  }, [currExercise, setCurrScreen]);

  return (
    <StyledWorkoutView>
      <CompletedScreen
        exercises={workoutData.data["completedExercises"]}
        cancelWorkout={api.cancelWorkout}
        completeWorkout={api.completeWorkout}
      />
      {currScreen === "add" ? (
        <AddExerciseScreen onAdd={() => setCurrScreen("exercise")} />
      ) : currScreen === "exercise" && currExercise ? (
        <CurrentExerciseScreen {...currExercise} />
      ) : currScreen === "loading" ? (
        <div>Loading workout</div>
      ) : (
        <div>Summary</div>
      )}
    </StyledWorkoutView>
  );
};

export default WorkoutView;
