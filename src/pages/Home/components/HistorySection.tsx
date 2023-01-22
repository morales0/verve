import { Icon } from "@iconify/react";
import {
  Stack,
  Title,
  Divider,
  Group,
  Card,
  Box,
  Text,
  Collapse,
  UnstyledButton,
} from "@mantine/core";
import React, { useState } from "react";
import { WorkoutHistoryType } from "../../../hooks/workoutHistory";

type Props = {
  workouts: WorkoutHistoryType;
};

const HistorySection = ({ workouts }: Props) => {
  return (
    <Stack mb={"1.5rem"}>
      {Object.entries(workouts)
        .reverse()
        .map(([day, times], i) => {
          return (
            <Stack key={day}>
              <Title order={4}>{day}</Title>

              <Group align={"flex-start"}>
                {Object.entries(times).map(([time, workout]) => (
                  <Card key={day + time} withBorder maw={"250px"}>
                    <Text c="dimmed" fz={"xs"} fs={"italic"}>
                      {workout.timeStarted} - {workout.timeEnded}
                    </Text>
                    <Divider mb={"md"} />

                    <Stack>
                      {Object.entries(workout.completedExercises).map(
                        ([name, sets]) => (
                          <ExerciseDropdownInfo name={name} sets={sets} />
                        )
                      )}
                    </Stack>
                  </Card>
                ))}
              </Group>
            </Stack>
          );
        })}
    </Stack>
  );
};

type ExerciseDropdownInfoProps = {
  name: string;
  sets: object;
};

const ExerciseDropdownInfo = ({ name, sets }: ExerciseDropdownInfoProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <UnstyledButton onClick={() => setOpen((o) => !o)}>
        <Group
          align={"center"}
          position={"apart"}
          sx={{
            "& .iconify.open": {
              transform: "rotate(45deg)",
            },
          }}
        >
          <Text>{name}</Text>
          <Icon icon="material-symbols:add" className={open ? "open" : ""} />
        </Group>
      </UnstyledButton>
      <Collapse
        in={open}
        transitionDuration={80}
        transitionTimingFunction={"linear"}
      >
        sets
      </Collapse>
    </>
  );
};

export default HistorySection;
