export type Unit = "Reps" | "Weight" | "Minutes" | "Seconds";
export type WeightType = "Dumbbell" | "Barbell" | "Kettle Bell";

export type MuscleGroup = {
  name: string;
  dateLastUsed?: string;
};

export type UserExercise = {
  id?: string;
  name: string;
  units: string[];
  // units: Unit[]
  primaryMuscleGroups?: string[];
  secondaryMuscleGroups?: string[];
  weightType?: string;
  // weightType?: WeightType
};

export type ExerciseSet = {
  values: Record<string, string | number>;
  weights?: Record<string, number>;
};

export type WorkoutExercise = UserExercise & {
  workoutId?: string;
  sets: ExerciseSet[];
};

export type Workout = {
  exercises?: WorkoutExercise[];
  dateStarted?: string;
  timeStarted?: string;
  dateLastUpdated?: string;
  timeLastUpdated?: string;
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
  sets: ExerciseSet[];
};
