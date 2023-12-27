import { child, DatabaseReference, set } from "firebase/database";

export const startWorkout = async (userRef: DatabaseReference) => {
  const now = new Date();
  const time = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return set(child(userRef, "/workout"), {
    dateStarted: now.toString(),
    timeStarted: time,
  });
};
