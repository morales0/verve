import { Icon } from "@iconify/react";
import { ActionIcon, Button, Card, Divider, Group, ScrollArea, Stack, Text } from "@mantine/core";

export type SummaryProps = {
  onAddExercise: () => void;
};
export const Summary = ({ onAddExercise }: SummaryProps) => {
  return (
    <Stack justify="space-between" h="100%" sx={{ overflow: "hidden" }} spacing={0}>
      <Stack py="sm" px="xs" sx={{ overflow: "hidden" }}>
        <Button size="lg" variant="light" color="cyan" onClick={onAddExercise}>
          <Group spacing="sm" align="center">
            <Icon icon="fluent:add-28-filled" />
            Add Exercises
          </Group>
        </Button>
        <Text sx={{ placeSelf: "center" }}>All this empty space, lets get our verve on</Text>
      </Stack>

      <Divider />

      <Group w="100%" py="md" px="xs" mt="auto" align="center" position="apart" grow>
        <Button size="sm" variant="light" color="red">
          Cancel
        </Button>
        <Button size="sm" color="teal">
          Complete
        </Button>
      </Group>
    </Stack>
  );
};
