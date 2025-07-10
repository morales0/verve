import { useUser } from "@/context";
import { getUserExercises } from "@/services/exercises.service";
import { UserExercise, WithId } from "@/types/app.types";
import { useState, useMemo, useEffect } from "react";

export const useExerciseNameMap = () => {
  const { dataRef } = useUser();
  const [loading, setLoading] = useState(true);
  const [userExercises, setUserExercises] = useState<WithId<UserExercise>[]>([]);
  const userExercisesNameMap = useMemo(
    () => Object.fromEntries(userExercises.map(({ name, id }) => [id, name])),
    [userExercises]
  );
  useEffect(() => {
    if (!dataRef) return;
    const off = getUserExercises(dataRef, setUserExercises, setLoading);

    return () => off();
  }, [dataRef]);

  return [userExercisesNameMap, loading];
};
