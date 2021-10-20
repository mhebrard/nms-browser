import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getGalaxyQuery, getGalaxyList, getRegionQuery, getGalaxySpecificRegionList, isCollapse, toggle, setGalaxyQuery, setRegionQuery} from './menuSlice';
import { changeGalaxy, changeRegion } from '../../chains';
import styles from './Menu.module.css';

import img_logo from '../../img/logo.png';
import img_galaxy from '../../img/GALAXYMAP.png';

export function Menu() {
  const dispatch = useDispatch()
  const galaxyQuery = useSelector(getGalaxyQuery)
  const galaxyList = useSelector(getGalaxyList)
  const regionQuery = useSelector(getRegionQuery)
  const regionList = useSelector(getGalaxySpecificRegionList)
  const collapsed = useSelector(isCollapse)

  const galaxyMatches = galaxyList.filter(f => 
    f.id.startsWith(galaxyQuery) || f.name.includes(galaxyQuery) 
  ).slice(0, 10)

  const regionMatches = regionList.filter(f => 
    f.id.startsWith(regionQuery) || f.name.includes(regionQuery) 
  ).slice(0, 10)

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
        <img src={img_galaxy} alt='galaxy' onClick={e => galaxyMatches.length > 0 ? dispatch(changeGalaxy(galaxyMatches[0])): null } />
        Galaxy: 
        <input type="text"
          value={galaxyQuery}
          onChange={e => dispatch(setGalaxyQuery(e.target.value))}
        />
      </div>
      <div id="galaxyList" className={styles.choices}
        style={{
          display: galaxyQuery.length > 0 && galaxyMatches.length > 0 ? 'block' : 'none'
        }}>
        <ul>
          {galaxyMatches.map(g => {
            return <li key={g.id} onClick={e => dispatch(changeGalaxy(g))}>{g.id} - {g.name} ({g.regionCount})</li>
          })}
        </ul>
      </div>
      <div>
        <img onClick={e => regionMatches.length > 0 ? dispatch(changeRegion(regionMatches[0])) : null } />
        Region:
        <input type="text"
          value={regionQuery}
          onChange={e => dispatch(setRegionQuery(e.target.value))}
        />
      </div>
      <div id="regionList" className={styles.choices}
        style={{
          display: regionQuery.length > 0 && regionMatches.length > 0 ? 'block' : 'none'
        }}>
        <ul>
          {regionMatches.map(r => {
            return <li key={r.id} onClick={e => dispatch(changeRegion(r))}>{r.name} ({r.systemCount}) [{r.id}]</li>
          })}
        </ul>
      </div>
    </div>
  )
}
