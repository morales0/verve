import { useUser } from "@/context";
import { DefaultError, UseQueryOptions } from "@tanstack/react-query";
import { useRealtimeDB } from "./use-realtime-db";
import { child, DatabaseReference, Query } from "firebase/database";

export function createUserQuery<TQueryFnData>(subPath: string, queryBuilder?: (ref: DatabaseReference) => Query) {
  return <TTransformedData = TQueryFnData>(
    options?: Partial<UseQueryOptions<TQueryFnData, DefaultError, TTransformedData>>
  ) => {
    const { dataRef } = useUser();
    const userDataRef = child(dataRef, subPath);
    const dataQuery = queryBuilder ? queryBuilder(userDataRef) : userDataRef;
    return useRealtimeDB<TQueryFnData, DefaultError, TTransformedData>(dataQuery, options);
  };
}
