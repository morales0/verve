import { app } from "@/firebase/config";
import { User } from "firebase/auth";
import { DatabaseReference, getDatabase, ref } from "firebase/database";
import { createContext, useContext, useState } from "react";
import { UserMetaData } from "../types/user";

type UserContextType = {
  user: User;
  meta: UserMetaData;
  dataRef: DatabaseReference;
  status: string;
};

const UserContext = createContext<UserContextType | null>(null);

type Props = {
  user: User;
  children: React.ReactNode;
};

export const UserProvider = ({ user, children }: Props) => {
  const db = getDatabase(app);
  const [status, setStatus] = useState("loading");
  const [meta, setMeta] = useState<UserMetaData>({ isWorkingOut: false, hasUpdatedMuscleGroups: true });
  const dataRef = ref(db, `users/${user.uid}${import.meta.env.VITE_ENV === "dev" ? "/dev" : ""}`);

  /*
  useEffect(() => {
    const metaRef = child(dataRef, "meta");
    onValue(metaRef, (snapshot) => {
      if (snapshot.exists()) {
        // check types match
        setMeta(snapshot.val());
        setStatus("done");
      } else {
        const newMeta: UserMetaData = {
          isWorkingOut: false,
          hasUpdatedMuscleGroups: false,
        };
        set(metaRef, newMeta);
      }
    });
  }, []);
  */

  return <UserContext.Provider value={{ user, meta, dataRef, status }}>{children}</UserContext.Provider>;
};

export function useUser(): UserContextType {
  const consumeUserContext = useContext(UserContext);

  if (consumeUserContext === null) {
    throw new Error("user context must be used within user provider");
  }

  return consumeUserContext as UserContextType;
}
