import styles from '../styles/components/Day.module.css';

export default function Day(props) {
  return (
    <div className={`daybox ${styles.container}`}>
      {props.day}
    </div>
  );
}
