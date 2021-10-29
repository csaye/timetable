import Day from './Day';

export default function Days(props) {
  const { month, year } = props;

  // returns number of days in the current month
  function daysInMonth() {
    const nextMonth = month + 1;
    const endOfMonth = new Date(year, nextMonth, 0);
    return endOfMonth.getDate();
  }

  const days = Array(daysInMonth()).fill(0).map((val, i) => i + 1);

  return (
    days.map((day, i) =>
      <Day
        day={day}
        month={month}
        year={year}
        key={i}
      />
    )
  );
}
