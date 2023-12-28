import { WorkoutExercise } from "@/types/workout";

export const getMuscleGroupSet = (exercises: WorkoutExercise[]) => {
  const set = new Set<string>();

  exercises.forEach((e) => {
    e.primaryMuscleGroups?.forEach((pg) => set.add(pg));
    e.secondaryMuscleGroups?.forEach((sg) => set.add(sg));
  });

  return set;
};
