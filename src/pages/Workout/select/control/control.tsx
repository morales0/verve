import { Box, Divider, Center, Button, Group } from "@mantine/core";

export type ControlProps = {
  canRemoveCircuit: boolean;
  removeCurrCircuit: () => void;
  isStartingExercises: boolean;
  canStartExercises: boolean;
  onStartExercises: () => void;
  onCancelWorkout: () => void;
};

export const Control = ({
  canRemoveCircuit,
  removeCurrCircuit,
  isStartingExercises,
  canStartExercises,
  onStartExercises,
  onCancelWorkout,
}: ControlProps) => {
  return (
    <Box mt="auto">
      <Box display={canRemoveCircuit ? "" : "none"} px="xs">
        <Divider />
        <Center py={6}>
          <Button size="compact-sm" color="pink" onClick={removeCurrCircuit}>
            Remove Circuit
          </Button>
        </Center>
      </Box>

      <Divider />
      <Group w="100%" pt="sm" pb="md" px="xs" align="center" justify="space-between" grow>
        <Button size="sm" variant="light" color="red" onClick={onCancelWorkout}>
          Cancel Workout
        </Button>
        <Button
          size="sm"
          color="blue.5"
          loading={isStartingExercises}
          disabled={!canStartExercises}
          onClick={onStartExercises}
        >
          Start Exercises
        </Button>
      </Group>
    </Box>
  );
};
