import UserNavbar from "@/components/app/UserNavbar";
import { useUser } from "@/context/user";
import { ExerciseForm, Home, Workout } from "@/pages";
import classes from "@/styles/app.module.css";
import { Box, Divider, Stack, rem } from "@mantine/core";
import { Navigate, Route, Routes } from "react-router-dom";

const AuthApp = () => {
  const { meta } = useUser();

  return (
    <Stack h="100%" gap={0}>
      <UserNavbar />
      {/* <Divider className={classes.navbarDivider} mb={rem(6)} /> */}
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
