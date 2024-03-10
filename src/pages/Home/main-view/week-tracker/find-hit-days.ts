import { DAYS_OF_WEEK } from "@/constants";
import { WorkoutHistory } from "@/types/workout";

const dateDiff = (date1: Date, date2: Date) => Math.floor((date1.valueOf() - date2.valueOf()) / (1000 * 60 * 60 * 24));

export const findHitDays = (data: WorkoutHistory[]) => {
  const hitDays = DAYS_OF_WEEK.map(() => false);

  if (data.length === 0) {
    return hitDays;
  }

  // Create a today object and set to last minute
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  // Iterate through workouts
  let i = 0;
  while (i < data.length) {
    const currDate = new Date(data[i].dateStarted ?? "");
    const diff = dateDiff(today, currDate);

    // if workout is not in this current week or hitdays are done, break
    if (diff > today.getDay()) {
      break;
    }

    // mark the day
    const day = currDate.getDay();
    hitDays[day] = true;

    i = i + 1;
  }

  return hitDays;
};
