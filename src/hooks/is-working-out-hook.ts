import { onValue, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import { useDatabase } from "../context/database";

export function useIsWorkingOut() {
  const { database: db } = useDatabase();
  const { user } = useAuth();

  const [isWorkingOut, setIsWorkingOut] = useState(false);
  const [status, setStatus] = useState("loading");

  const updateIsWorkingOut = (val: boolean) => {
    set(ref(db, "users/" + user?.uid + "/meta/isWorkingOut"), val);
  };

  useEffect(() => {
    onValue(ref(db, `users/${user?.uid}/meta/isWorkingOut`), (snapshot) => {
      // console.log(snapshot.val());

      if (snapshot.exists()) {
        const data = snapshot.val();
        setIsWorkingOut(data);
        setStatus("done");
      } else {
        setIsWorkingOut(false);
        setStatus("done");
      }
    });
  });

  return { isWorkingOut, setIsWorkingOut: updateIsWorkingOut, status };
}
