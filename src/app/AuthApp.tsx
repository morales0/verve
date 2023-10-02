import { Box, Stack, createStyles } from "@mantine/core";
import { Navigate, Route, Routes } from "react-router-dom";
import UserNavbar from "../components/app/UserNavbar";
import { useUser } from "../context/user";
import Home from "../pages/Home/Home";
import Workout from "../pages/Workout/Workout";

const useStyles = createStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    // backgroundColor: theme.colorScheme === "light" ? theme.colors.gray[0] : theme.colors.gray[9],
  },
}));

const AuthApp = () => {
  const { meta } = useUser();
  const { classes } = useStyles();

  return (
    <Stack h={"100%"} spacing={0}>
      <UserNavbar />
      <Box className={classes.root}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workout" element={meta.isWorkingOut ? <Workout /> : <Navigate to="/" replace />} />
          <Route path="/exercises" element={<div>Exercises</div>} />
          <Route path="/history" element={<div>History</div>} />
          <Route path="/data" element={<div>Data</div>} />
        </Routes>
      </Box>
    </Stack>
  );
};

export default AuthApp;
