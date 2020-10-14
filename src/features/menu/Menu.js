import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showGalaxy, showRegion } from './menuSlice';
import styles from './Menu.css';

export function Menu() {
  // const count = useSelector(selectCount);
  const dispatch = useDispatch();
  // const [incrementAmount, setIncrementAmount] = useState('2');

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Galaxy"
          onClick={() => dispatch(showGalaxy())}
        >
          Galaxy
        </button>
        <span> / </span>
        <button
          className={styles.button}
          aria-label="Region"
          onClick={() => dispatch(showRegion())}
        >
          Region
        </button>
      </div>
    </div>
  );
}
