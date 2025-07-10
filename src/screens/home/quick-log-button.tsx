import { QuickLogForm } from "@/components/forms";
import { useUser } from "@/context";
import { addExerciseToLog } from "@/services/log.service";
import { QuickLogExercise } from "@/types/app.types";
import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./home.module.css";

export const QuickLogButton = () => {
  const { dataRef } = useUser();

  const [opened, { open, close }] = useDisclosure(false);

  const handleComplete = async (exercise: QuickLogExercise) => {
    console.log("Adding", exercise);
    await addExerciseToLog(dataRef, {
      ...exercise,
    });
    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Quick Log" centered>
        <QuickLogForm onSubmit={handleComplete} />
      </Modal>
      <Button variant="outline" radius="xl" className={classes.quickBtn} onClick={open}>
        Quick Log
      </Button>
    </>
  );
};
