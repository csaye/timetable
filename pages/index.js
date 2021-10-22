import Router from 'next/router';
import Image from 'next/image';

import { useEffect } from 'react';
import signInWithGoogle from '../util/signInWithGoogle';

import styles from '../styles/pages/Index.module.css';

export default function Index(props) {
  const { authed } = props;

  // listen for routing
  useEffect(() => {
    if (authed) Router.push('/home');
  }, [authed]);

  return (
    <div className={styles.container}>
      <div className={styles.center}>
        <h1>
          <Image
            src="/img/logo.png"
            width="48"
            height="48"
          />
          Timetable
        </h1>
        <button onClick={signInWithGoogle}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
