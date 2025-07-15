export const getDateTitle = (daysBack: number) => {
  if (daysBack === 0) return "Today";
  if (daysBack === 1) return "Yesterday";

  const date = new Date();
  date.setDate(date.getDate() - daysBack);

  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};
