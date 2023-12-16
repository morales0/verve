import { Box } from "@mantine/core";
import { Route, Routes } from "react-router-dom";
import { Exercises } from "./exercises";
import { Select } from "./select";
import { Summary } from "./summary";
// import classes from "./workout.module.css";
import globalClasses from "@/styles/app.module.css";

export const Workout = () => {
  return (
    <Box className={globalClasses.heightLocked} h="100%" pb="sm">
      <Routes>
        <Route path="/" element={<Select />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/exercise/:id" element={<Exercises />} />
      </Routes>
    </Box>
  );
};
