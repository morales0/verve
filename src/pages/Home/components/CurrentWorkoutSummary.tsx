import { Paper, Stack } from "@mantine/core";
import { Link } from "react-router-dom";

type Props = {
  workout?: object;
};

const CurrentWorkoutSummary = ({ workout }: Props) => {
  return (
    <Stack>
      <Link to="/workout">
        <Paper shadow="xs" radius="sm" p="lg" withBorder>
          Click to continue workout
        </Paper>
      </Link>
    </Stack>
  );
};

export default CurrentWorkoutSummary;
