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

  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

  // get todos
  const uid = auth.currentUser.uid;
  const todosRef = collection(db, 'todos');
  const todosQuery = query(todosRef, where('uid', '==', uid), orderBy('date'));
  const [todos] = useCollectionData(todosQuery, { idField: 'id' });

  // creates new todo in firebase
  async function createTodo() {
    const uid = auth.currentUser.uid;
    await addDoc(todosRef, { title, date, uid });
  }

  // resets modal
  function resetModal() {
    setTitle('');
    setDate('');
  }

  return (
    <div>
      <button onClick={() => {
        resetModal();
        setModalOpen(true);
      }}>+</button>
      <div className={styles.todos}>
        {
          todos &&
          todos.filter(todo => new Date(todo.date) > now).map(todo =>
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
          <button className="graybutton">Create</button>
        </form>
      </Modal>
    </div>
  );
}
