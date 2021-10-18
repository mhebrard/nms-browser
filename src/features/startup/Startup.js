import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Canvas } from 'react-three-fiber'
// import { loadData } from '../../chains'
import { getStatus } from './startupSlice'
import styles from './Startup.module.css'

import { Menu } from '../menu/Menu'
import { Galaxy } from '../galaxy/Galaxy'
import { Region } from '../region/Region'
import { Tooltip } from '../tooltip/Tooltip'
import { GalaxyInfo } from '../galaxyinfo/GalaxyInfo'
import { AGT } from '../three/AGT'

function Loadmsg() {
  return (
    <div className={styles.msg}>
      Click on the octahedron to initiate the map
    </div>
  )
}

function Waitmsg() {
  return (
    <div className={styles.msg}>
      Please wait while data is loading in the background
    </div>
  )
}

function Menumsg() {
  return (
    <div className={styles.msg}>
      Click on the left menu to navigate through galaxies
    </div>
  )
}

export function Startup() {
  const status = useSelector(getStatus)
  const dispatch = useDispatch()

  return (
    <div className={styles.container} >
      {/* THREE Content */}
      { status === "NoData" | status === "Loading" 
        ? <Canvas style={{ background: '#000000' }}>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <AGT position={[0,0,0]} dispatch={dispatch} active={status === "Loading"} />
          </Canvas> 
        : null
      }
      { status === "Full" || status === "Galaxy" ? <Galaxy/> : null }
      { status === "Region" ? <Region/> : null }
      
      {/* HTML Overlay */}
      <div className={styles.status}>{status}</div>
      {status === "NoData" ? <Loadmsg/> : null}
      {status === "Loading" ? <Waitmsg/> : null}
      {status === "Full" ? <Menumsg/> : null}
      {status === "Full" || status === "Galaxy" || status === "Region" ? <Menu/> : null}
      {status === "Full" || status === "Galaxy" ? <GalaxyInfo /> : null}
      {status === "Region" ? <Tooltip /> : null}
    </div>
  )
}