import styles from '../styles/components/Todo.module.css';

export default function Todo(props) {
  return (
    <div className={styles.container}>
      <h1>{props.title}</h1>
      <p>{props.date}</p>
    </div>
  );
}
