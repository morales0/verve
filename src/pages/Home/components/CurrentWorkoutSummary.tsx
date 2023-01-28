import { Group, Paper, Stack, Title } from "@mantine/core";
import { Link } from "react-router-dom";

type Props = {
  workout?: object;
};

const CurrentWorkoutSummary = ({ workout }: Props) => {
  return (
    <Stack mb={"2rem"}>
      <Group position="center">
        <Title order={3}>Current Workout</Title>
      </Group>

      <Link to="/workout">
        <Paper shadow="xs" radius="sm" p="lg" withBorder>
          Current workout
        </Paper>
      </Link>
    </Stack>
  );
};

export default CurrentWorkoutSummary;
