import { Box, Stack } from "@mantine/core";
import { Summary } from "./summary";
import { useState } from "react";
import { Select } from "./select";
import { Exercises } from "./exercises";

export const Workout = () => {
  const [screen, setScreen] = useState<"summary" | "exercise" | "select">("exercise");

  return (
    <Box h="100%" pb="sm" sx={{ overflow: "hidden" }}>
      {screen === "summary" && <Summary onAddExercise={() => setScreen("select")} />}
      {screen === "select" && (
        <Select onReturn={() => setScreen("summary")} onStartExercise={() => setScreen("exercise")} />
      )}
      {screen === "exercise" && (
        <Exercises onRemove={() => setScreen("summary")} onFinish={() => setScreen("summary")} />
      )}
    </Box>
  );
};
