import { Box, Button, Group, MultiSelect, Select, Stack, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { UserExercise } from "../../../types/workout";

const weightTypes = [
  {
    label: "Barbell",
    value: "Barbell",
  },
  {
    label: "Dumbbell",
    value: "Dumbbell",
  },
];

const unitOptions = [
  { value: "Reps", label: "Reps" },
  { value: "Weight", label: "Weight" },
  { value: "Seconds", label: "Seconds" },
  { value: "Minutes", label: "Minutes" },
];

const muscleGroups = [
  { value: "Shoulders", label: "Shoulders" },
  { value: "Chest", label: "Chest" },
  { value: "Back", label: "Back" },
  { value: "Biceps", label: "Biceps" },
  { value: "Triceps", label: "Triceps" },
  { value: "Abdominals", label: "Abdominals" },
  { value: "Legs", label: "Legs" },
  { value: "Lats", label: "Lats" },
];

type Props = {
  cancel: () => void;
  submitExercise: (data: UserExercise) => Promise<void>;
};

const ExerciseForm = ({ cancel, submitExercise }: Props) => {
  const form = useForm({
    initialValues: {
      name: "",
      units: [],
      primaryMuscleGroups: [],
    },
  });

  const handleSubmit = form.onSubmit((values) => {
    const newExercise: UserExercise = {
      ...values,
    };
    submitExercise(newExercise).then(() => {
      cancel();
    });
  });

  return (
    <Stack h="100%" py="lg" sx={{ overflow: "hidden" }}>
      <form
        style={{
          height: "100%",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
        onSubmit={handleSubmit}
      >
        <Title order={3}>Exercise Form</Title>
        <Box py="sm" sx={{ flexGrow: 1, overflow: "auto" }}>
          <Stack spacing="md">
            <TextInput label="Name" required {...form.getInputProps("name")} />
            <MultiSelect
              data={unitOptions}
              label="Units"
              placeholder="Select as many as you need"
              required
              {...form.getInputProps("units")}
            />
            {form.getInputProps("units").value.includes("Weight") && (
              <Select
                label="Choose type of weight"
                placeholder="Choose one"
                data={weightTypes}
                {...form.getInputProps("weightType")}
              />
            )}
            <Group grow>
              <MultiSelect
                data={muscleGroups}
                label="Primary Muscle Groups"
                placeholder="Select as many as you need"
                dropdownPosition="bottom"
                searchable
                nothingFound="Nothing found"
                required
                {...form.getInputProps("primaryMuscleGroups")}
              />
              <MultiSelect
                data={muscleGroups}
                label="Secondary Muscle Groups"
                placeholder="Select as many as you need"
                dropdownPosition="bottom"
                searchable
                nothingFound="Nothing found"
                {...form.getInputProps("secondaryMuscleGroups")}
              />
            </Group>
          </Stack>
        </Box>
        <Group w="100%" align={"center"} position="center" grow mt={"auto"}>
          <Button variant="outline" color="red" onClick={cancel}>
            Cancel
          </Button>
          <Button variant="light" color="green" type="submit">
            Create
          </Button>
        </Group>
      </form>
    </Stack>
  );
};

export default ExerciseForm;
