import { useFocusAreas } from "@/context";
import { useTags } from "@/context/tags";
import { capitalizeWords } from "@/functions/utils";
import { CustomUserExercise, SetsUserExercise, UserExercise } from "@/types/app.types";
import {
  ActionIcon,
  Button,
  Chip,
  Flex,
  Group,
  Paper,
  SegmentedControl,
  Select,
  Stack,
  TagsInput,
  Text,
  TextInput,
  ThemeIcon,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCircle, IconCircleCheckFilled, IconCircleDot, IconPlus, IconX } from "@tabler/icons-react";
import { useMemo, useState } from "react";

type FormValues = Omit<SetsUserExercise, "type"> & Omit<CustomUserExercise, "type"> & { type: "sets" | "custom" };

export type ExerciseFormProps = {
  initialValues?: UserExercise;
  onSubmit: (values: UserExercise) => Promise<unknown>;
};
export const NewExerciseForm = ({ initialValues, onSubmit }: ExerciseFormProps) => {
  const userFocusAreas = useFocusAreas();
  const tags = useTags();
  const areasMap = useMemo(
    () => Object.fromEntries(userFocusAreas.data.map((area) => [area.id, area.name])),
    [userFocusAreas.data]
  );

  const activeUserFocusAreas = userFocusAreas.data.filter(({ archived }) => !archived);
  const form = useForm<FormValues>({
    mode: "uncontrolled",
    transformValues: (values) => ({
      ...values,
      name: capitalizeWords(values.name),
      tagIds: values.tagIds
        ?.map((tag) => tags.data.find(({ name }) => name === tag)?.id)
        .filter((tag) => tag !== undefined),
    }),
    initialValues: {
      name: "",
      type: "sets",
      focusAreaIds: [],
      tagIds: [],
      ...initialValues,
    } as FormValues,
  });

  const [screen, setScreen] = useState(1);

  const nextStep = () => setScreen((current) => (current < 4 ? current + 1 : current));
  const prevStep = () => setScreen((current) => (current > 1 ? current - 1 : current));
  const [newMetricName, setNewMetricName] = useState("");
  const [newMetricType, setNewMetricType] = useState("number");

  const isNextDisabled = screen === 1 && form.getValues().name === "";

  const handleTagOptionSubmit = (value: string) => {
    const isNewTag = !tags.data.find(({ id }) => id.toLowerCase() === value.toLowerCase());
    if (isNewTag) {
      tags.api.addChild({
        name: value,
      });
    }
  };
  const handleAddMetric = (name: string, type: string) => {
    const values = form.getValues();
    if (values.type === "sets") {
      form.setValues({ metrics: [...(values.metrics ?? []), { name, type }] });
    }
    if (values.type === "custom") {
      form.setValues({ defaultMetrics: [...(values.defaultMetrics ?? []), { name, type }] });
    }
  };
  const handleRemoveMetric = (name: string) =>
    form.setValues({ metrics: form.getValues().metrics.filter((m) => m.name !== name) });
  const handleSubmit = async (values: FormValues) => {
    const { metrics, defaultMetrics, ...rest } = values;
    if (values.type === "sets") {
      await onSubmit({ metrics, ...rest, type: "sets" });
    } else {
      await onSubmit({ defaultMetrics, ...rest, type: "custom" });
    }

    setScreen(1);
    form.reset();
  };

  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack p="xs" mih={200}>
          {screen === 1 && (
            <>
              <TextInput label="Name" {...form.getInputProps("name")} />
              <Stack gap={0}>
                <Text size="sm" fw={500} mb={3}>
                  Type
                </Text>
                <SegmentedControl
                  color="teal"
                  data={[
                    { value: "sets", label: "Sets" },
                    { value: "custom", label: "Custom" },
                  ]}
                  {...form.getInputProps("type")}
                  disabled={!!initialValues}
                />
                <Text c="dimmed" size="xs" p={4}>
                  {form.getValues().type === "sets"
                    ? "An exercise that is split into sets."
                    : "An exercise with custom metrics, ex. Yoga."}
                </Text>
                <Stack>
                  <Text size="sm" fw={500} mb={3}>
                    {form.getValues().type === "sets" ? "Metrics" : "Default Metrics"}
                  </Text>
                  <Group wrap="nowrap" gap="xs">
                    <TextInput value={newMetricName} onChange={(e) => setNewMetricName(e.target.value)} />
                    <Select
                      value={newMetricType}
                      onChange={(val) => setNewMetricType(val ?? "number")}
                      data={[
                        { value: "weight", label: "Weight" },
                        { value: "number", label: "Number" },
                        { value: "time", label: "Time" },
                      ]}
                    />
                    <ActionIcon
                      onClick={() => handleAddMetric(newMetricName, newMetricType)}
                      disabled={
                        newMetricName === "" ||
                        (form.getValues().type === "sets"
                          ? form.getValues().metrics
                          : form.getValues().defaultMetrics
                        )?.some((m) => m.name.toLowerCase() === newMetricName.toLowerCase())
                      }
                      variant="outline"
                      color="teal"
                      size="lg"
                    >
                      {" "}
                      <IconPlus />{" "}
                    </ActionIcon>
                  </Group>{" "}
                  <Flex gap="sm">
                    {(form.getValues().type === "sets"
                      ? form.getValues().metrics
                      : form.getValues().defaultMetrics
                    )?.map((m) => (
                      <Paper key={m.name} withBorder p="xs">
                        <Flex align="center" gap="xs">
                          <Stack gap={0}>
                            <Text>{m.name}</Text>
                            <Text size="xs" color="dimmed">
                              {m.type}
                            </Text>
                          </Stack>
                          <ActionIcon onClick={() => handleRemoveMetric(m.name)}>
                            {" "}
                            <IconX />{" "}
                          </ActionIcon>
                        </Flex>
                      </Paper>
                    ))}
                  </Flex>
                </Stack>
              </Stack>
            </>
          )}
          {screen === 2 && (
            <>
              <Text size="sm" fw={500} mb={3}>
                Select Default Focus Areas
              </Text>
              <Group wrap="wrap" gap="xs" justify="start">
                <Chip.Group multiple {...form.getInputProps("focusAreaIds")}>
                  {activeUserFocusAreas.map(({ id, name }) => (
                    <Chip key={id} value={id}>
                      {name}
                    </Chip>
                  ))}
                </Chip.Group>
              </Group>
            </>
          )}
          {screen === 3 && (
            <>
              <TagsInput
                label="Tags"
                data={tags.data.map(({ id, name }) => ({ value: id, label: name }))}
                onOptionSubmit={handleTagOptionSubmit}
                acceptValueOnBlur={false}
                {...form.getInputProps("tagIds")}
              />
            </>
          )}
          {screen === 4 && (
            <>
              <Text>Name: {form.getTransformedValues().name}</Text>
              <Text>Type: {form.getTransformedValues().type === "sets" ? "Sets" : "Custom"}</Text>
              <Text>
                Default Focus Areas:{" "}
                {form
                  .getTransformedValues()
                  .focusAreaIds?.map((a) => areasMap[a])
                  .filter((a) => a !== undefined)
                  .join(", ")}
              </Text>
              <Text>Tags: {form.getValues().tagIds?.join(", ")}</Text>
            </>
          )}
        </Stack>

        <Stack align="center" gap="xs" mt="sm">
          <Group gap="xs">
            <ThemeIcon variant="transparent" size="xs">
              {screen > 1 ? <IconCircleCheckFilled /> : screen === 1 ? <IconCircleDot /> : <IconCircle />}
            </ThemeIcon>
            <ThemeIcon variant="transparent" size="xs">
              {screen > 2 ? <IconCircleCheckFilled /> : screen === 2 ? <IconCircleDot /> : <IconCircle />}
            </ThemeIcon>
            <ThemeIcon variant="transparent" size="xs">
              {screen > 3 ? <IconCircleCheckFilled /> : screen === 3 ? <IconCircleDot /> : <IconCircle />}
            </ThemeIcon>
          </Group>
          <Group justify="center">
            <Button
              variant="default"
              onClick={(e) => {
                e.preventDefault();
                prevStep();
              }}
            >
              Back
            </Button>

            {screen < 4 ? (
              <Button
                disabled={isNextDisabled}
                onClick={(e) => {
                  e.preventDefault();
                  nextStep();
                }}
                type="button"
              >
                Next
              </Button>
            ) : (
              <Button type="submit">Save</Button>
            )}
          </Group>
        </Stack>
      </form>
    </>
  );
};
