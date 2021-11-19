import Modal from './Modal';
import Todo from './Todo';

import { getAuth } from 'firebase/auth';
import {
  getFirestore, collection, query, where, orderBy, addDoc
} from 'firebase/firestore';
import { useCollectionData } from 'react-firebase9-hooks/firestore';
import { useState } from 'react';

import styles from '../styles/components/Todos.module.css';

const now = new Date();

export default function Todos() {
  const auth = getAuth();
  const db = getFirestore();

  const [showPast, setShowPast] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  // get todos
  const uid = auth.currentUser.uid;
  const todosRef = collection(db, 'todos');
  const todosQuery = query(todosRef, where('uid', '==', uid), orderBy('date'));
  const [todos] = useCollectionData(todosQuery, { idField: 'id' });

  // creates new todo in firebase
  async function createTodo() {
    const uid = auth.currentUser.uid;
    await addDoc(todosRef, {
      title, uid,
      date: date.replaceAll('-', '/'),
      time: isTime ? time : null
    });
  }

  // resets modal
  function resetModal() {
    setTitle('');
    setDate('');
    setTime('');
  }

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <button onClick={() => {
          resetModal();
          setModalOpen(true);
        }}>+</button>
        <label>
          Show Past Todos
          <input
            type="checkbox"
            value={showPast}
            onChange={e => setShowPast(e.target.checked)}
          />
        </label>
      </div>
      <div className={styles.todos}>
        {
          todos &&
          todos.filter(todo =>
            showPast ? true : new Date(todo.date) > now
          ).map(todo =>
            <Todo {...todo} key={todo.id} />
          )
        }
      </div>
      <Modal open={modalOpen} setOpen={setModalOpen}>
        <h1>New Todo</h1>
        <form
          className={styles.todoform}
          onSubmit={e => {
            e.preventDefault();
            createTodo();
            setModalOpen(false);
          }}
        >
          <input
            placeholder="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
          />
          <input
            type="time"
            value={time}
            onChange={e => setTime(e.target.value)}
            required
          />
          <button className="graybutton">Create</button>
        </form>
      </Modal>
    </div>
  );
}
