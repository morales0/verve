import { Stack } from "@mantine/core";
import { FirebaseApp } from "firebase/app";
import { Auth, getAuth, onAuthStateChanged, signInWithEmailAndPassword, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  user: User | null;
  status: string;
  auth: Auth;
};

const AuthContext = createContext<AuthContextType | null>(null);

type Props = {
  app: FirebaseApp;
  children: React.ReactNode;
};

export default function AuthProvider({ app, children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState("loading");

  const auth = getAuth(app);

  // Listen to auth changes
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setUser(user);
        setStatus("authenticated");
      } else {
        // if (process.env.NODE_ENV === "development") {
        //   console.log("Loggin in with test user");
        //   signInWithEmailAndPassword(auth, "test@verve.com", "testpass");
        // } else {
        //   setUser(null);
        //   setStatus("unauthenticated");
        // }
        setUser(null);
        setStatus("unauthenticated");
      }
    });
  }, [auth]);

  if (status === "loading") {
    return null;
  }

  return <AuthContext.Provider value={{ user, status, auth }}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const consumeAuthContext = useContext(AuthContext);

  if (consumeAuthContext === null) {
    throw new Error("auth context must be used within auth provider");
  }

  return consumeAuthContext as AuthContextType;
}
