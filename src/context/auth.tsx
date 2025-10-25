import { FirebaseApp } from "firebase/app";
import { Auth, getAuth, onAuthStateChanged, User, signOut as authSignOut } from "firebase/auth";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

type AuthContextType = {
  authUser: User | null;
  status: string;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType>({
  authUser: null,
  status: "loading",
  signOut: async () => {},
});

export default function AuthProvider({ app, children }: PropsWithChildren<{ app: FirebaseApp }>) {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [status, setStatus] = useState("loading");
  const auth = getAuth(app);

  const signOut = () => authSignOut(auth);

  // Listen to auth changes
  useEffect(() => {
    const off = onAuthStateChanged(auth, (user) => {
      // log auth in local dev
      if (process.env.NODE_ENV === "development") {
        console.log("Auth", user);
      }

      if (user) {
        setAuthUser(user);
        setStatus("authenticated");
      } else {
        /* if (process.env.NODE_ENV === "development") {
          console.log("Loggin in with test user");
          signInWithEmailAndPassword(auth, "test@verve.com", "testpass");
        } else {
          setUser(null);
          setStatus("unauthenticated");
        } */
        setAuthUser(null);
        setStatus("unauthenticated");
      }
    });

    return () => off();
  }, [auth]);

  return <AuthContext.Provider value={{ authUser, status, signOut }}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const consumeAuthContext = useContext(AuthContext);

  if (consumeAuthContext === null) {
    throw new Error("auth context must be used within auth provider");
  }

  return consumeAuthContext as AuthContextType;
}
