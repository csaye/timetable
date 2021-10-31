import styles from '../styles/components/Day.module.css';

const now = new Date();

export default function Day(props) {
  const { day, todos } = props;

  const today = day === now.getDate();

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
            </div>
          )
        }
      </div>
    </div>
  );
}
