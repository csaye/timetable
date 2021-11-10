import Header from '../components/Header';
import Loading from '../components/Loading';
import Todos from '../components/Todos';
import Calendar from '../components/Calendar';
import Router from 'next/router';

import { useEffect } from 'react';

import styles from '../styles/pages/Home.module.css';

export default function Home(props) {
  const { authed } = props;

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
      <Calendar />
    </div>
  );
}
