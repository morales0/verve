import { Box, Flex, Stack } from "@mantine/core";
import { Route, Routes } from "react-router-dom";
import UserNavbar from "../components/app/UserNavbar";
import Home from "../pages/Home/Home";
import Workout from "../pages/Workout/Workout";

const AuthApp = () => {
  return (
    <Stack h={"100%"} spacing={0}>
      <UserNavbar />
      <Box
        sx={{
          flexGrow: 1,
          overflow: "hidden",
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workout" element={<Workout />} />
          <Route path="/exercises" element={<div>Exercises</div>} />
          <Route path="/history" element={<div>History</div>} />
          <Route path="/data" element={<div>Data</div>} />
        </Routes>
      </Box>
    </Stack>
  );
};

export default AuthApp;
