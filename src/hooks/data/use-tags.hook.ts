import { useUser } from "@/context/user";
import { child } from "firebase/database";
import { useDatabaseList } from "@/hooks/db";
import { Exercise } from "./use-history.hook";

export type Tag = {
  id: string;
  name: string;
};
export const useTags = () => {
  const { dataRef } = useUser();
  const tagsRef = child(dataRef, "tags");
  const { data, loading, error, api } = useDatabaseList<Tag>(tagsRef);

  return {
    data,
    loading,
    error,
    api,
  };
};
