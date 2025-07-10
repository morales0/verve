// omit id locally, include when fetching
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

// Quick log exercises
export type QuickLogExercise = {
  type: "quick";
  name: string; // name to save
  timestamp: number; // date to log to
  effort?: string; // three options (light, normal, high)
  focusAreaIds?: string[]; // array of default focus area IDs
  notes?: string;
};

// Building user exercise
type BaseUserExercise = {
  name: string; // unique, mutable
  focusAreaIds?: string[]; // array of default focus area IDs
  tagIds?: string[]; // array of default tag IDs
};

// sets have explicit metrics used every time
export type SetsUserExercise = BaseUserExercise & {
  type: "sets";
  metrics: { type: string; name: string }[]; // what each set measures
};

// custom has default metrics that can be changed
export type CustomUserExercise = BaseUserExercise & {
  type: "custom";
  defaultMetrics?: { type: string; name: string }[]; // default items to measure
};

// Stored user exercise
export type UserExercise = SetsUserExercise | CustomUserExercise;

// For logging
// For sets
export type Set = {
  values: Record<string, string | number>; // ex. { reps: 5, lb: 25 }, ...
  weights?: Record<string, number>; // used for barbell feature
};
export type LoggingSetsUserExercise = Omit<SetsUserExercise, "metrics" | "type" | "name"> & {
  type: "sets";
  sets?: Set[];
  effort?: string; // only available when logging
  timestamp: number; // date to log to
  userExerciseId: string; // get data from id
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
export type LoggingCustomExercise = Omit<CustomUserExercise, "defaultMetrics" | "type" | "name"> & {
  type: "custom";
  values?: CustomValues;
  effort?: string; // only available when logging
  timestamp: number; // date to log to
  userExerciseId: string; // get data from id
};

export type LogExercise = LoggingSetsUserExercise | LoggingCustomExercise | QuickLogExercise;

export type ActiveLog = {
  date: string;
  exercises: LogExercise[];
};
