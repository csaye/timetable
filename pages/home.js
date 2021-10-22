import Loading from '../components/Loading';
import Router from 'next/router';

import { useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';

import styles from '../styles/pages/Home.module.css';

export default function Home(props) {
  const { authed } = props;

  const auth = getAuth();

  // listen for routing
  useEffect(() => {
    if (authed === false) Router.push('/');
  }, [authed]);

  // return if loading
  if (!authed) return <Loading />;

  return (
    <div>
      <button onClick={() => signOut(auth)}>
        Sign Out
      </button>
    </div>
  );
}
