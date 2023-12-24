import { Workout } from "@/types/workout";

export const getExercisesByGroup = (data: Workout["exercises"], group: number) =>
  group === 0 ? data?.["normal"] ?? [] : data?.["circuits"]?.at(group - 1) ?? [];
