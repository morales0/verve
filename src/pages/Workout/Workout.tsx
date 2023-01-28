import { Box, Group, Stack, Text } from "@mantine/core";
import { Navigate } from "react-router-dom";
import { useIsWorkingOut } from "../../hooks/is-working-out-hook";
import useWorkout from "../../hooks/workout";

const Workout = () => {
  const { workout, ...api } = useWorkout();
  const { isWorkingOut, status: isWorkingOutStatus } = useIsWorkingOut();

  if (isWorkingOutStatus === "loading") {
    return <Text>Checking for workout...</Text>;
  }

  if (!isWorkingOut) {
    return <Navigate to="/" replace />;
  }

  return (
    <Stack>
      <StatusBar />
      <Group>
        <Box>Exercise screen</Box>
        <Box>Summary Screen</Box>
      </Group>
    </Stack>
  );
};

function StatusBar() {
  return <Box>Status Bar</Box>;
}

export default Workout;
