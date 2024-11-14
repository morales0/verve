import UserNavbar from "@/components/app/UserNavbar";
import { ExerciseForm, Home, User, Workout } from "@/pages";
import classes from "@/styles/app.module.css";
import { Box, Stack } from "@mantine/core";
import { Route, Routes } from "react-router-dom";

const UserApp = () => {
  return (
    <Routes>
      <Route path="/" element={<>Home</>} />
    </Routes>
  );
};

export default UserApp;
