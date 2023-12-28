import { STATUS } from "@/types/util";
import { UserExercise, WorkoutExercise } from "@/types/workout";
import { Icon } from "@iconify/react";
import { ActionIcon, Center, Checkbox, Flex, Loader, Menu, Paper, Stack, Text } from "@mantine/core";
import { IconHelp } from "@tabler/icons-react";
import { ExerciseSelection } from "../functions";
import { useNavigate } from "react-router-dom";

export type ExercisesProps = {
  exercises: UserExercise[];
  status: STATUS;
  total: number;
  selections: ExerciseSelection[][];
  currCircuit: number;
  onSelect: (id: string) => void;
  onDeselect: (id: string) => void;
  onChangeAll: (checked: boolean) => void;
  onDeleteExercise: (id: string) => void;
};

export const Exercises = ({
  exercises,
  status,
  total,
  selections,
  currCircuit,
  onSelect,
  onDeselect,
  onChangeAll,
  onDeleteExercise,
}: ExercisesProps) => {
  // const workout = useWorkout();
  const navigate = useNavigate();

  const editExercise = (exercise: UserExercise) => {
    navigate(`/exercise-form`, { state: { prevPath: "/workout", exercise } });
  };

  if (status !== "success") {
    return <Center pt="md">{status === "loading" ? <Loader /> : <Text>An error occurred. Try again.</Text>}</Center>;
  }

  return (
    <Stack gap="xs">
      <Flex justify="space-between">
        <Flex align="center" gap="xs">
          <Checkbox
            color={currCircuit === 0 ? "teal" : "blue"}
            indeterminate={
              currCircuit < selections.length &&
              selections[currCircuit].length > 0 &&
              selections[currCircuit].length < exercises.length
            }
            checked={
              currCircuit < selections.length &&
              exercises.length === selections[currCircuit].length &&
              exercises.length > 0
            }
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

      {exercises?.map(({ id, name, type, primaryMuscleGroups, secondaryMuscleGroups, units }) => (
        <Checkbox
          key={id || name}
          checked={currCircuit < selections.length && selections[currCircuit]?.map((e) => e.id).includes(id!)}
          onChange={(event) => (event.currentTarget.checked ? onSelect(id!) : onDeselect(id!))}
          color={currCircuit === 0 ? "teal" : "blue"}
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
                  {type && (
                    <Text fw={500} c="dimmed" fz="xs" span>
                      {" "}
                      {type}
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
                    <Menu.Item
                      color="indigo"
                      leftSection={<Icon icon="material-symbols:edit" />}
                      onClick={() =>
                        editExercise({
                          id: id!,
                          name,
                          type,
                          units,
                          primaryMuscleGroups,
                          secondaryMuscleGroups,
                        })
                      }
                    >
                      Edit
                    </Menu.Item>
                    <Menu.Item
                      color="red"
                      leftSection={<Icon icon="ic:baseline-delete-forever" />}
                      onClick={() => onDeleteExercise(id!)}
                    >
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
