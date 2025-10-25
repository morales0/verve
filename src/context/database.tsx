import { FirebaseApp } from "firebase/app";
import { Database, getDatabase } from "firebase/database";
import { createContext, PropsWithChildren, useContext } from "react";

type DatabaseContextType = {
  db: Database;
};

const DatabaseContext = createContext<DatabaseContextType | null>(null);

function DatabaseProvider({ app, children }: PropsWithChildren<{ app: FirebaseApp }>) {
  const db = getDatabase(app);

  return <DatabaseContext.Provider value={{ db }}>{children}</DatabaseContext.Provider>;
}

export default DatabaseProvider;

export function useDatabase(): DatabaseContextType {
  const databaseContext = useContext(DatabaseContext);

  if (databaseContext == null) {
    throw new Error("useDatabase must be used within a DatabaseProvider component");
  }

  return databaseContext as DatabaseContextType;
}
