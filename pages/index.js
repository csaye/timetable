import Image from 'next/image';

import signInWithGoogle from '../util/signInWithGoogle';

import styles from '../styles/pages/Index.module.css';

export default function Index() {
  return (
    <div className={styles.container}>
      <div className={styles.center}>
        <Image
          src="/img/logo.png"
          width="48"
          height="48"
        />
        <h1>Timetable</h1>
        <button onClick={signInWithGoogle}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
