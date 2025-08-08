import { EffortSelect, FocusAreaChips } from "@/components/app";
import { capitalizeWords } from "@/functions/utils";
import { QuickLogExercise, WithId } from "@/types/app.types";
import { ActionIcon, Button, Divider, Stack, Textarea, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconCircleXFilled } from "@tabler/icons-react";
import { useRef, useState } from "react";

export type QuickLogFormProps = {
  initialValues?: Partial<WithId<QuickLogExercise>>;
  onSubmit: (log: QuickLogExercise) => Promise<void>;
};

type FormValues = Pick<QuickLogExercise, "name" | "effort" | "focusAreaIds"> & {
  date: Date;
};

export const QuickLogForm = ({ initialValues, onSubmit }: QuickLogFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<FormValues>({
    mode: "uncontrolled",
    transformValues: (values) => ({
      ...values,
      name: capitalizeWords(values.name),
    }),
    initialValues: {
      name: "Quick Workout",
      date: initialValues?.timestamp ? new Date(initialValues.timestamp) : new Date(),
      focusAreaIds: [],
      effort: "2",
      ...initialValues,
    },
  });

  const handleSubmit = async (values: FormValues) => {
    setSubmitting(true);
    const { date, ...rest } = values;
    await onSubmit({
      ...rest,
      type: "quick",
      timestamp: new Date(date).getTime(),
    });
    form.reset();
    setSubmitting(false);
  };

  const handleClearName = () => form.setFieldValue("name", "");

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          label="Name"
          {...form.getInputProps("name")}
          key={form.key("name")}
          rightSection={
            <ActionIcon variant="transparent">
              <IconCircleXFilled />
            </ActionIcon>
          }
          rightSectionProps={{ onClick: handleClearName }}
          rightSectionPointerEvents="all"
        />
        <DateInput
          ref={inputRef}
          {...form.getInputProps("date")}
          key={form.key("date")}
          placeholder="Enter date"
          label="Date"
          size="sm"
          maxDate={new Date()}
          onFocus={(event) => {
            event.preventDefault();
            inputRef.current?.blur();
          }}
        />
        <FocusAreaChips {...form.getInputProps("focusAreaIds")} key={form.key("focusAreaIds")} />
        <EffortSelect {...form.getInputProps("effort")} key={form.key("effort")} />
        <Textarea {...form.getInputProps("notes")} key={form.key("notes")} label="Notes" autosize minRows={3} />
        <Divider />
        <Button type="submit" loading={submitting}>
          Cement it in history!
        </Button>
      </Stack>
    </form>
  );
};
