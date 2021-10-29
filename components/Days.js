import Day from './Day';

import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase9-hooks/firestore';

export default function Days(props) {
  const { month, year } = props;

  const auth = getAuth();
  const db = getFirestore();

  // get todos
  const uid = auth.currentUser.uid;
  const todosRef = collection(db, 'todos');
  const todosQuery = query(todosRef, where('uid', '==', uid));
  const [todos] = useCollectionData(todosQuery, { idField: 'id' });

  // returns number of days in the current month
  function daysInMonth() {
    const nextMonth = month + 1;
    const endOfMonth = new Date(year, nextMonth, 0);
    return endOfMonth.getDate();
  }

  const days = Array(daysInMonth()).fill(0).map((val, i) => i + 1);

  // returns todos for given day
  function getTodos(day) {
    return todos.filter(todo => {
      const [y, m, d] = todo.date.split('-').map(val => parseInt(val));
      return y === year && m - 1 === month && d === day;
    });
  }

  return (
    days.map((day, i) =>
      <Day
        todos={todos ? getTodos(day) : undefined}
        day={day}
        month={month}
        year={year}
        key={i}
      />
    )
  );
}
