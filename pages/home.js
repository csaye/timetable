import Header from '../components/Header';
import Loading from '../components/Loading';
import Todos from '../components/Todos';
import Day from '../components/Day';
import Router from 'next/router';

import { useEffect, useState } from 'react';

import styles from '../styles/pages/Home.module.css';

const now = new Date();
const dayNames = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

export default function Home(props) {
  const { authed } = props;

  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

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
            <Day
              day={day}
              month={month}
              year={year}
              key={i}
            />
          )
        }
      </div>
    </div>
  );
}
