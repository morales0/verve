import useWorkout from "@/hooks/workout.hook";
import appClasses from "@/styles/app.module.css";
import { Icon } from "@iconify/react";
import { Box, Button, Center, Divider, Group, Loader, Stack, Text } from "@mantine/core";
import cx from "clsx";
import { useNavigate } from "react-router-dom";
import { ExerciseCard } from "./exercise-card";
import classes from "./summary.module.css";

export const Summary = () => {
  const navigate = useNavigate();
  const { data, api, status } = useWorkout();

  // const groups = Array.from(getMuscleGroupSet(exercises ?? []));

  return (
    <Stack className={cx(appClasses.heightLocked)} justify="space-between" h="100%" gap={0}>
      <Box p="xs">
        <Button
          w="100%"
          size="compact-md"
          radius={"xs"}
          variant="light"
          color="cyan"
          onClick={() => navigate("/workout")}
        >
          <Group gap="sm" align="center">
            <Icon icon="fluent:add-28-filled" />
            Edit Exercises
          </Group>
        </Button>
      </Box>

      <Stack className={cx(appClasses.scrollable)} gap="sm" px="xs" py="sm">
        {status !== "success" && (
          <Center>
            <Loader />
          </Center>
        )}
        {data.exercises?.normal?.map((ex, i) => <ExerciseCard key={`normal-${ex.id}`} {...ex} group={0} index={i} />)}
        {data.exercises?.circuits?.map((exs, i) => (
          <Stack gap={0} key={i}>
            <Text c="dimmed" fz="sm" fw={500} fs="italic" mb={4}>
              Circuit {i + 1}
            </Text>
            {exs.map((ex, j) => (
              <ExerciseCard
                key={`circuits-${ex.id}`}
                className={classes.circuitPaper}
                {...ex}
                group={i + 1}
                index={j}
              />
            ))}
          </Stack>
        ))}
      </Stack>

      <Divider mt="auto" />
      <Group w="100%" pt="sm" pb="md" px="xs" align="center" justify="space-between" grow>
        <Button size="sm" variant="light" color="red">
          Cancel Workout
        </Button>
        <Button size="sm" variant="gradient" gradient={{ from: "teal", to: "blue", deg: 40 }}>
          <Text fw={500}>Complete</Text>
        </Button>
      </Group>
    </Stack>
  );
};
