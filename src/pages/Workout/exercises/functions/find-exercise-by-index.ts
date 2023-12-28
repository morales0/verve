import { Workout } from "@/types/workout";

export const findExerciseByIndices = (data: Workout["exercises"], group: number, index: number) => {
  const exercises = group === 0 ? data?.["normal"] : data?.["circuits"]?.at(group - 1);
  return exercises?.at(index);
};
