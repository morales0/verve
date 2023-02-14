import { Button, Group, Stack, Title } from "@mantine/core";
import { WorkoutExercise } from "../../../../types/workout";
import Sets from "./Sets";

type Props = {
  exercise: WorkoutExercise;
  onFinish: () => Promise<void>;
  onCancel: () => void;
  updateExercise: (updates: Partial<WorkoutExercise>) => void;
};

const ExerciseScreen = ({ exercise, onFinish, onCancel, updateExercise }: Props) => {
  const addSet = () => {
    updateExercise({
      sets: [
        ...exercise.sets,
        exercise.units.reduce<Record<string, number>>((obj, unit) => ((obj[unit] = 0), obj), {}),
      ],
    });
  };
  const removeSet = () => {
    updateExercise({
      sets: exercise.sets.slice(0, -1),
    });
  };
  const updateSetValue = (index: number, unit: string, value: number) => {
    updateExercise({
      sets: exercise.sets.map((set, i) => (i === index ? { ...set, [unit]: value } : set)),
    });
  };

  return (
    <Stack h="100%" sx={{ overflow: "hidden" }} align="flex-start" spacing={0}>
      <Group align="center" py="sm">
        <Title order={3}>{exercise.name}</Title>
        <Group>
          <Button variant="outline" color="gray" onClick={removeSet} size="xs">
            -
          </Button>
          <Button variant="outline" color="gray" onClick={addSet} size="xs">
            +
          </Button>
        </Group>
      </Group>
      <Stack w="100%" pr="sm" pb="sm" sx={{ flexGrow: 1, overflowY: "auto", overflowX: "hidden" }}>
        <Sets sets={exercise.sets} weightType={exercise.weightType} onChange={updateSetValue} />
      </Stack>
      <Group w="100%" p="sm" align="center" position="apart" grow mt={"auto"}>
        <Button maw="200px" variant="outline" color="red" onClick={onCancel} size="xs">
          Cancel
        </Button>
        <Button maw="200px" variant="light" color="green" onClick={onFinish} size="xs">
          Finish
        </Button>
      </Group>
    </Stack>
  );
};

export default ExerciseScreen;
