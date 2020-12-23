import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getGalaxy, getGalaxyList, getRegion, getGalaxySpecificRegionList} from './menuSlice';
import { changeGalaxy, changeRegion } from '../../chains';
import styles from './Menu.module.css';
import { getCatalogue } from '../startup/startupSlice';

export function Menu() {
  const dispatch = useDispatch()
  const catalogue = useSelector(getCatalogue)
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
          return <option key={g.id} value={g.name}>{g.id} - {g.name}</option>
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
