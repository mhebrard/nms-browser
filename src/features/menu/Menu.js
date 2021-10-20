import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getGalaxyQuery, getGalaxyList, getRegionQuery, getGalaxySpecificRegionList, getSystemQuery, isCollapse, toggle, setGalaxyQuery, setRegionQuery, setSystemQuery, getRegionID} from './menuSlice';
import { changeGalaxy, changeRegion } from '../../chains';
import styles from './Menu.module.css';

import img_logo from '../../img/logo.png';
import img_galaxy from '../../img/GALAXYMAP.png';
import { getSystems } from '../region/regionSlice';

export function Menu() {
  const dispatch = useDispatch()
  const galaxyQuery = useSelector(getGalaxyQuery)
  const galaxyList = useSelector(getGalaxyList)
  const regionID = useSelector(getRegionID)
  const regionQuery = useSelector(getRegionQuery)
  const regionList = useSelector(getGalaxySpecificRegionList)
  const collapsed = useSelector(isCollapse)
  const systemQuery = useSelector(getSystemQuery)
  const systemList = useSelector(getSystems)

  const galaxyMatches = galaxyList.filter(f => 
    f.id.startsWith(galaxyQuery) // ID
    || f.name.toLowerCase().includes(galaxyQuery.toLowerCase()) // Name (case insensitive)
  ).slice(0, 10) // Limit 10

  const regionMatches = regionList.filter(f => 
    f.id.startsWith(regionQuery) // Glyphs
    || f.name.toLowerCase().includes(regionQuery.toLowerCase()) // Name (case insensitive)
  ).slice(0, 10) // Limit 10

  const systemMatches = systemList.filter(f =>
    f.regionID == regionID // Filter region only (exclude Neighbour)
    && ( 
      f.glyphs.startsWith(systemQuery) // Glyphs
      || ( f.ssi && f.ssi.toString().startsWith(systemQuery) ) // SSI
      || ( f.name && f.name.toLowerCase().includes(systemQuery.toLowerCase()) ) // Name (case insensitive)
    )
  ).slice(0, 10) // Limit 10

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
      <div>
        <img />
        System:
        <input type="text"
          value={systemQuery}
          onChange={e => dispatch(setSystemQuery(e.target.value))}
        />
      </div>
      <div id="systemList" className={styles.choices}
        style={{
          display: systemQuery.length > 0 && systemMatches.length > 0 ? 'block' : 'none'
        }}>
        <ul>
          {systemMatches.map(s => {
            return <li key={s.glyphs} 
            // onClick={e => dispatch(changeSystem(s))}
            >{s.name} ({s.ssi}) [{s.glyphs}]</li>
          })}
        </ul>
      </div>
    </div>
  )
}
