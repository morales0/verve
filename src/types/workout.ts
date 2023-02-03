export type UserExercise = {
  name: string;
  units: string[];
  muscleGroups?: string[];
  type?: string;
};

export type WorkoutExercise = {
  name: string;
  units: string[];
  sets: object[];
  complete: boolean;
};
