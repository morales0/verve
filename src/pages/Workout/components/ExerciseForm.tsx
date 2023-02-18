import { Box, Button, Divider, Group, MultiSelect, Select, Stack, TextInput, Title } from "@mantine/core";
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
  exerciseToEdit?: UserExercise;
  cancel: () => void;
  submitExercise: (data: UserExercise) => Promise<void>;
};

const ExerciseForm = ({ cancel, submitExercise, exerciseToEdit }: Props) => {
  const form = useForm({
    initialValues: {
      name: exerciseToEdit?.name || "",
      units: exerciseToEdit?.units || [],
      primaryMuscleGroups: exerciseToEdit?.primaryMuscleGroups || [],
      secondaryMuscleGroups: exerciseToEdit?.secondaryMuscleGroups || [],
      weightType: exerciseToEdit?.weightType || "",
    },
  });

  const handleSubmit = form.onSubmit((values) => {
    const newExercise: UserExercise = {
      ...values,
    };

    if (exerciseToEdit) {
      newExercise.id = exerciseToEdit.id;
    }

    submitExercise(newExercise).then(() => {
      cancel();
    });
  });

  return (
    <Stack h="100%" p="sm" sx={{ overflow: "hidden" }} spacing={0}>
      <form
        style={{
          height: "100%",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
        onSubmit={handleSubmit}
      >
        <Title order={3} pb="xs">
          Exercise Form
        </Title>
        <Divider />
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
        <Divider />
        <Group w="100%" align="center" position="apart" grow mt={"auto"} py="md">
          <Button size="sm" variant="light" color="red" onClick={cancel}>
            Cancel
          </Button>
          <Button size="sm" color={exerciseToEdit ? "cyan" : "teal"} type="submit">
            {exerciseToEdit ? "Update" : "Create"}
          </Button>
        </Group>
      </form>
    </Stack>
  );
};

export default ExerciseForm;
