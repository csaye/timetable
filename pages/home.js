import Loading from '../components/Loading';
import Router from 'next/router';

import { useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';

import styles from '../styles/pages/Home.module.css';

const now = new Date();
const dayNames = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

export default function Home(props) {
  const { authed } = props;

  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());

  // returns the offset of the current month
  function monthOffset() {
    const firstOfMonth = new Date(year, month, 1);
    return firstOfMonth.getDay();
  }

  const fillers = Array(monthOffset()).fill(0);

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
      <div>
        {
          dayNames.map((dayName, i) =>
            <div key={i}>
              <h3>{dayName}</h3>
            </div>
          )
        }
        {
          fillers.map((filler, i) =>
            <span key={i} />
          )
        }
      </div>
    </div>
  );
}
