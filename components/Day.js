import DeleteIcon from '@mui/icons-material/Delete';

import { getFirestore, doc, deleteDoc } from 'firebase/firestore';

import styles from '../styles/components/Day.module.css';

const now = new Date();

export default function Day(props) {
  const { day, todos } = props;

  const db = getFirestore();

  const today = day === now.getDate();

  // deletes given todo from firebase
  async function deleteTodo(todo) {
    if (!window.confirm(`Delete ${todo.title}?`)) return;
    const todoRef = doc(db, 'todos', todo.id);
    await deleteDoc(todoRef);
  }

  return (
    <div className={
      `daybox ${styles.container} ${today && styles.selected}`
    }>
      <h1>{day}</h1>
      <div className={styles.todos}>
        {
          todos &&
          todos.map(todo =>
            <div key={todo.id}>
              {todo.title}
              <button onClick={() => deleteTodo(todo)}>
                <DeleteIcon />
              </button>
            </div>
          )
        }
      </div>
    </div>
  );
}
