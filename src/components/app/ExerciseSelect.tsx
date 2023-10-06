import { Select, SelectProps, createStyles } from "@mantine/core";
import useUserExercises from "../../hooks/userExercises.hook";

const useStyles = createStyles((theme) => ({
  input: {
    fontSize: theme.fontSizes.xl,
    fontWeight: 500,
  },
}));

export type ExerciseSelectProps = Omit<SelectProps, "data">;

export const ExerciseSelect = ({ ...rest }: ExerciseSelectProps) => {
  const { classes } = useStyles();
  const { data, api, status } = useUserExercises();

  const selectData = data
    .map(({ name, id }, i) => ({ value: id ?? `${name}-${i}`, label: name }))
    .sort((a, b) => a.label.localeCompare(b.label));

  return (
    <Select
      variant="unstyled"
      classNames={{ input: classes.input }}
      placeholder="Choose an exercise"
      data={selectData}
      {...rest}
    />
  );
};
