import DeleteIcon from '@mui/icons-material/Delete';

import styles from '../styles/components/Todo.module.css';

import { useEffect, useState } from 'react';
import { getFirestore, doc, deleteDoc } from 'firebase/firestore';

const sec = 1000;
const min = sec * 60;
const hour = min * 60;
const day = hour * 24;

export default function Todo(props) {
  const { title, date, id } = props;

  const end = new Date(date.replaceAll('-', '/'));

  const [timeLeft, setTimeLeft] = useState(end - new Date());

  const db = getFirestore();
  const todoRef = doc(db, 'todos', id);

  // update time left every tenth of a second
  useEffect(() => {
    setTimeLeft(end - new Date());
    const interval = setInterval(() => {
      setTimeLeft(end - new Date());
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // deletes current todo from firebase
  async function deleteTodo() {
    if (!window.confirm(`Delete ${title}?`)) return;
    await deleteDoc(todoRef);
  }

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
      <h1>{title}</h1>
      <p>{date}</p>
      <Countdown />
      <button
        className={styles.deletebutton}
        onClick={deleteTodo}
      >
        <DeleteIcon fontSize="small" />
      </button>
    </div>
  );
}
