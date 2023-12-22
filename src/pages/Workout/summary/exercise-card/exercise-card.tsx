import { WorkoutExercise } from "@/types/workout";
import { Icon } from "@iconify/react";
import { Paper, Stack, Flex, ActionIcon, Divider, Badge, PaperProps, Text, Center } from "@mantine/core";
import { Link } from "react-router-dom";
import classes from "./exercise-card.module.css";

export type ExerciseCardProps = PaperProps & WorkoutExercise & { group: number; index: number };

export const ExerciseCard = ({
  name,
  units,
  sets,
  primaryMuscleGroups,
  secondaryMuscleGroups,
  group,
  index,
  ...other
}: ExerciseCardProps) => {
  const numSets = sets?.length ?? 0;

  return (
    <Paper withBorder py="xs" px="sm" {...other}>
      <Stack gap={6}>
        <Flex component={Link} to={`/workout/exercise/${group}/${index}`} justify="space-between" align="center">
          <Text fw="bold" td="underline">
            {name}
          </Text>
          {/* <Flex wrap="nowrap" gap="xs" align="center">
            <ActionIcon color="indigo" variant="light" onClick={() => console.log("edit")}>
              <Icon icon="material-symbols:edit" />
            </ActionIcon>

            <ActionIcon color="red" variant="light" onClick={() => console.log("delete")}>
              <Icon icon="ic:baseline-delete-forever" />
            </ActionIcon>
          </Flex> */}
          <ActionIcon color="indigo" variant="subtle" onClick={() => console.log("delete")}>
            <Icon icon="gg:arrow-right" />
          </ActionIcon>
        </Flex>
        <Divider />

        {numSets > 0 ? (
          <>
            <Divider />
            <Flex styles={{ root: { overflowX: "auto" } }} gap="md">
              <Stack>
                {units.map((unit) => (
                  <Text key={`${name}-${unit}`} fw="bold" fz="sm">
                    {unit}
                  </Text>
                ))}
              </Stack>
              {sets?.map(({ values }, i) => {
                return (
                  <Stack key={`${name}-set-${i}`}>
                    {units.map((unit) => (
                      <Text key={`${name}-${unit}-set-${i}-val`}>{values[unit]}</Text>
                    ))}
                  </Stack>
                );
              })}
            </Flex>
          </>
        ) : (
          <Center>
            <Text c="dimmed" fz="xs">
              No sets... yet.
            </Text>
          </Center>
        )}
        <Flex gap="sm" className={classes.groupBox}>
          {primaryMuscleGroups?.concat(secondaryMuscleGroups ?? []).map((g) => (
            <Badge key={g} variant={"light"} color={"indigo"} size="sm" styles={{ root: { flexShrink: 0 } }}>
              {g}
            </Badge>
          ))}
        </Flex>
      </Stack>
    </Paper>
  );
};
