import { useUser } from "@/context";
import { FocusArea, WithId } from "@/types/app.types";
import { DefaultError, UseQueryOptions } from "@tanstack/react-query";
import { useRealtimeDB } from "../use-realtime-db";

type FocusAreasRecord = Record<string, WithId<FocusArea>>;

export const useFocusAreas = <T = FocusAreasRecord>(
  options?: Partial<UseQueryOptions<FocusAreasRecord, DefaultError, T>>
) => {
  const { userDataPath } = useUser();

  return useRealtimeDB<FocusAreasRecord, DefaultError, T>(`${userDataPath}/focusAreas`, options);
};
