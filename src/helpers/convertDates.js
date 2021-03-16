import moment from "moment";

export const covertDates = (event = []) => {
  return event.map((e) => ({
    ...e,
    start: moment(e.start).toDate(),
    end: moment(e.end).toDate(),
  }));
};
