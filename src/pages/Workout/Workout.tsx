import globalClasses from "@/styles/app.module.css";
import { Box, Center, Loader } from "@mantine/core";
import { Navigate, Route, Routes } from "react-router-dom";
import { Exercises } from "./exercises";
import { Select } from "./select";
import { Summary } from "./summary";
import useWorkout from "@/hooks/workout.hook";
import { STATUS } from "@/types/util";

export const Workout = () => {
  const workout = useWorkout();

  return workout.status !== STATUS.SUCCESS ? (
    <Center>
      <Loader />
    </Center>
  ) : workout.data ? (
    <Box className={globalClasses.heightLocked} pt="xs">
      <Routes>
        <Route path="/" element={<Select />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/exercise/:group/:index" element={<Exercises />} />
      </Routes>
    </Box>
  ) : (
    <Navigate to="/" replace />
  );
};
