export type WithId<T> = T & { id: string };

export type FocusArea = {
  name: string;
  archived?: boolean;
  lastUsedForced?: string; // for when users force hot areas (hot for 1 day, medium for 2)
  totalCount?: number;
};

export type Tag = {
  name: string;
};

// Stored user exercise
export type UserExercise = {
  name: string; // unique, mutable
  type: "sets" | "custom"; // unique, immutable
  focusAreaIds?: string[]; // array of default focus area IDs
  tagIds?: string[]; // array of default tag IDs
};

// Quick log exercises
export type QuickLogExercise = Pick<UserExercise, "focusAreaIds"> & {
  type: "quick";
  name: string; // default to "Workout"
  effort?: string;
};

// Exercise that goes into log
export type BaseLoggingExercise = Omit<UserExercise, "name" | "type"> & {
  userExerciseId: string;
  effort?: string;
};

// For sets
export type Set = {
  values: Record<string, string | number>; // ex. { reps: 5, lb: 25 }, ...
  weights?: Record<string, number>; // used for barbell feature
};
export type SetsExercise = BaseLoggingExercise & {
  type: "sets"; // Discriminator
  sets?: Set[];
};

// For custom
export type CustomValues = Record<
  string,
  {
    type: string;
    label: string;
    value: any;
  }
>;
export type CustomExercise = BaseLoggingExercise & {
  type: "custom"; // Discriminator
  values?: CustomValues;
};

// Union, for types, used for LogExercise
type LoggingExercise = SetsExercise | CustomExercise | QuickLogExercise;

// Union, used for log exercises
export type LogExercise =
  | (LoggingExercise & { status: "complete" | "editing"; timestamp: number })
  | (LoggingExercise & { status: "logging" });

export type ActiveLog = {
  date: string;
  exercises: LogExercise[];
};
