import { useUser } from "@/context/user";
import { child } from "firebase/database";
import { useDatabaseList } from "@/hooks/db";

export type BaseExercise = {
  id: string; // unique, created by Firebase
  name: string; // unique
  focusAreas?: string[]; // array of focus area IDs
  tags?: string[]; // array of tag IDs
  effort?: string;
};
export type Set = {
  values: Record<string, string | number>;
  weights?: Record<string, number>;
};
export type ExerciseWithSets = BaseExercise & {
  type: "sets"; // Discriminator
  sets?: Set[];
};
export type CustomValues = Record<
  string,
  {
    type: string;
    label: string;
    value: any;
  }
>;
export type CustomExercise = BaseExercise & {
  type: "custom"; // Discriminator
  values?: CustomValues;
};

export type Exercise = ExerciseWithSets | CustomExercise;

export const useHistory = () => {
  const { dataRef } = useUser();
  const historyRef = child(dataRef, "history");
  const { data, loading, error, api } = useDatabaseList<Exercise>(historyRef);

  // todo: transform exercises to include focus areas and tags

  return {
    data,
    loading,
    error,
    api,
  };
};
