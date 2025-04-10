import { useDatabaseList } from "@/hooks/db/";
import { FocusArea, WithId } from "@/types/app.types";
import { child, push, set } from "firebase/database";
import { createContext, PropsWithChildren, useContext, useEffect } from "react";
import { useUser } from "./user";
import { defaultFocusAreas } from "@/data/default-focus-areas";

export type FocusAreaContextType = ReturnType<typeof useDatabaseList<WithId<FocusArea>>>;
const FocusAreasContext = createContext<FocusAreaContextType | null>(null);
export const FocusAreasProvider = ({ children }: PropsWithChildren) => {
  const { dataRef } = useUser();
  const focusAreasRef = child(dataRef, "focusAreas");
  const data = useDatabaseList<WithId<FocusArea>>(focusAreasRef);

  // Auto populate empty focus areas
  useEffect(() => {
    if (data.loading) return;

    if (data.data?.length === 0) {
      defaultFocusAreas.forEach((area) => {
        const newRef = push(focusAreasRef);
        set(newRef, {
          id: newRef.key,
          name: area,
        });
      });
    }
  }, [data.loading]);

  return <FocusAreasContext.Provider value={data}>{children}</FocusAreasContext.Provider>;
};

export const useFocusAreas = () => {
  return useContext(FocusAreasContext) as FocusAreaContextType;
};
