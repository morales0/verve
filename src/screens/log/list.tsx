import { ActionIcon, Badge, Box, Flex, Group, Paper, Stack, Text, TextInput } from "@mantine/core";
import { IconArrowRight, IconDots } from "@tabler/icons-react";

const exercises = [
  {
    id: "pushup",
    name: "Pushup",
    focusAreas: ["Chest", "Core", "Arms"],
  },
  {
    id: "pullup",
    name: "Pull-up",
    focusAreas: ["Back", "Core", "Arms"],
  },
  {
    id: "running",
    name: "Running",
    focusAreas: ["Cardio", "Legs"],
  },
  {
    id: "squat",
    name: "Squat",
    focusAreas: ["Legs", "Glutes", "Core"],
  },
  {
    id: "deadlift",
    name: "Deadlift",
    focusAreas: ["Back", "Legs", "Glutes"],
  },
  {
    id: "benchpress",
    name: "Bench Press",
    focusAreas: ["Chest", "Arms", "Shoulders"],
  },
  {
    id: "plank",
    name: "Plank",
    focusAreas: ["Core", "Shoulders"],
  },
  {
    id: "jumpingjacks",
    name: "Jumping Jacks",
    focusAreas: ["Cardio", "Legs"],
  },
  {
    id: "burpee",
    name: "Burpee",
    focusAreas: ["Full Body", "Cardio"],
  },
  {
    id: "cycling",
    name: "Cycling",
    focusAreas: ["Cardio", "Legs"],
  },
  {
    id: "lunges",
    name: "Lunges",
    focusAreas: ["Legs", "Glutes", "Core"],
  },
  {
    id: "rowing",
    name: "Rowing",
    focusAreas: ["Back", "Arms", "Cardio"],
  },
  {
    id: "yoga",
    name: "Yoga",
    focusAreas: ["Flexibility", "Core", "Mind"],
  },
];

export const List = () => {
  return (
    <Stack>
      <TextInput radius="xl" size="xs" />
      <Stack gap="sm">
        {exercises.map(({ id, name, focusAreas }) => (
          <Stack key={id} p="sm" gap="xs">
            <Flex justify="space-between">
              <Text>{name}</Text>

              <Group>
                <ActionIcon>
                  <IconDots />
                </ActionIcon>
                <ActionIcon>
                  <IconArrowRight stroke={1} />
                </ActionIcon>
              </Group>
            </Flex>
            <Group gap="xs">
              {focusAreas?.map((area, index) => (
                <Badge key={area} variant="light" color="violet" size="xs">
                  {area}
                </Badge>
              ))}
            </Group>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};
