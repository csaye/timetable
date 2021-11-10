import Days from '../components/Days';

import { useState } from 'react';

const dayNames = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

const now = new Date();

export default function Calendar() {
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());

  // returns the offset of the current month
  function monthOffset() {
    const firstOfMonth = new Date(year, month, 1);
    return firstOfMonth.getDay();
  }

  const fillers = Array(monthOffset()).fill(0);

  return (
    <div>
      <h1>
        {new Date(year, month, 1).toLocaleString('default', { month: 'long' })}
        {' '}
        {year}
      </h1>
      {
        dayNames.map((dayName, i) =>
          <div className="daybox" key={i}>
            <h3>{dayName}</h3>
          </div>
        )
      }
      {
        fillers.map((filler, i) =>
          <span className="daybox" key={i} />
        )
      }
      <Days month={month} year={year} />
    </div>
  );
}
