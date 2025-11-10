import { useNavigate, useParams } from "react-router-dom";
import { LoadingOverlay, Stack, Text } from "@mantine/core";
import { WithId, type UserExercise } from "@/types/app.types";
import { SetsExercise } from "./sets-exercise";
import { CustomExercise } from "./custom-exercise";
import { useDatabaseValue } from "@/api";

export const ActiveExercise = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useDatabaseValue<WithId<UserExercise>>(`exercises/${id}`);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (!data) {
    navigate("/active-log");
    return null;
  }

  const { type } = data;

  return (
    <Stack gap="xs">
      <Text px="xs">{data.name}</Text>
      {type === "sets" && <SetsExercise exercise={data} />}
      {type === "custom" && <CustomExercise exercise={data} />}
    </Stack>
  );
};
