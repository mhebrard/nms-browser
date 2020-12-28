import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getGalaxy, getGalaxyList, getRegion, getGalaxySpecificRegionList} from './menuSlice';
import { changeGalaxy, changeRegion } from '../../chains';
import styles from './Menu.module.css';

export function Menu() {
  const dispatch = useDispatch()
  const galaxy = useSelector(getGalaxy)
  const region = useSelector(getRegion)
  const galaxyList = useSelector(getGalaxyList)
  const regionList = useSelector(getGalaxySpecificRegionList)

  return (
    <div className={[styles.abs, styles.content].join(" ")}>
      Galaxy: 
      <select
        name='galaxy'
        value={galaxy}
        onChange={e => dispatch(changeGalaxy(e.target.value))}
      >
        <option value=''>--Select--</option>
        {galaxyList.map(g => {
          return <option key={g.id} value={g.name}>{g.id} - {g.name} ({g.systemCount})</option>
        })}
      </select>
      Region:
      <select
        name='region'
        value={region}
        onChange={e => dispatch(changeRegion(e.target.value))}
      >
        <option value=''>--Select--</option>
        {regionList.map((k, i) => {
          return <option key={i} value={k.name}>{k.name} ({k.systemCount})</option>
        })}
      </select>
    </div>
  )
}
