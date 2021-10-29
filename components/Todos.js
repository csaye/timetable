import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase9-hooks/firestore';

export default function Todos() {
  const auth = getAuth();
  const db = getFirestore();

  // get todos
  const uid = auth.currentUser.uid;
  const todosRef = collection(db, 'todos');
  const todosQuery = query(todosRef, where('uid', '==', uid));
  const [todos] = useCollectionData(todosQuery, { idField: 'id' });

  return (
    <div>
      {
        todos &&
        todos.map(todo =>
          <div key={todo.id}>
            {todo.title}
          </div>
        )
      }
    </div>
  );
}
