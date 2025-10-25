import { app } from "@/firebase/config";
import { User } from "firebase/auth";
import { DatabaseReference, getDatabase, ref } from "firebase/database";
import { createContext, PropsWithChildren, useContext } from "react";

type UserContextType = {
  user: User;
  dataRef: DatabaseReference;
  userDataPath: string;
  // meta: UserMetaData;
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ user, children }: PropsWithChildren<{ user: User }>) => {
  const db = getDatabase(app);
  // const [meta, setMeta] = useState<UserMetaData>({ isWorkingOut: false, hasUpdatedMuscleGroups: true });

  // Use dev data before releasing app
  const userDataPath = `users/${user.uid}${import.meta.env.VITE_ENV === "dev" ? "/dev" : ""}`;
  const dataRef = ref(db, userDataPath);

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

  return <UserContext.Provider value={{ user, dataRef, userDataPath }}>{children}</UserContext.Provider>;
};

export function useUser(): UserContextType {
  const consumeUserContext = useContext(UserContext);

  if (consumeUserContext === null) {
    throw new Error("user context must be used within user provider");
  }

  return consumeUserContext as UserContextType;
}
