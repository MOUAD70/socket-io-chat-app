import moment from "moment";

export const formatTime = (createdAt) => {
  const m = moment(createdAt);
  const daysDiff = moment().diff(m, "days");

  if (daysDiff <= 3) return m.fromNow();
  return m.format("MMM D, YYYY");
};
