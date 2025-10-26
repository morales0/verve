import { createUserQuery } from "./user-query-factory";

export const useDatabaseValue = <T>(path: string) => createUserQuery<T>(path)();
