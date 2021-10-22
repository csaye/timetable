import Loading from '../components/Loading';
import Router from 'next/router';

import { useEffect } from 'react';

import styles from '../styles/pages/Home.module.css';

export default function Home(props) {
  const { authed } = props;

  // listen for routing
  useEffect(() => {
    if (authed === false) Router.push('/');
  }, [authed]);

  // return if loading
  if (!authed) return <Loading />;

  return (
    <div>
    </div>
  );
}
