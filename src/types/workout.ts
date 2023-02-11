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
  sets: Record<string, number>[];
};

export type Workout = {
  exercises?: WorkoutExercise[];
  dateStarted?: string;
  timeStarted?: string;
};

export type WorkoutHistory = Workout & {
  historyId?: string;
  dateEnded?: string;
  timeEnded?: string;
};
