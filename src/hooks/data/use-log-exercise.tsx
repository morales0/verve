import { useUser } from "@/context/user";
import { useDatabaseValue } from "../db/use-db-value.hook";
import { Exercise } from "./use-history.hook";
import { child } from "firebase/database";

export const useLogExercise = (id: string) => {
  const { dataRef } = useUser();
  const logExerciseRef = child(dataRef, `log/${id}`);

  const data = useDatabaseValue<Exercise | undefined>(logExerciseRef);

  return data;
};
