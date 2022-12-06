import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useDatabase, useUser } from "reactfire";

const useCustomExercises = () => {
  const db = useDatabase();
  const user = useUser();
  const [status, setStatus] = useState("loading");
  const [data, setData] = useState({});

  const exercisesRef = ref(db, `users/${user.data.uid}/customExercises/`);

  useEffect(() => {
    const exercisesListener = onValue(exercisesRef, (snapshot) => {
      // this shouldn't happen, but catch it in case
      if (!snapshot.exists()) {
        setStatus("error");
        return;
      }

      let data = snapshot.val();
      setData(data);
      setStatus("success");
    });

    return () => exercisesListener();
  }, []);

  return {
    status,
    data,
  };
};

export default useCustomExercises;
