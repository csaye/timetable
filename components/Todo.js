import styles from '../styles/components/Todo.module.css';

import { useEffect, useState } from 'react';

export default function Todo(props) {
  const [timeLeft, setTimeLeft] = useState(new Date(props.date) - new Date());

  // update time left every tenth of a second
  useEffect(() => {
    setTimeLeft(new Date(props.date) - new Date());
    const interval = setInterval(() => {
      setTimeLeft(new Date(props.date) - new Date());
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <h1>{props.title}</h1>
      <p>{props.date}</p>
      {timeLeft}
    </div>
  );
}
