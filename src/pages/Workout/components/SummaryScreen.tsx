import { Button, Group, ScrollArea, Stack, Text } from "@mantine/core";
import { WorkoutExercise } from "../../../types/workout";

type Props = {
  exercises?: WorkoutExercise[];
};

const SummaryScreen = ({ exercises }: Props) => {
  return (
    <Stack justify={"space-between"} h="100%" sx={{ overflow: "hidden" }}>
      <Stack h="100%" py="lg" sx={{ overflow: "hidden" }}>
        <ScrollArea>
          {exercises?.map((ex, i) => (
            <Text key={`summary-ex-${ex.id}`}>{ex.name}</Text>
          ))}
        </ScrollArea>
      </Stack>

      <Group w="100%" align={"center"} position="center" grow>
        <Button variant="outline" color="red">
          Cancel
        </Button>
        <Button variant="light" color="green">
          Complete
        </Button>
      </Group>
    </Stack>
  );
};

export default SummaryScreen;
