import { FirebaseApp } from "firebase/app";
import AuthProvider from "./auth";
import DatabaseProvider from "./database";

type Props = {
  app: FirebaseApp,
  children: React.ReactNode
}

export default function FirebaseProviders({ app, children }: Props) {
  return (
    <AuthProvider app={app}>
      <DatabaseProvider app={app}>
        {children}
      </DatabaseProvider>
    </AuthProvider>
  )
}
