export type UserExercise = {
  name: string;
  id?: string;
  units: string[];
  primaryMuscleGroups?: string[];
  secondaryMuscleGroups?: string[];
  weightType?: string;
};

export type WorkoutExercise = UserExercise & {
  workoutId?: string;
  sets: object[];
};

export type Workout = {
  exercises?: WorkoutExercise[];
  dateStarted?: string;
  timeStarted?: string;
};
