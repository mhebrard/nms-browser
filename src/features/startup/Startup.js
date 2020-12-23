import React, { useRef, useState, useMemo, useReducer } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as THREE from 'three'
import { Canvas, useFrame } from 'react-three-fiber'
import { loadData } from '../../chains'
import { getStatus } from './startupSlice'
import styles from './Startup.module.css'

import { Menu } from '../menu/Menu'
import { Galaxy } from '../galaxy/Galaxy'

// geometry
const octahedron = {
  "name":"Octahedron",
  "category":["Platonic Solid"],
  "vertex":[[0,0,1],[1,0,0],[0,1.5,0],[-1,0,0],[0,-3,0],[0,0,-1]],
  "edge":[[0,1],[0,2],[0,3],[0,4],[1,2],[1,4],[1,5],[2,3],[2,5],[3,4],[3,5],[4,5]],
  "face":[[0,1,2],[0,2,3],[0,3,4],[0,4,1],[1,4,5],[1,5,2],[2,5,3],[3,5,4]]
}

function LoadButton() {
  const dispatch = useDispatch()
  const status = useSelector(getStatus)
  if (status == "NoData") {
    return (
      <button className={styles.button}
          type='button'
          onClick={e => dispatch(loadData())}
        >Click on the octahedron to initiate the map
      </button>
    )
  } else { return null}
}

function AGT(props) {
  const {active, dispatch} = props
  
  // This reference will give us direct access to the mesh
  const mesh = useRef()

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)

  // Define geometry attributes
  const vertices = useMemo(() => octahedron.vertex.map(v => new THREE.Vector3(...v)), [])
  const faces = useMemo(() => octahedron.face.map(f => new THREE.Face3(...f)), [])

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    if (mesh.current && active) {mesh.current.rotation.y += 0.01}
  })

  return (
    <mesh
      {...props}
      ref={mesh}
      position={[0,0,0]}
      onClick={(event) => dispatch(loadData())}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
        <mesh>
          <geometry attach="geometry" vertices={vertices} faces={faces} onUpdate={self => self.computeFaceNormals()}/>
          <meshStandardMaterial attach="material" color={hovered ? 'orange' : 'gray'} opacity={0.5} transparent/>
        </mesh>
        <mesh>
          <sphereBufferGeometry args={[0.6, 10, 10]} />
          <meshStandardMaterial attach="material" color={hovered ? 'red' : 'red'}/>
        </mesh>
    </mesh>
  )
}

export function Startup() {
  const status = useSelector(getStatus)
  const dispatch = useDispatch()

  return (
    <div style={{ width: '100%', height: '100%' }} >
      {/* Threejs canvas */}
      <Canvas style={{ background: '#000000' }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        { status == "NoData" || status == "Full" ? 
          <AGT position={[0,0,0]} dispatch={dispatch} active={false} />
          : null
        }
        { status == "Loading" ? 
          <AGT position={[0,0,0]} dispatch={dispatch} active={true} />
          : null
        }
      </Canvas>
      {/* Overlay HTML */}
      <div className={styles.status}>{status}</div>
      {status == "NoData" ? <LoadButton/> : null}
      {status == "Full" || status == "Galaxy"? <Menu/> : null}
      {status == "Galaxy" ? <Galaxy/> : null}
    </div>
  )

  // function render() {
  //   switch (status) {
  //     case 'Empty':
  //       return (
  //         <div>
  //           <Status />
  //           <Logo />
  //           <Loading />
  //         </div>
  //       )
  //     case 'Loading':
  //       return (
  //         <div>
  //           <Status />
  //           <Logo />
  //         </div>
  //       )
  //     case 'Full':
  //       return (
  //         <div>
  //           <Status />
  //           <Logo />
  //           <Menu />
  //         </div>
  //       )
  //     case 'Galaxy':
  //       return (
  //         <div>
  //           <Status />
  //           <Logo />
  //           <Menu />
  //         </div>
  //       )
  //     case 'Region':
  //       return (
  //         <div>
  //           <Status />
  //           <Logo />
  //           <Menu />
  //           <Scene />
  //         </div>
  //       )
  //     default:
  //       return Loading()
  //   }
  // }

  // function Box(props) {
  //   // This reference will give us direct access to the mesh
  //   const mesh = useRef()
  
  //   // Set up state for the hovered and active state
  //   const [hovered, setHover] = useState(false)
  //   const [active, setActive] = useState(false)
  
  //   // Rotate mesh every frame, this is outside of React without overhead
  //   useFrame(() => {
  //     mesh.current.rotation.x = mesh.current.rotation.y += 0.01
  //   })
  
  //   return (
  //     <mesh
  //       {...props}
  //       ref={mesh}
  //       scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
  //       onClick={(event) => setActive(!active)}
  //       onPointerOver={(event) => setHover(true)}
  //       onPointerOut={(event) => setHover(false)}>
  //       <boxBufferGeometry args={[1, 1, 1]} />
  //       <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
  //     </mesh>
  //   )
  // }

  // return render()
  
}