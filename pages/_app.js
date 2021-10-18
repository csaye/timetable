import Head from 'next/head';

import { initializeApp, getApps } from 'firebase/app';
import { firebaseConfig } from '../util/firebaseConfig';

import '../styles/globals.css';

// initialize firebase
if (!getApps().length) initializeApp(firebaseConfig);

export default function App(props) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Timetable</title>
        <meta name="description" content="Centralized schedule management." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
