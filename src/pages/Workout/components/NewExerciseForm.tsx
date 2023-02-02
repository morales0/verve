import {
  Button,
  Group,
  MultiSelect,
  ScrollArea,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { UserExercise } from "../../../types/workout";

type Props = {
  cancel: () => void;
  createExercise: (data: UserExercise) => Promise<void>;
};

const unitOptions = [
  { value: "reps", label: "Reps" },
  { value: "weight", label: "Weight" },
  { value: "seconds", label: "Seconds" },
  { value: "minutes", label: "Minutes" },
];

const NewExerciseForm = ({ cancel, createExercise }: Props) => {
  const form = useForm({
    initialValues: {
      name: "",
      units: [],
      type: "",
    },
  });

  const handleSubmit = form.onSubmit((values) => {
    const newExercise: UserExercise = {
      name: values.name,
      units: values.units.reduce<Record<string, string>>(
        (obj, m, i) => ((obj[i] = m), obj),
        {}
      ),
      type: values.type,
    };
    console.log("Creating");
    createExercise(newExercise).then(() => {
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
        <Title order={3}>Creating a new exercise</Title>
        <ScrollArea sx={{ flexGrow: 1 }}>
          <Group grow>
            <TextInput label="Name" required {...form.getInputProps("name")} />
            <TextInput
              label="Type of exercise"
              {...form.getInputProps("type")}
            />
          </Group>
          <MultiSelect
            data={unitOptions}
            label="Units"
            placeholder="Select as many as you need"
            required
            {...form.getInputProps("units")}
          />
        </ScrollArea>
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

export default NewExerciseForm;
