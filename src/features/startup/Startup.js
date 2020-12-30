import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Canvas } from 'react-three-fiber'
import { loadData } from '../../chains'
import { getStatus } from './startupSlice'
import styles from './Startup.module.css'

import { Menu } from '../menu/Menu'
import { Galaxy } from '../galaxy/Galaxy'
import { Region } from '../region/Region'
import { Tooltip } from '../tooltip/Tooltip'
import { AGT } from '../three/AGT'

function LoadButton() {
  const dispatch = useDispatch()
  const status = useSelector(getStatus)
  if (status === "NoData") {
    return (
      <button className={styles.button}
          type='button'
          onClick={e => dispatch(loadData())}
        >Click on the octahedron to initiate the map
      </button>
    )
  } else { return null}
}

export function Startup() {
  const status = useSelector(getStatus)
  const dispatch = useDispatch()

  return (
    <div style={{ width: '100%', height: '100%' }} >
      { status === "Region" 
         ? <Region/> 
         : <Canvas style={{ background: '#000000' }}>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            { status === "NoData" || status === "Full"
              ? <AGT position={[0,0,0]} dispatch={dispatch} active={false} />
              : null
            }
            { status === "Loading"
              ? <AGT position={[0,0,0]} dispatch={dispatch} active={true} />
              : null
            }
          </Canvas>
      }
      {/* Overlay HTML */}
      <div className={styles.status}>{status}</div>
      {status === "NoData" ? <LoadButton/> : null}
      {status === "Full" || status === "Galaxy" || status === "Region" ? <Menu/> : null}
      {status === "Region" ? <Tooltip /> : null}
      {status === "Galaxy" ? <Galaxy/> : null}
    </div>
  )
}