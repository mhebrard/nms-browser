import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getGalaxyID, getGalaxyList, getRegionID, getPlatform, getGalaxySpecificRegionList, setPlatform, setMode, getMode} from './menuSlice';
import { changeGalaxy, changeRegion } from '../../chains';
import styles from './Menu.module.css';
import { MODES, PLATFORMS } from '../../data/platforms';

export function Menu() {
  const dispatch = useDispatch()
  const galaxyID = useSelector(getGalaxyID)
  const galaxyList = useSelector(getGalaxyList)
  const regionID = useSelector(getRegionID)
  const regionList = useSelector(getGalaxySpecificRegionList)
  const platform = useSelector(getPlatform)
  const mode = useSelector(getMode)

  return (
    <div className={[styles.abs, styles.content].join(" ")}>
      Galaxy: 
      <select
        name='galaxy'
        value={galaxyID}
        onChange={e => dispatch(changeGalaxy(e.target.value))}
      >
        <option value=''>--Select--</option>
        {galaxyList.map(g => {
          return <option key={g.id} value={g.id}>{g.id} - {g.name} ({g.regionCount})</option>
        })}
      </select>
      Region:
      <select
        name='region'
        value={regionID}
        onChange={e => dispatch(changeRegion(e.target.value))}
      >
        <option value=''>--Select--</option>
        {regionList.map(r => {
          return <option key={r.id} value={r.id}>{r.name} ({r.systemCount})</option>
        })}
      </select>
      Platform:
      <select
        name='platform'
        value={platform}
        onChange={e => dispatch(setPlatform(e.target.value))}
      >
        {Object.keys(PLATFORMS).map(k => {
          return <option key={k} value={PLATFORMS[k]}>{PLATFORMS[k]}</option>
        })}
      </select>
      Mode:
      <select
        name='mode'
        value={mode}
        onChange={e => dispatch(setMode(e.target.value))}
      >
        {Object.keys(MODES).map(k => {
          return <option key={k} value={MODES[k]}>{MODES[k]}</option>
        })}
      </select>
    </div>
  )
}
