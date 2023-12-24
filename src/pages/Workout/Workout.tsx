import globalClasses from "@/styles/app.module.css";
import { Box } from "@mantine/core";
import { Route, Routes } from "react-router-dom";
import { Exercises } from "./exercises";
import { Select } from "./select";
import { Summary } from "./summary";

export const Workout = () => {
  return (
    <Box className={globalClasses.heightLocked} pb="sm">
      <Routes>
        <Route path="/" element={<Select />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/exercise/:group/:index" element={<Exercises />} />
      </Routes>
    </Box>
  );
};
