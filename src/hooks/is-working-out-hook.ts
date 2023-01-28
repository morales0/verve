import { onValue, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { useDatabase } from "../context/database";

export function useIsWorkingOut() {
  const { db } = useDatabase();
  const { user } = useAuth();

  const [isWorkingOut, setIsWorkingOut] = useState(false);
  const [status, setStatus] = useState("loading");

  const updateIsWorkingOut = (val: boolean) => {
    return set(ref(db, "users/" + user?.uid + "/meta/isWorkingOut"), val);
  };

  const startWorkout = () => {
    // Create workout first
    let now = new Date();
    let time = now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });

    return set(ref(db, "users/" + user?.uid + "/currentWorkout"), {
      dateStarted: now.toString(),
      timeStarted: time,
      inProgress: true,
    }).then(() => {
      return updateIsWorkingOut(true);
    })
  };

  const endWorkout = () => {
    return updateIsWorkingOut(false);
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

  return { isWorkingOut, startWorkout, endWorkout, status };
}
