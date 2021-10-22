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
        <link rel="apple-touch-icon" sizes="180x180" href="favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="favicons/favicon-16x16.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
