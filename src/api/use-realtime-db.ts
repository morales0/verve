import { DefaultError, useQuery, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import { app } from "@/firebase/config";
import { getDatabase, onValue, Query } from "firebase/database";
import { useEffect } from "react";

export const useRealtimeDB = <TQueryFnData, TError = DefaultError, TData = TQueryFnData>(
  ref: Query,
  options: Partial<UseQueryOptions<TQueryFnData, TError, TData>> = {}
) => {
  const queryClient = useQueryClient();
  const queryKey = ref.toString();

  useEffect(() => {
    const off = onValue(
      ref,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val() as TQueryFnData | undefined;
          queryClient.setQueryData(options.queryKey ?? [queryKey], data ?? {});
        }
      },
      (err) => {
        console.error("Error with realtime database.", err);
      }
    );

    return () => off();
  }, [queryClient, queryKey]);

  return useQuery<TQueryFnData, TError, TData>({
    queryKey: options.queryKey ?? [queryKey],
    queryFn: () => new Promise<TQueryFnData>(() => {}),
    ...options,
  });
};
