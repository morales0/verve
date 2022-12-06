import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useDatabase, useUser } from "reactfire";

const useCustomExercise = (eid) => {
  const db = useDatabase();
  const user = useUser();
  const [status, setStatus] = useState("loading");
  const [data, setData] = useState({});

  const exerciseRef = ref(db, `users/${user.data.uid}/customExercises/${eid}`);

  useEffect(() => {
    const exListener = onValue(exerciseRef, (snapshot) => {
      // this shouldn't happen, but catch it in case
      if (!snapshot.exists()) {
        setStatus("error");
        return;
      }

      let data = snapshot.val();
      setData(data);
      setStatus("success");
    });

    return () => exListener();
  }, [exerciseRef]);

  return {
    status,
    data,
  };
};

export default useCustomExercise;
