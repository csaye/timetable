import Image from 'next/image';

import { getAuth, signOut } from 'firebase/auth';

import styles from '../styles/components/Header.module.css';

export default function Header() {
  const auth = getAuth();

  return (
    <div className={styles.container}>
      <Image
        src="/img/logo.png"
        width="48"
        height="48"
        alt="logo"
      />
      <h1>Timetable</h1>
      <span className="flexfill" />
      <button onClick={() => signOut(auth)}>
        Sign Out
      </button>
    </div>
  );
}
