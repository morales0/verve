import { Button, Divider, Group, ScrollArea, Stack, Text } from "@mantine/core";
import { WorkoutExercise } from "../../../types/workout";

type Props = {
  exercises?: WorkoutExercise[];
  onCancel: () => void;
  onComplete: () => void;
};

const SummaryScreen = ({ exercises, onCancel, onComplete }: Props) => {
  return (
    <Stack justify="space-between" h="100%" sx={{ overflow: "hidden" }} spacing={0}>
      <Stack h="100%" py="lg" sx={{ overflow: "hidden" }}>
        <ScrollArea>
          {exercises?.map((ex, i) => (
            <Text key={`summary-ex-${ex.id}`}>{ex.name}</Text>
          ))}
        </ScrollArea>
      </Stack>

      <Divider />

      <Group w="100%" py="md" mt="auto" align="center" position="apart" grow>
        <Button size="sm" variant="light" color="red" onClick={onCancel}>
          Cancel
        </Button>
        <Button size="sm" color="teal" onClick={onComplete}>
          Complete
        </Button>
      </Group>
    </Stack>
  );
};

export default SummaryScreen;
