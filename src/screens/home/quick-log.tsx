import { EffortSelect, FocusAreaChips } from "@/components/app";
import { useUser } from "@/context";
import { addExerciseToLog } from "@/services/log.service";
import { Button, Divider, Modal, Stack, TextInput } from "@mantine/core";
import { useDisclosure, useListState } from "@mantine/hooks";
import { useState } from "react";
import classes from "./home.module.css";

export const QuickLog = () => {
  const { dataRef } = useUser();
  const [submitting, setSubmitting] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [name, setName] = useState("Quick Workout");
  const [areas, handlers] = useListState<string>([]);
  const [effort, setEffort] = useState("2");

  const handleComplete = (name: string, areas: string[] | undefined, effort: string) => {
    setSubmitting(true);

    const timestamp = new Date().getTime();
    addExerciseToLog(dataRef, {
      type: "quick",
      name,
      focusAreaIds: areas,
      effort,
      status: "complete",
      timestamp,
    }).then(() => {
      close();
      setSubmitting(false);
      setName("Quick Workout");
      handlers.setState([]);
      setEffort("2");
    });
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Quick Log" centered>
        <Stack>
          <TextInput label="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <FocusAreaChips value={areas} onChange={handlers.setState} />
          <EffortSelect value={effort} onChange={setEffort} />
          <Divider />
          <Button loading={submitting} onClick={() => handleComplete(name, areas, effort)}>
            Cement it in history!
          </Button>
        </Stack>
      </Modal>
      <Button variant="outline" radius="xl" className={classes.quickBtn} onClick={open}>
        Quick Log
      </Button>
    </>
  );
};
