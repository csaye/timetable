import DeleteIcon from '@mui/icons-material/Delete';
import Modal from './Modal';

import { getFirestore, doc, deleteDoc } from 'firebase/firestore';
import { useState } from 'react';

import styles from '../styles/components/Day.module.css';

const now = new Date();

export default function Day(props) {
  const { day, month, year, todos } = props;

  const [modalOpen, setModalOpen] = useState(false);

  const db = getFirestore();

  const monthName = new Date(year, month, 1)
  .toLocaleString('default', { month: 'long' });

  // returns whether current date is today
  function isToday() {
    return day === now.getDate() &&
      month === now.getMonth() &&
      year === now.getFullYear();
  }

  // deletes given todo from firebase
  async function deleteTodo(todo) {
    if (!window.confirm(`Delete ${todo.title}?`)) return;
    const todoRef = doc(db, 'todos', todo.id);
    await deleteDoc(todoRef);
  }

  return (
    <>
      <div
        className={
        `daybox ${styles.container} ${isToday() && styles.selected}`
        }
        onClick={() => setModalOpen(true)}
      >
        <h1>{day}</h1>
        <div className={styles.todos}>
          {
            todos &&
            todos.map(todo =>
              <div className={styles.todo} key={todo.id}>
                {todo.title}
              </div>
            )
          }
        </div>
      </div>
      <Modal open={modalOpen} setOpen={setModalOpen}>
        <h1>{day} {monthName} {year}</h1>
      </Modal>
    </>
  );
}
