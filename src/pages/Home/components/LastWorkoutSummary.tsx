import { Button, Group, Paper, Stack, Title } from "@mantine/core";
import { useState } from "react";

type Props = {
  startNewWorkoutAndNavigate: () => Promise<void>;
};

const LastWorkoutSummary = ({ startNewWorkoutAndNavigate }: Props) => {
  const [isCreating, setIsCreating] = useState(false);

  const handleStartWorkout = () => {
    console.log("Handle start");

    setIsCreating(true);

    startNewWorkoutAndNavigate().catch((e) => {
      console.log("Error creating workout, tell user to try again");
    });

    console.log("Handle done");
  };

  return (
    <Stack mb={"2rem"}>
      <Group position="apart">
        <Title order={2}>Last Workout</Title>
        <Button
          color={"teal"}
          onClick={handleStartWorkout}
          disabled={isCreating}
        >
          {isCreating ? "Creating workout..." : "+ New Workout"}
        </Button>
      </Group>

      <Paper shadow="xs" radius="sm" p="lg" withBorder>
        No workout history... Get your verve on!
      </Paper>
    </Stack>
  );
};

export default LastWorkoutSummary;
