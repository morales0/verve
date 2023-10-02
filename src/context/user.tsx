import { Center, Loader, Stack, Text } from "@mantine/core";
import { User } from "firebase/auth";
import { child, DatabaseReference, onValue, ref, set } from "firebase/database";
import { createContext, useContext, useEffect, useState } from "react";
import { UserMetaData } from "../types/user";
import { useDatabase } from "./database";

type UserContextType = {
  authData: User;
  meta: UserMetaData;
  dataRef: DatabaseReference;
  status: string;
};

const UserContext = createContext<UserContextType | null>(null);

type Props = {
  user: User;
  children: React.ReactNode;
};

export default function UserProvider({ user, children }: Props) {
  const { db } = useDatabase();
  const [status, setStatus] = useState("loading");
  const [meta, setMeta] = useState<UserMetaData | undefined>();
  const dataRef = ref(db, `users/${user.uid}`);

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

  if (status === "loading" || !meta) {
    return (
      <Stack h="100%" align="center">
        <Text py="md" fz="xl">
          verve
        </Text>
        <Center sx={{ flexGrow: 1 }}>
          <Loader variant="bars" color="indigo" />
        </Center>
      </Stack>
    );
  }

  return <UserContext.Provider value={{ authData: user, meta, dataRef, status }}>{children}</UserContext.Provider>;
}

export function useUser(): UserContextType {
  const consumeUserContext = useContext(UserContext);

  if (consumeUserContext === null) {
    throw new Error("user context must be used within user provider");
  }

  return consumeUserContext as UserContextType;
}
