import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRegion, setRegion } from './menuSlice';
import styles from './Menu.module.css';

import REGIONS from '../../data/regions'
import { changeRegion } from '../../chains/changeRegion'

export function Menu() {
  const region = useSelector(getRegion)
  const dispatch = useDispatch()

  return (
    <div>
      <select
        name='region'
        value={region}
        onChange={e => dispatch(changeRegion(e.target.value))}
      >
        <option value=''>--Select--</option>
        {Object.keys(REGIONS).map(k => {
          return <option key={k} value={k}>{k}</option>
        })}
      </select>
    </div>
  )
}
