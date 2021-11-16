import Modal from './Modal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import styles from '../styles/components/Todo.module.css';

import { useEffect, useState } from 'react';
import { getFirestore, doc, deleteDoc, updateDoc } from 'firebase/firestore';

// time intervals
const sec = 1000;
const min = sec * 60;
const hour = min * 60;
const day = hour * 24;

export default function Todo(props) {
  const { title, date, id } = props;

  const [timeLeft, setTimeLeft] = useState(
    new Date(date.replaceAll('-', '/')) - new Date()
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDate, setNewDate] = useState(date);

  const db = getFirestore();
  const todoRef = doc(db, 'todos', id);

  // // update time left when date changes
  useEffect(() => {
    const end = new Date(date.replaceAll('-', '/'));
    setTimeLeft(end - new Date());
  }, [date]);

  // deletes current todo from firebase
  async function deleteTodo() {
    if (!window.confirm(`Delete ${title}?`)) return;
    await deleteDoc(todoRef);
  }

  // updates todo in firebase
  async function updateTodo() {
    setModalOpen(false);
    await updateDoc(todoRef, {
      title: newTitle,
      date: newDate
    });
  }

  // resets modal values
  function resetModal() {
    setNewTitle(title);
  }

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
          <input
            type="date"
            value={newDate}
            onChange={e => setNewDate(e.target.value)}
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
