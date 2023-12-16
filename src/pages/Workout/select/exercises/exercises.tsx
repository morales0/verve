import useUserExercises from "@/hooks/userExercises.hook";
import useWorkout from "@/hooks/workout.hook";
import { UserExercise, WorkoutExercise } from "@/types/workout";
import { Icon } from "@iconify/react";
import { ActionIcon, Checkbox, Flex, Menu, Paper, Stack, Text } from "@mantine/core";
import { IconHelp } from "@tabler/icons-react";

export type ExercisesProps = {
  exercises: UserExercise[];
  total: number;
  selections: string[][];
  currGroup: number;
  onChange: (id: string, checked: boolean) => void;
  onChangeAll: (checked: boolean) => void;
};

export const Exercises = ({ exercises, total, selections, currGroup, onChange, onChangeAll }: ExercisesProps) => {
  const workout = useWorkout();

  const handleChangeExercise = (id: string, checked: boolean) => {
    const ex = exercises.find((ex) => ex.id === id);
    if (!ex) return;

    if (checked) {
      const newWEx: WorkoutExercise = {
        ...ex,
        sets: [],
        circuit: currGroup,
      };
      workout.api.addExercise(newWEx);
    } else {
      const wEx = workout.data?.exercises?.find((wEx) => wEx.id === id);

      if (!wEx) return;

      workout.api.removeExercise(wEx.workoutId!);
    }

    console.log("changing", id);
  };

  return (
    <Stack gap="xs">
      <Flex justify="space-between">
        <Flex align="center" gap="xs">
          <Checkbox
            color={currGroup === 0 ? "teal" : "blue"}
            indeterminate={selections[currGroup].length > 0 && selections[currGroup].length < exercises.length}
            checked={exercises.length === selections[currGroup].length && exercises.length > 0}
            disabled={exercises.length === 0}
            onChange={(event) => onChangeAll(event.currentTarget.checked)}
          />
          <Text c="dimmed" fz="sm">
            Showing {exercises.length} of {total} exercises
          </Text>
        </Flex>
        <ActionIcon variant="subtle">
          <IconHelp />
        </ActionIcon>
      </Flex>

      {exercises?.map(({ id, name, weightType, primaryMuscleGroups, secondaryMuscleGroups }) => (
        <Checkbox
          key={id || name}
          checked={selections[currGroup]?.includes(id!)}
          onChange={(event) => handleChangeExercise(id!, event.currentTarget.checked)}
          color={currGroup === 0 ? "teal" : "blue"}
          styles={{
            body: { width: "100%", alignItems: "center", gap: 0 },
            labelWrapper: { flexGrow: 1 },
            label: { cursor: "pointer" },
            input: { cursor: "pointer" },
          }}
          label={
            <Paper withBorder px="xs" py={6} radius="sm">
              <Flex justify="space-between">
                <Flex align="baseline" gap="xs">
                  <Text fw={500} fz="md">
                    {name}
                  </Text>
                  {weightType && (
                    <Text fs="italic" fw={500} c="dimmed" fz="xs" span>
                      {" "}
                      {weightType}
                    </Text>
                  )}
                </Flex>

                <Menu shadow="md" position="left">
                  <Menu.Target>
                    <ActionIcon variant="transparent" color="violet.4">
                      <Icon icon="fluent:options-20-regular" width={24} />
                    </ActionIcon>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Item color="indigo" leftSection={<Icon icon="material-symbols:edit" />}>
                      Edit
                    </Menu.Item>
                    <Menu.Item color="red" leftSection={<Icon icon="ic:baseline-delete-forever" />}>
                      Delete
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Flex>

              <Flex justify="space-between">
                <Flex>
                  {primaryMuscleGroups && (
                    <Text fz="xs" fw={400}>
                      {Object.values(primaryMuscleGroups).join(", ")}
                    </Text>
                  )}
                  {secondaryMuscleGroups && (
                    <Text fz="xs" c="dimmed" fw={400}>
                      {", "}
                      {Object.values(secondaryMuscleGroups).join(", ")}
                    </Text>
                  )}
                </Flex>

                <Text fz="xs" c="cyan.7">
                  3 days ago
                </Text>
              </Flex>
            </Paper>
          }
        />
      ))}
    </Stack>
  );
};
