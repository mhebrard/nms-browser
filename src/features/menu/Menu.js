import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getGalaxyID, getGalaxyQuery, getGalaxyList, getRegionID, getGalaxySpecificRegionList, isCollapse, toggle, setGalaxyQuery} from './menuSlice';
import { changeGalaxy, changeRegion } from '../../chains';
import styles from './Menu.module.css';

import img_logo from '../../img/logo.png';
import img_galaxy from '../../img/GALAXYMAP.png';

export function Menu() {
  const dispatch = useDispatch()
  const galaxyID = useSelector(getGalaxyID)
  const galaxyQuery = useSelector(getGalaxyQuery)
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
        AGT NAVI v0.6.0:
      </div>
      <div>
        <img src={img_galaxy} alt='galaxy' onClick={e => galaxyID > 0 ? dispatch(changeGalaxy(galaxyID)): null } />
        Galaxy: 
        <input type="text" id="galaxy" name="galaxy"
          value={galaxyQuery}
          onChange={e => dispatch(setGalaxyQuery(e.target.value))}
        />
      </div>
      <div id="galaxyList" className={styles.choices}
        style={{
          display: galaxyList.filter(f => f.name.startsWith(galaxyQuery)).length > 0 ? 'block' : 'none'
        }}>
        <ul>
          {galaxyList.filter(f => f.name.startsWith(galaxyQuery)).map(g => {
            return <li key={g.id} onClick={e => dispatch(changeGalaxy(g))}>{g.id} - {g.name} ({g.regionCount})</li>
          })}
        </ul>
      </div>
        {/* <select
          name='galaxy'
          value={galaxyID}
          onChange={e => dispatch(changeGalaxy(e.target.value))}
        >
          <option value=''>--Select--</option>
          {galaxyList.map(g => {
            return <option key={g.id} value={g.id}>{g.id} - {g.name} ({g.regionCount})</option>
          })}
        </select> */}
      <div>
        <img onClick={e => regionID.length > 0 ? dispatch(changeRegion(regionID)) : null } />
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
