import styles from '../styles/components/Todo.module.css';

import { useEffect, useState } from 'react';

const sec = 1000;
const min = sec * 60;
const hour = min * 60;
const day = hour * 24;

export default function Todo(props) {
  const end = new Date(props.date.replaceAll('-', '/'));

  const [timeLeft, setTimeLeft] = useState(end - new Date());

  // update time left every tenth of a second
  useEffect(() => {
    setTimeLeft(end - new Date());
    const interval = setInterval(() => {
      setTimeLeft(end - new Date());
    }, 100);
    return () => clearInterval(interval);
  }, []);

  function Countdown() {
    return (
      <>
        {timeLeft > day && <>{Math.floor(timeLeft / day)}<span>d</span></>}
        {timeLeft > hour && <>{Math.floor(timeLeft % day / hour)}<span>h</span></>}
        {timeLeft > min && <>{Math.floor(timeLeft % day % hour / min)}<span>m</span></>}
        {Math.floor(timeLeft % day % hour % min / sec)}<span>s</span>
      </>
    );
  }

  return (
    <div className={styles.container}>
      <h1>{props.title}</h1>
      <p>{props.date}</p>
      <Countdown />
    </div>
  );
}
