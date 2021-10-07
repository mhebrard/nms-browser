import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeRegion } from '../../chains.js';
import { isCollapse, getNode, toggle} from './GalaxyInfoSlice';
import styles from './GalaxyInfo.module.css';

import img_galaxy from '../../img/GALAXYMAP.png';

export function GalaxyInfo() {
  const dispatch = useDispatch()
  const node = useSelector(getNode)
  const collapsed = useSelector(isCollapse)

  return (
    <div
      className={[styles.sidenav, styles.tronbox, styles.content].join(" ")}
      style={{
        maxWidth: collapsed ? '30px' : '99vw',
        transition: 'max-width .5s'
      }}
      onClick={e => dispatch(toggle())}
      >
      <div><img src={img_galaxy} alt="galaxy"/>Galaxy: {node.galaxyName}</div>
      <div><img/>Cluster: {node.name}</div>
      <div><img/>Region list: </div>
      <div>
        <div></div>
        <ul>
        {node && node.regions 
          ? node.regions.map(r => {
            return <li key={r.id} onClick={e => dispatch(changeRegion(r.id))}>{r.name}</li>
          })
          : null
        }
        </ul>
      </div>
    </div>
  )
}
