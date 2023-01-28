import { Box, Flex, ScrollArea } from "@mantine/core";
import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import UserNavbar from "../components/app/UserNavbar";
import { useIsWorkingOut } from "../hooks/is-working-out-hook";
import Home from "../pages/Home/Home";
import Workout from "../pages/Workout/Workout";

const AuthApp = () => {
  return (
    <Flex direction="column" h={"100%"}>
      <UserNavbar />
      <Box
        component={ScrollArea}
        px={"lg"}
        py={"lg"}
        sx={{
          flexGrow: 1,
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
