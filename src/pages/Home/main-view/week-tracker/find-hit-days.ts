import { DAYS_OF_WEEK } from "@/constants";
import { WorkoutHistory } from "@/types/workout";

const dateDiff = (date1: Date, date2: Date) => Math.floor((date1.valueOf() - date2.valueOf()) / (1000 * 60 * 60 * 24));

export const findHitDays = (data: WorkoutHistory[]) => {
  const hitDays = DAYS_OF_WEEK.map(() => false);

  if (data.length === 0) {
    return hitDays;
  }

  // Start with today at 00:00
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Iterate through workouts
  let i = 0;
  while (i < data.length) {
    const currDate = new Date(data[i].dateStarted ?? "");
    const diff = dateDiff(currDate, today);

    // if workout is not in this current week or hitdays are done, break
    if (diff >= today.getDay() || hitDays.at(-1) === true) {
      break;
    }

    // mark the day
    const day = currDate.getDay();
    hitDays[day] = true;

    i = i + 1;
  }

  return hitDays;
};
