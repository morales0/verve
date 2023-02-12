import { Icon } from "@iconify/react";
import {
  Button,
  Card,
  Collapse,
  Divider,
  Group,
  Paper,
  ScrollArea,
  Stack,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { useState } from "react";
import useWorkoutHistory from "../../../hooks/workoutHistory.hook";
import { STATUS } from "../../../types/util";

type Props = {
  startNewWorkoutAndNavigate: () => Promise<void>;
  isWorkingOut: boolean;
};

const HistorySection = ({ startNewWorkoutAndNavigate, isWorkingOut }: Props) => {
  const { status, data: workouts } = useWorkoutHistory();
  const [isCreating, setIsCreating] = useState(false);

  const handleStartWorkout = () => {
    setIsCreating(true);

    startNewWorkoutAndNavigate().catch((e) => {
      console.log("Error creating workout, tell user to try again");
    });
  };

  if (status === STATUS.LOADING) {
    return <Text>Loading history...</Text>;
  }

  return (
    <Stack h="100%" sx={{ overflow: "hidden" }}>
      <Group position="apart">
        <Title order={3}>Workouts</Title>
        {!isWorkingOut && (
          <Button color={"teal"} onClick={handleStartWorkout} loading={isCreating}>
            {isCreating ? "Creating workout..." : "+ New Workout"}
          </Button>
        )}
      </Group>
      <ScrollArea py="md">
        <Group mb={"1.5rem"} align={"flex-start"} grow>
          {[...workouts].reverse().map((workout, i) => {
            const dateStarted = new Date(workout.dateStarted || "");

            return (
              <Card key={workout.historyId || `workout-${i}`} style={{ minWidth: "300px" }}>
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
      </ScrollArea>
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
