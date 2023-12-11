import { Button, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export const StartButton = () => {
  const navigate = useNavigate();

  return (
    <Button variant="gradient" gradient={{ from: "teal", to: "blue", deg: 120 }} onClick={() => navigate("/workout")}>
      <Text>Start Workout</Text>
    </Button>
  );
};
