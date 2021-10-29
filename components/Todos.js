import Modal from './Modal';

import { getAuth } from 'firebase/auth';
import {
  getFirestore, collection, query, where, addDoc
} from 'firebase/firestore';
import { useCollectionData } from 'react-firebase9-hooks/firestore';
import { useState } from 'react';

export default function Todos() {
  const auth = getAuth();
  const db = getFirestore();

  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

  // get todos
  const uid = auth.currentUser.uid;
  const todosRef = collection(db, 'todos');
  const todosQuery = query(todosRef, where('uid', '==', uid));
  const [todos] = useCollectionData(todosQuery, { idField: 'id' });

  // creates new todo in firebase
  async function createTodo() {
    await addDoc(todosRef, {
      title: title,
      date: new Date(date).getTime(),
      uid: auth.currentUser.uid
    });
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
      {
        todos &&
        todos.map(todo =>
          <div key={todo.id}>
            {todo.title}
          </div>
        )
      }
      <Modal open={modalOpen} setOpen={setModalOpen}>
        <h1>New Todo</h1>
        <form
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
          <button>Create</button>
        </form>
      </Modal>
    </div>
  );
}
