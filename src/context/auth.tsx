import { FirebaseApp } from "firebase/app";
import { Auth, getAuth, onAuthStateChanged, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  user: User | null;
  status: string;
  data: any;
  auth: Auth;
};

const AuthContext = createContext<AuthContextType | null>(null);

type Props = {
  app: FirebaseApp;
  children: React.ReactNode;
};

export default function AuthProvider({ app, children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<string>("loading");
  const [data, setData] = useState<any>(null);

  const auth = getAuth(app);

  // Listen to auth changes
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // console.log(user);

      if (user) {
        setUser(user);
        setStatus("authenticated");
      } else {
        setUser(null);
        setData(null);
        setStatus("unauthenticated");
      }
    });
  }, [auth]);

  // Auth functions

  if (status === "loading") {
    return null;
  }

  return <AuthContext.Provider value={{ user, status, data, auth }}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const consumeAuthContext = useContext(AuthContext);

  if (consumeAuthContext === null) {
    throw new Error("auth context must be used within auth provider");
  }

  return consumeAuthContext as AuthContextType;
}
