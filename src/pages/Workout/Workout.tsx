import { Box, Stack } from "@mantine/core";
import { Summary } from "./summary";
import { useState } from "react";
import { Select } from "./select";

export const Workout = () => {
  const [screen, setScreen] = useState<"summary" | "exercise" | "select">("summary");

  return (
    <Box h="100%" pb="sm" sx={{ overflow: "hidden" }}>
      {screen === "summary" && <Summary onAddExercise={() => setScreen("select")} />}
      {screen === "select" && <Select onStartExercise={() => setScreen("exercise")} />}
    </Box>
  );
};
