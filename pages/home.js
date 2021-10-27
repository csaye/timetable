import Loading from '../components/Loading';
import Router from 'next/router';

import { useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';

import styles from '../styles/pages/Home.module.css';

const now = new Date();
const dayNames = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

export default function Home(props) {
  const { authed } = props;

  const auth = getAuth();

  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());

  // returns the offset of the current month
  function monthOffset() {
    const firstOfMonth = new Date(year, month, 1);
    return firstOfMonth.getDay();
  }

  // returns number of days in the current month
  function daysInMonth() {
    const nextMonth = month + 1;
    const endOfMonth = new Date(year, nextMonth, 0);
    return endOfMonth.getDate();
  }

  const fillers = Array(monthOffset()).fill(0);
  const days = Array(daysInMonth()).fill(0).map((val, i) => i + 1);

  // listen for routing
  useEffect(() => {
    if (authed === false) Router.push('/');
  }, [authed]);

  // return if loading
  if (!authed) return <Loading />;

  return (
    <div>
      <button onClick={() => signOut(auth)}>
        Sign Out
      </button>
      <div className={styles.calendar}>
        {
          dayNames.map((dayName, i) =>
            <div className={styles.box} key={i}>
              <h3>{dayName}</h3>
            </div>
          )
        }
        {
          fillers.map((filler, i) =>
            <span className={styles.box} key={i} />
          )
        }
        {
          days.map((day, i) =>
            <div className={styles.box} key={i}>
              {day}
            </div>
          )
        }
      </div>
    </div>
  );
}
