import { DAYS_OF_WEEK } from "@/constants";
import { WorkoutHistory } from "@/types/workout";

const dateDiff = (date1: Date, date2: Date) => Math.floor((date1.valueOf() - date2.valueOf()) / (1000 * 60 * 60 * 24));

export const findHitDays = (data: WorkoutHistory[]) => {
  const hitDays = DAYS_OF_WEEK.map(() => false);

  if (data.length === 0) {
    return hitDays;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Search for exercises until we are beyond start of week
  let i = 0;
  let currDate = new Date(data[i].dateStarted ?? "");
  let diff = dateDiff(today, currDate);
  let isInCurrWeek = diff <= today.getDay();

  while (isInCurrWeek || hitDays.at(-1) === true) {
    const day = new Date(data[i].dateStarted ?? "").getDay();

    if (day <= today.getDay()) {
      hitDays[day] = true;
    }

    i = i + 1;
    currDate = new Date(data[i].dateStarted ?? "");
    diff = dateDiff(today, currDate);
    isInCurrWeek = diff <= today.getDay();
  }

  return hitDays;
};
