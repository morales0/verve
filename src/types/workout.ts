export type MuscleGroup = {
  name: string;
  dateLastUsed?: string;
};

export type UserExercise = {
  name: string;
  id?: string;
  units: string[];
  /* units: {
    name: string,
    type: "string" | "number"
  }[]; */
  primaryMuscleGroups?: string[];
  secondaryMuscleGroups?: string[];
  weightType?: string;
};

export type SetType = {
  values: Record<string, string | number>;
  weights?: Record<string, number>;
};

export type WorkoutExercise = UserExercise & {
  workoutId?: string;
  sets: SetType[];
};

export type Workout = {
  exercises?: WorkoutExercise[];
  dateStarted?: string;
  timeStarted?: string;
  dateLastUpdated?: string;
};

export type WorkoutHistory = Workout & {
  historyId?: string;
  dateEnded?: string;
  timeEnded?: string;
};

export type ExerciseHistory = {
  date: string;
  time: string;
  exId: string;
  histId: string;
  sets: Record<string, string>[];
};
