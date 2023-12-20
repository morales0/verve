import { useUser } from "@/context/user";
import { Icon } from "@iconify/react";
import { Button, Group, Text } from "@mantine/core";
import { DatabaseReference, child, set } from "firebase/database";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const createWorkout = async (userRef: DatabaseReference) => {
  const now = new Date();
  const time = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return set(child(userRef, "/workout"), {
    dateStarted: now.toString(),
    timeStarted: time,
  }).then(() => {
    set(child(userRef, "/meta/isWorkingOut"), true);
  });
};

export const StartButton = () => {
  const { dataRef, meta } = useUser();
  const [starting, setStarting] = useState(false);
  const navigate = useNavigate();

  const startWorkout = () => {
    setStarting(true);

    if (meta.isWorkingOut) {
      navigate("/workout");
      setStarting(false);
      return;
    }

    createWorkout(dataRef).then(() => {
      navigate("/workout");
      setStarting(false);
    });
  };

  return (
    <Button
      loading={starting}
      variant="gradient"
      gradient={{ from: "teal", to: "blue", deg: 120 }}
      onClick={startWorkout}
    >
      <Group gap="xs">
        <Icon icon="bi:fire" />
        <Text>{meta.isWorkingOut ? "Continue Workout" : "Start Workout"}</Text>
      </Group>
    </Button>
  );
};
