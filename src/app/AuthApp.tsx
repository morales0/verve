import { Box, Flex } from "@mantine/core";
import { Route, Routes } from "react-router-dom";
import UserNavbar from "../components/app/UserNavbar";
import Home from "../pages/Home/Home";
import Workout from "../pages/Workout/Workout";

const AuthApp = () => {
  return (
    <Flex direction="column" h={"100%"}>
      <UserNavbar />
      <Box
        style={{
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
    </Flex>
  );
};

export default AuthApp;
