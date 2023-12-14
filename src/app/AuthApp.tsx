import UserNavbar from "@/components/app/UserNavbar";
import { useUser } from "@/context/user";
import { ExerciseForm, Home, Workout } from "@/pages";
import classes from "@/styles/app.module.css";
import { Box, Stack } from "@mantine/core";
import { Navigate, Route, Routes } from "react-router-dom";

const AuthApp = () => {
  const { meta } = useUser();

  return (
    <Stack h="100%" gap={0}>
      <UserNavbar />
      <Box className={classes.main}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workout/*" element={meta.isWorkingOut ? <Workout /> : <Navigate to="/" replace />} />
          <Route path="/exercise-form/*" element={<ExerciseForm />} />
        </Routes>
      </Box>
    </Stack>
  );
};

export default AuthApp;
