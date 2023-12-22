import { WorkoutExercise } from "@/types/workout";
import { Text } from "@mantine/core";
import classes from "./exercise-title.module.css";

export const ExerciseTitle = ({ name }: { name: WorkoutExercise["name"] }) => {
  return (
    <Text className={classes.title} fz="md" fw={500}>
      {name}
    </Text>
  );
};
