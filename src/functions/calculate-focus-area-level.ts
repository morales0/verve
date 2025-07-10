import { LogExercise } from "@/types/app.types";

export function calculateFocusAreaLevel(latestLog: LogExercise | undefined) {
  // Make sure this is a complete log exercise
  if (!latestLog) return 0;

  // get time differences
  const now = new Date();
  const dateLastUsed = new Date(latestLog.timestamp);
  const diff = Math.floor((now.getTime() - dateLastUsed.getTime()) / 86400000);

  // set the effort number, default to 1
  const effortNum = latestLog.effort ? parseInt(latestLog.effort, 10) : 1; // 0 is low, 2 is high

  if (diff >= 2 + effortNum) return 1; // mid level, time to use again

  // Hot
  return 2;
}
