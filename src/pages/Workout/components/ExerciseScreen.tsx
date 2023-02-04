import { Button, Group, ScrollArea, Stack, Text, Title } from "@mantine/core";
import { WorkoutExercise } from "../../../types/workout";

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
      sets: exercise.sets.map((set, i) => (i === index ? { ...set, [unit]: value } : {})),
    });
  };

  return (
    <Stack h="100%" pt="lg" sx={{ overflow: "hidden" }}>
      <Title order={3}>{exercise.name}</Title>
      <ScrollArea sx={{ flexGrow: 1 }}>
        {exercise.sets.map((set, i) => {
          return (
            <Group key={`set-${i}`}>
              {Object.entries(set).map(([unit, val], j) => (
                <Text key={`set-${unit}-${j}`}>
                  {unit}: {val}
                </Text>
              ))}
            </Group>
          );
        })}
        <Group>
          <Button variant="outline" color="gray" onClick={removeSet}>
            -
          </Button>
          <Button variant="outline" color="gray" onClick={addSet}>
            +
          </Button>
        </Group>
      </ScrollArea>
      <Group w="100%" align={"center"} position="center" grow mt={"auto"}>
        <Button variant="outline" color="red" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="light" color="green" onClick={onFinish}>
          Finish
        </Button>
      </Group>
    </Stack>
  );
};

export default ExerciseScreen;
