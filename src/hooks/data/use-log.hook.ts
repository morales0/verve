import { useUser } from "@/context/user";
import { child } from "firebase/database";
import { useDatabaseList } from "@/hooks/db";
import { Exercise } from "./use-history.hook";

export const useLog = () => {
  const { dataRef } = useUser();
  const historyRef = child(dataRef, "log");
  const { data, loading, error, api } = useDatabaseList<Exercise>(historyRef);

  // todo: transform exercises to include focus areas and tags

  return {
    data,
    loading,
    error,
    api,
  };
};
