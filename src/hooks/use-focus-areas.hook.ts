import { defaultFocusAreas } from "@/data/default-focus-areas";
import { child, push, set } from "firebase/database";
import { useEffect } from "react";
import { useUser } from "../context/user";
import useDatabaseList from "./use-db-list.hook";

export type FocusArea = {
  id: string;
  name: string;
  lastUsed?: string;
  totalCount?: number;
  archived?: boolean;
};

export const useFocusAreas = () => {
  const { dataRef, meta } = useUser();
  const focusAreasRef = child(dataRef, "focusAreas");
  const { loading, data, error, api } = useDatabaseList<FocusArea>(focusAreasRef);

  // Auto populate new accounts
  useEffect(() => {
    if (loading) return;

    if (data?.length === 0) {
      defaultFocusAreas.forEach((area) => {
        const newRef = push(focusAreasRef);
        set(newRef, {
          id: newRef.key,
          name: area,
        });
      });
    }
  }, [loading, data, focusAreasRef]);

  return { data, loading, error, api };
};
