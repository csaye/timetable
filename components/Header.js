import Image from 'next/image';

import { getAuth, signOut } from 'firebase/auth';

import styles from '../styles/components/Header.module.css';

export default function Header() {
  const auth = getAuth();

  return (
    <div>
      <Image
        src="/img/logo.png"
        width="48"
        height="48"
        alt="logo"
      />
      Timetable
      <button onClick={() => signOut(auth)}>
        Sign Out
      </button>
    </div>
  );
}
