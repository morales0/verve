import useWorkout from "@/hooks/workout.hook";
import { Button, Divider, Flex, Group, Menu, SegmentedControl, Stack } from "@mantine/core";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ExerciseSwitch } from "./exercise-switch";
import classes from "./exercises.module.css";
import { ExerciseTitle } from "./exercise-title";

export const Exercises = () => {
  const params = useParams();
  const navigate = useNavigate();
  const workout = useWorkout();

  const group = Number(params["group"]);
  const index = params["index"];
  const exercises =
    group === 0 ? workout?.data.exercises?.["normal"] : workout?.data.exercises?.["circuits"]?.at(group - 1);
  const currExercise = exercises?.at(Number(index));

  if (!currExercise) return null;

  return (
    <Stack className={classes.exercises} px="xs" gap={0} h="100%">
      <Flex justify="space-between" align="center" py={6}>
        {group === 0 ? (
          <ExerciseTitle name={currExercise?.name} />
        ) : (
          <Menu position="bottom-start">
            <Menu.Target>
              <ExerciseSwitch exercise={currExercise?.name} group={group} />
            </Menu.Target>
            <Menu.Dropdown>
              {exercises
                ?.map(({ id, name }, i) => ({ id, name, index: i }))
                ?.filter(({ id }) => id !== currExercise.id)
                .map(({ id, name, index }) => (
                  <Menu.Item key={id} component={Link} to={`/workout/exercise/${group}/${index}`} replace>
                    {name}
                  </Menu.Item>
                ))}
            </Menu.Dropdown>
          </Menu>
        )}

        <SegmentedControl
          className={classes.pageSwitch}
          size="xs"
          data={[
            { label: "Sets", value: "sets" },
            { label: "History", value: "history" },
          ]}
        />
      </Flex>

      <Divider />

      <Divider mt="auto" />
      <Group w="100%" pt="sm" pb="md" px="xs" align="center" justify="space-between" grow>
        <Button size="sm" color="teal" onClick={() => navigate("/workout/summary")}>
          Go to Summary
        </Button>
      </Group>
    </Stack>
  );
};
