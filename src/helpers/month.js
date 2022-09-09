import { MONTHS } from "../constants/months";

export const getMonthName = (number) =>
  MONTHS.find((month) => month.id === number).name;

export const getFirstDayOfTheMonth = (year, monthNumber) =>
  new Date(year, monthNumber, 1).getDay() + 1;

export const getTotalDaysOfTheMonth = (year, monthNumber) =>
  new Date(year, monthNumber + 1, 0).getDate();

export const getWeekDay = (year, monthNumber, day) =>
  new Date(year, monthNumber, day).getDay();

export const getFullDate = (year, monthNumber, day) =>
  new Date(year, monthNumber, day).toLocaleString();

export const getDate = (year, monthNumber, day) =>
  new Date(year, monthNumber, day).getTime();

export const setEvents = (monthData, events) => {
  return monthData.map((month) => {
    const monthsEvents = events.filter((event) => event.date === month.date);
    return {
      ...month,
      events: monthsEvents,
    };
  });
};

export const getCalendarMonth = (year, monthNumber, events) => {
  const monthData = [];
  const firstDayOfTheMonth = getFirstDayOfTheMonth(year, monthNumber);

  //add days of the current month
  const totalDays = getTotalDaysOfTheMonth(year, monthNumber);
  for (let day = 1; day <= totalDays; day++) {
    const weekday = getWeekDay(year, monthNumber, day);
    monthData.push({
      date: getDate(year, monthNumber, day),
      dayNumber: day,
      weekday,
      fullDate: getFullDate(year, monthNumber, day),
      isCurrentMonth: true,
      isWeekend: weekday === 0 || weekday === 6,
      isToday:
        new Date().setHours(0, 0, 0, 0) === getDate(year, monthNumber, day),
    });
  }

  // add the days of the Previous month
  const previousMonth = getTotalDaysOfTheMonth(year, monthNumber - 1);
  const numberOfDaysOfPreviousMonth = previousMonth - firstDayOfTheMonth + 2;
  for (
    let previousDay = previousMonth;
    numberOfDaysOfPreviousMonth <= previousDay;
    previousDay--
  ) {
    const weekday = getWeekDay(year, monthNumber - 1, previousDay);
    monthData.unshift({
      date: getDate(year, monthNumber - 1, previousDay),
      dayNumber: previousDay,
      weekday,
      fullDate: getFullDate(year, monthNumber - 1, previousDay),
      isCurrentMonth: false,
      isWeekend: weekday === 0 || weekday === 6,
      isToday: false,
    });
  }

  // add the days of the next month
  const numberOfDaysOfNextMonth =
    monthData.length > 35 && monthData.length < 40
      ? 42 - monthData.length
      : 35 - monthData.length;

  if (
    (monthData.length > 35 && monthData.length < 40) ||
    monthData.length < 35
  ) {
    for (
      let dayOfTheNextMonth = 1;
      dayOfTheNextMonth <= numberOfDaysOfNextMonth;
      dayOfTheNextMonth++
    ) {
      const weekday = getWeekDay(year, monthNumber + 1, dayOfTheNextMonth);
      monthData.push({
        date: getDate(year, monthNumber + 1, dayOfTheNextMonth),
        dayNumber: dayOfTheNextMonth,
        weekday,
        fullDate: getFullDate(year, monthNumber + 1, dayOfTheNextMonth),
        isCurrentMonth: false,
        isWeekend: weekday === 0 || weekday === 6,
        isToday: false,
      });
    }
  }

  return setEvents(monthData, events);
};
