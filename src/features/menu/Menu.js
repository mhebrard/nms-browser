import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getGalaxyID, getGalaxyList, getRegionID, getGalaxySpecificRegionList, isCollapse, toggle} from './menuSlice';
import { changeGalaxy, changeRegion } from '../../chains';
import styles from './Menu.module.css';

import img_logo from '../../img/logo.png';
import img_galaxy from '../../img/GALAXYMAP.png';

export function Menu() {
  const dispatch = useDispatch()
  const galaxyID = useSelector(getGalaxyID)
  const galaxyList = useSelector(getGalaxyList)
  const regionID = useSelector(getRegionID)
  const regionList = useSelector(getGalaxySpecificRegionList)
  const collapsed = useSelector(isCollapse)

  return (
    <div
      className={[styles.sidenav, styles.tronbox, styles.content].join(" ")}
      style={{
        maxWidth: collapsed ? '30px' : '99vw',
        transition: 'max-width .5s'
      }}
      >
      <div onClick={e => dispatch(toggle())}>
      <img src={img_logo} alt='logo' />
        AGT NAVI v0.5.0:
      </div>
      <div>
        <img src={img_galaxy} alt='galaxy' />
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
      </div>
      <div>
        <img/>
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
      </div>
    </div>
  )
}
