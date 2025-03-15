import { useUser } from "@/context/user";
import { child } from "firebase/database";
import useDatabaseList from "./use-db-list.hook";

type BaseExercise = {
  id: string; // unique, created by Firebase
  name: string; // unique
  focusAreas?: string[]; // array of focus area IDs
  tags?: string[]; // array of tag IDs
};
type Set = {
  values: Record<string, string | number>;
  weights?: Record<string, number>;
};
type ExerciseWithSets = BaseExercise & {
  type: "sets"; // Discriminator
  sets: Set[];
};
type DynamicValues = Record<
  string,
  {
    type: string;
    label: string;
    value: string;
  }
>;
type DynamicExercise = BaseExercise & {
  type: "dynamic"; // Discriminator
  values: DynamicValues;
};

export type Exercise = ExerciseWithSets | DynamicExercise;

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
