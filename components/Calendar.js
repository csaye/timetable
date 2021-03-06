import Days from '../components/Days';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

import { useState } from 'react';

import styles from '../styles/components/Calendar.module.css';

const dayNames = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

const now = new Date();

export default function Calendar() {
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());

  const fillers = Array(monthOffset()).fill(0);

  // returns the offset of the current month
  function monthOffset() {
    const firstOfMonth = new Date(year, month, 1);
    return firstOfMonth.getDay();
  }

  // moves calendar back one month
  function backMonth() {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  }

  // moves calendar forward one month
  function forwardMonth() {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <button onClick={backMonth}>
          <KeyboardArrowLeftIcon fontSize="large" />
        </button>
        <button onClick={forwardMonth}>
          <KeyboardArrowRightIcon fontSize="large" />
        </button>
        <h1>
          {new Date(year, month, 1).toLocaleString('default', { month: 'long' })}
          {' '}
          {year}
        </h1>
      </div>
      <div className={styles.boxes}>
        {
          dayNames.map((dayName, i) =>
            <div className={`daybox ${styles.dayname}`} key={i}>
              <h3>{dayName}</h3>
            </div>
          )
        }
        {
          fillers.map((filler, i) =>
            <span className={`daybox ${styles.filler}`} key={i} />
          )
        }
        <Days month={month} year={year} />
      </div>
    </div>
  );
}
