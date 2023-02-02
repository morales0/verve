export type UserExercise = {
  name: string;
  units: {
    [index: string | number]: string;
  };
  muscleGroups?: {
    [index: string | number]: string;
  };
  type?: string;
};
