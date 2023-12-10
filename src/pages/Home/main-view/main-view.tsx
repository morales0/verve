import { Button, Paper, Stack, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { Groups } from "./groups";
import { Workouts } from "./workouts";

export const MainView = () => {
  const navigate = useNavigate();

  return (
    <Stack align="stretch" px="xs" pt="xs" pb="sm" gap="sm">
      <Groups />
      <Button variant="gradient" gradient={{ from: "teal", to: "blue", deg: 120 }} onClick={() => navigate("/workout")}>
        <Text>Start Workout</Text>
      </Button>
      <Paper>
        <Text>Stats</Text>
      </Paper>
      <Workouts />
    </Stack>
  );
};
