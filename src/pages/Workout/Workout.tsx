import { Box, Stack } from "@mantine/core";
import { Summary } from "./summary";
import { useState } from "react";
import { Select } from "./select";
import { Exercises } from "./exercises";
import classes from "./workout.module.css";
import { Link, Route, Routes } from "react-router-dom";

export const Workout = () => {
  const [screen, setScreen] = useState<"summary" | "exercise" | "select">("select");

  const cancelWorkout = () => {
    console.log("cancel workout");
  };
  const startExercises = () => {
    console.log("start exercises");
  };

  return (
    <Box h="100%" pb="sm" className={classes.workout}>
      <Routes>
        <Route path="/" element={<Select />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/exercise/:id" element={<Exercises />} />
      </Routes>
    </Box>
  );
};
