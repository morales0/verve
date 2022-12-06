import { onValue, ref } from "@firebase/database";
import { useEffect, useState } from "react";
import { useDatabase, useUser } from "reactfire";

const useCurrentWorkout = () => {
  const user = useUser();
  const db = useDatabase();
  const [currWorkout, setCurrWorkout] = useState({
    status: "loading",
    data: null,
  });

  useEffect(() => {
    if (user.data) {
      const workoutRef = ref(db, `users/${user.data.uid}/workout`);
      const workoutListener = onValue(workoutRef, (snapshot) => {
        if (snapshot.exists()) {
          setCurrWorkout({ status: "success", data: snapshot.val() });
        } else {
          setCurrWorkout({ stauts: "success", data: false });
        }
      });

      // This is the unsubscribe function provided by firebase
      return () => workoutListener();
    }
  }, [user.data, db]);

  return currWorkout;
};

export default useCurrentWorkout;
