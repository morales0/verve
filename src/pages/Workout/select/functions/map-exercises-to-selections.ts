import { Workout, WorkoutExercise } from "@/types/workout";

export type ExerciseSelection = Pick<WorkoutExercise, "id" | "name">;

export const mapExercisesToSelections = (data: Workout["exercises"] | undefined) => {
  const normalExercises: ExerciseSelection[] = data?.normal?.map((ex) => ({ id: ex.id, name: ex.name })) ?? [];
  const circuits: ExerciseSelection[][] =
    data?.circuits?.map((circuit) => circuit.map((ex) => ({ id: ex.id, name: ex.name }))) ?? [];
  return [normalExercises, ...circuits];
};
