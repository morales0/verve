import { Box, Stack, createStyles } from "@mantine/core";
import { Navigate, Route, Routes } from "react-router-dom";
import UserNavbar from "../components/app/UserNavbar";
import { useUser } from "../context/user";
import Home from "../pages/Home/Home";
import { Workout } from "@/pages/Workout";

const useStyles = createStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
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
        </Routes>
      </Box>
    </Stack>
  );
};

export default AuthApp;
