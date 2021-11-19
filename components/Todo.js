import TodoModal from './TodoModal';
import EditIcon from '@mui/icons-material/Edit';

import styles from '../styles/components/Todo.module.css';

import { useEffect, useState } from 'react';

// time intervals
const sec = 1000;
const min = sec * 60;
const hour = min * 60;
const day = hour * 24;

export default function Todo(props) {
  const { title, due, id } = props;

  const [timeLeft, setTimeLeft] = useState(
    new Date(due) - new Date()
  );

  const [modalOpen, setModalOpen] = useState(false);

  // // update time left when date changes
  useEffect(() => {
    const end = new Date(due);
    setTimeLeft(end - new Date());
  }, [due]);

  function Countdown() {
    return (
      <>
        {
          Math.abs(timeLeft) > day ?
          <>{Math.floor(Math.abs(timeLeft) / day)}<span>d</span></> :
          <>{Math.floor(Math.abs(timeLeft) % day / hour)}<span>h</span></>
        }
        {timeLeft < 0 && ' ago'}
      </>
    );
  }

  return (
    <div className={styles.container}>
      <h1>{title}</h1>
      <p>{due}</p>
      <Countdown />
      <button
        className={styles.editbutton}
        onClick={() => setModalOpen(true)}
      >
        <EditIcon />
      </button>
      <TodoModal
        todo={props}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
    </div>
  );
}
