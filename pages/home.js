import Header from '../components/Header';
import Loading from '../components/Loading';
import Todos from '../components/Todos';
import Days from '../components/Days';
import Router from 'next/router';

import { useEffect, useState } from 'react';

import styles from '../styles/pages/Home.module.css';

const now = new Date();
const dayNames = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

export default function Home(props) {
  const { authed } = props;

  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());

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

  // returns the offset of the current month
  function monthOffset() {
    const firstOfMonth = new Date(year, month, 1);
    return firstOfMonth.getDay();
  }

  const fillers = Array(monthOffset()).fill(0);

  // listen for routing
  useEffect(() => {
    if (authed === false) Router.push('/');
  }, [authed]);

  // return if loading
  if (!authed) return <Loading />;

  return (
    <div className={styles.container}>
      <Header />
      <button onClick={backMonth}>{'<'}</button>
      <button onClick={forwardMonth}>{'>'}</button>
      <Todos />
      <h1>
        {new Date(year, month, 1).toLocaleString('default', { month: 'long' })}
        {' '}
        {year}
      </h1>
      <div className={styles.calendar}>
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
    </div>
  );
}
