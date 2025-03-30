/**
 * By the passed date returns the number of seconds elapsed since 00:00 01.01.1970.
 */
function dateToTimestamp(date) {
  return new Date(date).getTime();
}

/**
 * Returns the time in hh:mm:ss format from the received date.
 */
function getTime(date) {
  return date.toTimeString().split(' ')[0];
}

/**
 * Returns the name of the day of the week for a given date string.
 */
function getDayName(date) {
  return new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
}

/**
 * Returns the date of the next Friday from a given date.
 */
function getNextFriday(date) {
  const result = new Date(date);
  result.setDate(result.getDate() + ((7 - result.getDay() + 5) % 7 || 7));
  return result;
}

/**
 * Returns the number of days in a specified month and year.
 */
function getCountDaysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

/**
 * Returns the total number of days between two dates.
 */
function getCountDaysOnPeriod(dateStart, dateEnd) {
  const start = new Date(dateStart);
  const end = new Date(dateEnd);
  const diffTime = Math.abs(end - start);
  return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
}

/**
 * Returns true if a given date is within a specified range.
 */
function isDateInPeriod(date, period) {
  const checkDate = new Date(date);
  const startDate = new Date(period.start);
  const endDate = new Date(period.end);
  return checkDate >= startDate && checkDate <= endDate;
}

/**
 * Returns the date formatted in 'M/D/YYYY, hh:mm:ss a'.
 */
function formatDate(date) {
  return new Date(date).toLocaleString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
}

/**
 * Returns the total number of weekend days in a specified month and year.
 */
function getCountWeekendsInMonth(month, year) {
  let count = 0;
  const daysInMonth = getCountDaysInMonth(month, year);

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(year, month - 1, day);
    if (date.getDay() === 0 || date.getDay() === 6) {
      count += 1;
    }
  }
  return count;
}

/**
 * Returns the week number of the year for a given date.
 */
function getWeekNumberByDate(date) {
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  target.setDate(target.getDate() + 3 - ((target.getDay() + 6) % 7));
  const firstWeek = new Date(target.getFullYear(), 0, 4);
  return (
    1 +
    Math.round(
      ((target - firstWeek) / 86400000 - 3 + ((firstWeek.getDay() + 6) % 7)) / 7
    )
  );
}

/**
 * Returns the date of the next Friday the 13th.
 */
function getNextFridayThe13th(date) {
  const result = new Date(date);
  result.setDate(13);

  while (true) {
    if (result <= date || result.getDay() !== 5) {
      result.setMonth(result.getMonth() + 1);
      result.setDate(13);
    } else {
      break;
    }
  }

  return result;
}

/**
 * Returns the quarter of the year for a given date.
 */
function getQuarter(date) {
  return Math.floor(date.getMonth() / 3) + 1;
}

/**
 * Generates an employee's work schedule.
 */
function getWorkSchedule(period, countWorkDays, countOffDays) {
  const workDays = [];
  const startDate = new Date(period.start.split('-').reverse().join('-'));
  const endDate = new Date(period.end.split('-').reverse().join('-'));

  const currentDate = new Date(startDate);
  let daysCounter = 0;

  while (currentDate <= endDate) {
    if (daysCounter < countWorkDays) {
      workDays.push(
        currentDate
          .toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })
          .split('/')
          .join('-')
      );
    }

    if (daysCounter === countWorkDays + countOffDays - 1) {
      daysCounter = -1;
    }

    currentDate.setDate(currentDate.getDate() + 1);
    daysCounter += 1;
  }

  return workDays;
}

/**
 * Determines whether the year is a leap year.
 */
function isLeapYear(date) {
  const year = date.getFullYear();
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

module.exports = {
  dateToTimestamp,
  getTime,
  getDayName,
  getNextFriday,
  getCountDaysInMonth,
  getCountDaysOnPeriod,
  isDateInPeriod,
  formatDate,
  getCountWeekendsInMonth,
  getWeekNumberByDate,
  getNextFridayThe13th,
  getQuarter,
  getWorkSchedule,
  isLeapYear,
};
