import { Icon } from "@iconify/react";
import { Card, Collapse, Divider, Group, Paper, Stack, Text, Title, UnstyledButton } from "@mantine/core";
import { useState } from "react";
import useWorkoutHistory from "../../../hooks/workoutHistory.hook";
import { STATUS } from "../../../types/util";

const HistorySection = () => {
  const { status, data: workouts } = useWorkoutHistory();

  if (status === STATUS.LOADING) {
    return <Text>Loading history...</Text>;
  }

  return (
    <Stack>
      <Title order={3}>Latest Workouts</Title>
      <Group mb={"1.5rem"} align={"flex-start"}>
        {[...workouts].reverse().map((workout, i) => {
          const dateStarted = new Date(workout.dateStarted || "");

          return (
            <Card key={workout.historyId || `workout-${i}`}>
              <Text fz={"s"}>{dateStarted.toDateString()}</Text>
              <Text c="dimmed" fz={"xs"} fs={"italic"}>
                {workout.timeStarted} - {workout.timeEnded}
              </Text>
              <Divider mb={"md"} />
              <Stack>
                {workout.exercises?.map((exercise, i) => (
                  <ExerciseDropdownInfo
                    key={`exercise-${exercise.name}-${i}`}
                    name={exercise.name}
                    sets={exercise.sets}
                    units={exercise.units}
                  />
                ))}
              </Stack>
            </Card>
          );
        })}
        {/*Object.entries(workouts)
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
                        {Object.entries(workout.completedExercises).map(([name, sets], i) => (
                          <ExerciseDropdownInfo key={`exercise-${name}-${i}`} name={name} sets={sets} />
                        ))}
                      </Stack>
                    </Card>
                  ))}
                </Group>
              </Stack>
            );
          })*/}
      </Group>
    </Stack>
  );
};

type ExerciseDropdownInfoProps = {
  name: string;
  sets: Record<string, number>[];
  units: string[];
};

const ExerciseDropdownInfo = ({ name, sets, units }: ExerciseDropdownInfoProps) => {
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
      <Collapse in={open} transitionDuration={80} transitionTimingFunction={"linear"}>
        <Group>
          <Stack>
            {units.map((unit) => (
              <Text key={`${name}-${unit}`} fw="bold" fz="sm">
                {unit}
              </Text>
            ))}
          </Stack>
          {sets.map((set, i) => {
            return (
              <Stack key={`${name}-set-${i}`}>
                {units.map((unit) => (
                  <Text key={`${name}-${unit}-set-${i}-val`}>{set[unit]}</Text>
                ))}
              </Stack>
            );
          })}
        </Group>
      </Collapse>
    </>
  );
};

export default HistorySection;
