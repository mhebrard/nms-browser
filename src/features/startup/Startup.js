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
      Please wait, data are loading in the background
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
      { status === "Region" 
         ? <Region/> 
         : <Canvas style={{ background: '#000000' }}>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            { status === "NoData" || status === "Full" || status === "Loading"
              ? <AGT position={[0,0,0]} dispatch={dispatch} active={status === "Loading"} />
              : null
            }
          </Canvas>
      }
      {/* Overlay HTML */}
      <div className={styles.status}>{status}</div>
      {status === "NoData" ? <Loadmsg/> : null}
      {status === "Loading" ? <Waitmsg/> : null}
      {status === "Full" ? <Menumsg/> : null}
      {status === "Full" || status === "Galaxy" || status === "Region" ? <Menu/> : null}
      {status === "Galaxy" || status === "Region" ? <Tooltip /> : null}
      {status === "Galaxy" ? <Galaxy/> : null}
    </div>
  )
}