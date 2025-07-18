import { useNavigate, useParams } from "react-router-dom";
import { LoadingOverlay, Stack, Text } from "@mantine/core";
import { useDatabaseValue } from "@/hooks/db";
import { WithId, type UserExercise } from "@/types/app.types";
import { SetsExercise } from "./sets-exercise";
import { CustomExercise } from "./custom-exercise";

export const ActiveExercise = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: userExercise, loading: isUserExerciseLoading } = useDatabaseValue<WithId<UserExercise>>(
    `exercises/${id}`
  );

  if (isUserExerciseLoading) {
    return <LoadingOverlay />;
  }

  if (!userExercise) {
    navigate("/active-log");
    return null;
  }
  const { type } = userExercise;
  return (
    <Stack gap="xs">
      <Text px="xs">{userExercise.name}</Text>
      {type === "sets" && <SetsExercise exercise={userExercise} />}
      {type === "custom" && <CustomExercise exercise={userExercise} />}
    </Stack>
  );
};
