import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getGalaxy, getGalaxyList, getRegion, getGalaxySpecificRegionList} from './menuSlice';
import { changeGalaxy, changeRegion } from '../../chains';
import styles from './Menu.module.css';

export function Menu() {
  const dispatch = useDispatch()
  const galaxyList = useSelector(getGalaxyList)
  const galaxy = useSelector(getGalaxy)
  const regionList = useSelector(getGalaxySpecificRegionList)
  const region = useSelector(getRegion)

  return (
    <div className={[styles.abs, styles.region].join(" ")}>
      Galaxy: 
      <select
        name='galaxy'
        value={galaxy}
        onChange={e => dispatch(changeGalaxy(e.target.value))}
      >
        <option value=''>--Select--</option>
        {galaxyList.map(k => {
          return <option key={k} value={k}>{k}</option>
        })}
      </select>
      Region:
      <select
        name='region'
        value={region}
        onChange={e => dispatch(changeRegion(e.target.value))}
      >
        <option value=''>--Select--</option>
        {regionList.map(k => {
          return <option key={k} value={k}>{k}</option>
        })}
      </select>
    </div>
  )
}
