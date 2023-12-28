import { UserExercise } from "@/types/workout";

export const filterExercisesByName = (data: UserExercise[], query: string) =>
  data.filter((ex) => query === "" || ex.name.toLowerCase().includes(query.toLowerCase()));
