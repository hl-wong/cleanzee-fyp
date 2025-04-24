import moment from "moment";

export const formatTime = (dateTime) => {
  return moment(dateTime).format("hh:mm A"); // Example output: "08:30 AM"
};
