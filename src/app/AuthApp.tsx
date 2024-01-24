import UserNavbar from "@/components/app/UserNavbar";
import { ExerciseForm, Home, User, Workout } from "@/pages";
import classes from "@/styles/app.module.css";
import { Box, Stack } from "@mantine/core";
import { Route, Routes } from "react-router-dom";

const AuthApp = () => {
  return (
    <Stack h="100%" gap={0}>
      <UserNavbar />
      <Box className={classes.main}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workout/*" element={<Workout />} />
          <Route path="/exercise-form/*" element={<ExerciseForm />} />
          <Route path="/user/*" element={<User />} />
        </Routes>
      </Box>
    </Stack>
  );
};

export default AuthApp;
