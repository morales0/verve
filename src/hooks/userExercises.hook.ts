import { off, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import { useDatabase } from "../context/database";

type UserExercise = {
  name: string;
  measures: {
    [index: number]: string;
  };
};

const useUserExercises = () => {
  const { user } = useAuth();
  const { db } = useDatabase();
  const [userExercises, setUserExercises] = useState<{
    [name: string]: UserExercise;
  }>({});

  useEffect(() => {
    if (!user) return;

    const userExercisesRef = ref(db, `users/${user.uid}/userExercises`);
    onValue(userExercisesRef, (snapshot) => {
      if (snapshot.exists()) {
        setUserExercises(snapshot.val());
      } else {
        console.log("workout doesn't exist");
      }
    });

    return () => off(userExercisesRef);
  }, [db, user]);

  return {
    userExercises,
  };
};

export default useUserExercises;
