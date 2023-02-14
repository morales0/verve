import { Button, Group, ScrollArea, Stack, Text } from "@mantine/core";
import { WorkoutExercise } from "../../../types/workout";

type Props = {
  exercises?: WorkoutExercise[];
  onCancel: () => void;
  onComplete: () => void;
};

const SummaryScreen = ({ exercises, onCancel, onComplete }: Props) => {
  return (
    <Stack justify={"space-between"} h="100%" sx={{ overflow: "hidden" }}>
      <Stack h="100%" py="lg" sx={{ overflow: "hidden" }}>
        <ScrollArea>
          {exercises?.map((ex, i) => (
            <Text key={`summary-ex-${ex.id}`}>{ex.name}</Text>
          ))}
        </ScrollArea>
      </Stack>

      <Group w="100%" p="sm" align={"center"} position="apart" grow>
        <Button size="xs" maw="200px" variant="outline" color="red" onClick={onCancel}>
          Cancel
        </Button>
        <Button size="xs" maw="200px" variant="light" color="green" onClick={onComplete}>
          Complete
        </Button>
      </Group>
    </Stack>
  );
};

export default SummaryScreen;
