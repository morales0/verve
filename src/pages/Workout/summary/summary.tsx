import useWorkout from "@/hooks/workout.hook";
import appClasses from "@/styles/app.module.css";
import { Icon } from "@iconify/react";
import { ActionIcon, Box, Button, Center, Divider, Flex, Group, Loader, Stack, Text, Title, rem } from "@mantine/core";
import cx from "clsx";
import { useNavigate } from "react-router-dom";
import { ExerciseCard } from "./exercise-card";
import classes from "./summary.module.css";
import workoutApi from "@/api/workout-api";
import { IconHelp } from "@tabler/icons-react";

export const Summary = () => {
  const navigate = useNavigate();
  const { data, api, status } = useWorkout();

  // Ready to complete if there is at least one exercise in normal or circuits and those exercises have at least one set
  const exercises = [...(data?.exercises?.normal ?? []), ...(data?.exercises?.circuits ?? []).flat()];
  const readyToComplete = exercises.length > 0 && exercises.every((ex) => !!ex.sets);

  // const groups = Array.from(getMuscleGroupSet(exercises ?? []));

  const cancelWorkout = () => api.cancelWorkout().then(() => navigate("/"));
  const completeWorkout = () => api.completeWorkout().then(() => navigate("/"));

  return (
    <Stack className={cx(appClasses.heightLocked)} justify="space-between" gap={0}>
      <Box px="xs">
        <Flex align="center">
          <Title order={5}>My Workout</Title>
          <ActionIcon variant="subtle" ml="auto">
            <IconHelp />
          </ActionIcon>
        </Flex>
        <Divider />
      </Box>
      <Stack className={cx(appClasses.scrollable)} gap="sm" px="xs" py="sm">
        {status !== "success" && (
          <Center>
            <Loader />
          </Center>
        )}
        {data?.exercises?.normal?.map((ex, i) => <ExerciseCard key={`normal-${ex.id}`} {...ex} group={0} index={i} />)}
        {data?.exercises?.circuits?.map((exs, i) => (
          <Box key={i}>
            <Divider label={`Circuit ${i + 1}`} labelPosition="left" mb="xs" />
            {exs.map((ex, j) => (
              <ExerciseCard
                key={`circuits-${ex.id}`}
                className={classes.circuitPaper}
                {...ex}
                group={i + 1}
                index={j}
              />
            ))}
          </Box>
        ))}
      </Stack>

      <Box px="xs" mt="auto">
        <Divider />
        <Button
          w="100%"
          size="compact-md"
          radius={"xs"}
          my={rem(6)}
          variant="subtle"
          color="cyan"
          onClick={() => navigate("/workout")}
        >
          <Group gap="sm" align="center">
            <Icon icon="solar:arrow-left-broken" />
            Add/Edit Exercises
          </Group>
        </Button>
      </Box>

      <Divider />
      <Group
        w="100%"
        pt="sm"
        pb="lg"
        px="xs"
        align="center"
        justify="space-between"
        grow
        bg="var(--mantine-color-body)"
      >
        <Button size="xs" variant="light" color="red" onClick={cancelWorkout}>
          Cancel Workout
        </Button>
        <Button
          disabled={!readyToComplete}
          size="xs"
          variant="gradient"
          gradient={{ from: "teal", to: "blue", deg: 40 }}
          onClick={completeWorkout}
        >
          <Text fw={500}>Complete</Text>
        </Button>
      </Group>
    </Stack>
  );
};
