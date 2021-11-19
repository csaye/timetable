import DeleteIcon from '@mui/icons-material/Delete';
import Modal from './Modal';

import { useState } from 'react';
import { getFirestore, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { dateString, timeString } from '../util/formatDate';

import styles from '../styles/components/TodoModal.module.css';

export default function TodoModal(props) {
  const { todo, modalOpen, setModalOpen } = props;

  const [newTitle, setNewTitle] = useState(todo.title);
  const [newDate, setNewDate] = useState(dateString(new Date(todo.datetime)));
  const [newTime, setNewTime] = useState(timeString(new Date(todo.datetime)));

  const db = getFirestore();
  const todoRef = doc(db, 'todos', todo.id);

  // updates todo in firebase
  async function updateTodo() {
    setModalOpen(false);
    const newDatetime = new Date(`${newDate} ${newTime}`).getTime();
    await updateDoc(todoRef, {
      title: newTitle,
      datetime: newDatetime
    });
  }

  // deletes current todo from firebase
  async function deleteTodo() {
    if (!window.confirm(`Delete ${todo.title}?`)) return;
    await deleteDoc(todoRef);
  }

  return (
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
        <input
          type="time"
          value={newTime}
          onChange={e => setNewTime(e.target.value)}
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
  );
}
