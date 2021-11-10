import Modal from './Modal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import styles from '../styles/components/Todo.module.css';

import { useEffect, useState } from 'react';
import { getFirestore, doc, deleteDoc, updateDoc } from 'firebase/firestore';

const sec = 1000;
const min = sec * 60;
const hour = min * 60;
const day = hour * 24;

export default function Todo(props) {
  const { title, date, id } = props;

  const end = new Date(date.replaceAll('-', '/'));

  const [timeLeft, setTimeLeft] = useState(end - new Date());

  const [modalOpen, setModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

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

  // updates todo in firebase
  async function updateTodo() {
    setModalOpen(false);
    await updateDoc(todoRef, { title: newTitle });
  }

  // resets modal values
  function resetModal() {
    setNewTitle(title);
  }

  function Countdown() {
    return (
      <>
        {
          Math.abs(timeLeft) > day &&
          <>{Math.floor(Math.abs(timeLeft) / day)}<span>d</span></>
        }
        {
          Math.abs(timeLeft) > hour &&
          <>{Math.floor(Math.abs(timeLeft) % day / hour)}<span>h</span></>
        }
        {
          Math.abs(timeLeft) > min &&
          <>{Math.floor(Math.abs(timeLeft) % day % hour / min)}<span>m</span></>
        }
        {Math.floor(Math.abs(timeLeft) % day % hour % min / sec)}<span>s</span>
        {timeLeft < 0 && ' ago'}
      </>
    );
  }

  return (
    <div className={styles.container}>
      <h1>{title}</h1>
      <p>{date}</p>
      <Countdown />
      <button
        className={styles.editbutton}
        onClick={() => {
          resetModal();
          setModalOpen(true);
        }}
      >
        <EditIcon />
      </button>
      <Modal open={modalOpen} setOpen={setModalOpen}>
        <h1>Editing Todo</h1>
        <form onSubmit={e => {
          e.preventDefault();
          updateTodo();
        }}>
          <input
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            required
          />
          <button className="graybutton">
            Update
          </button>
        </form>
        <button className="iconbutton" onClick={deleteTodo}>
          <DeleteIcon />
        </button>
      </Modal>
    </div>
  );
}
