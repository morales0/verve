// export type Unit = "Reps" | "Weight" | "Minutes" | "Seconds";
// export type WeightType = "Dumbbell" | "Barbell" | "Kettle Bell";

export type MuscleGroup = {
  name: string;
  dateLastUsed?: string;
};

export type Unit = {
  name: string;
  unitType: "number" | "time" | "weight" | "distance";
};

export type UserExercise = {
  id: string;
  name: string;
  units: Unit[];
  primaryMuscleGroups?: string[];
  secondaryMuscleGroups?: string[];
  type: string;
};

export type LocalUserExercise = Omit<UserExercise, "id">;

export type ExerciseSet = {
  values: Record<string, string | number>;
  weights?: Record<string, number>;
};

export type WorkoutExercise = UserExercise & {
  // workoutId: string;
  sets?: ExerciseSet[];
  circuit?: number;
};

export type LocalWorkoutExercise = Omit<WorkoutExercise, "id">;

export type Workout = {
  exercises?: {
    normal?: WorkoutExercise[];
    circuits?: WorkoutExercise[][];
  };
  dateStarted?: string;
  timeStarted?: string;
  dateLastUpdated?: string;
  timeLastUpdated?: string;
  elapsedTime?: number;
};

export type WorkoutHistory = Workout & {
  historyId: string;
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
