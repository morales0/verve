import { DefaultError, useQuery, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import { app } from "@/firebase/config";
import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect } from "react";

export const useRealtimeDB = <TQueryFnData, TError = DefaultError, TData = TQueryFnData>(
  path: string,
  options: Partial<UseQueryOptions<TQueryFnData, TError, TData>> = {}
) => {
  const db = getDatabase(app);
  const queryClient = useQueryClient();

  useEffect(() => {
    const off = onValue(
      ref(db, path),
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val() as TQueryFnData | undefined;
          queryClient.setQueryData(options.queryKey ?? [path], data ?? {});
        }
      },
      (err) => {
        console.error("Error with realtime database.", err);
      }
    );

    return () => off();
  }, [queryClient, path]);

  return useQuery<TQueryFnData, TError, TData>({
    queryKey: [path],
    queryFn: () => new Promise<TQueryFnData>(() => {}),
    ...options,
  });
};
