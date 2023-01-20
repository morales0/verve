import { FirebaseApp } from "firebase/app";
import { Database, getDatabase } from "firebase/database";
import { createContext, useContext } from "react";


type DatabaseContextType = {
  database: Database
}

const DatabaseContext = createContext<DatabaseContextType | null>(null)

type Props = {
  children: React.ReactNode,
  app: FirebaseApp
}

function DatabaseProvider({ app, children }: Props) {
  const db = getDatabase(app)

  return (
    <DatabaseContext.Provider value={{ database: db }}>
      {children}
    </DatabaseContext.Provider>
  )
}

export default DatabaseProvider

export function useDatabase(): DatabaseContextType {
  const databaseContext = useContext(DatabaseContext)

  if (databaseContext == null) {
    throw new Error("useDatabase must be used within a DatabaseProvider component");
  }

  return databaseContext as DatabaseContextType
}