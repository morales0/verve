import { Stack, Group, Title, Button, Paper } from "@mantine/core";
import { ref, set } from "firebase/database";
import React from "react";
import { useAuth } from "../../../context/auth";
import { useDatabase } from "../../../context/database";
import { useIsWorkingOut } from "../../../hooks/is-working-out-hook";

type Props = {};

const LastWorkoutSection = (props: Props) => {
  const { setIsWorkingOut } = useIsWorkingOut();

  const startNewWorkout = () => {
    setIsWorkingOut(true);
  };

  return (
    <Stack mb={"2rem"}>
      <Group position="apart">
        <Title order={2}>Last Workout</Title>
        <Button color={"teal"} onClick={startNewWorkout}>
          + New Workout
        </Button>
      </Group>

      <Paper shadow="xs" radius="sm" p="lg" withBorder>
        No workout history... Get your verve on!
      </Paper>
    </Stack>
  );
};

export default LastWorkoutSection;
