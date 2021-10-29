import styles from '../styles/components/Day.module.css';

export default function Day(props) {
  const { day, todos } = props;

  return (
    <div className={`daybox ${styles.container}`}>
      <h1>{day}</h1>
      <div className={styles.todos}>
        {
          todos &&
          todos.map(todo =>
            <div key={todo.id}>
              {todo.title}
            </div>
          )
        }
      </div>
    </div>
  );
}
