import React, { useEffect, useRef }from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ForceGraph3D from 'react-force-graph-3d'
import * as THREE from '../../three-bundle'
import { circle } from '../../data/assets';

import { getRegionClusters } from './galaxySlice';
import { collapseInfo, setNode } from '../galaxyinfo/GalaxyInfoSlice';
import { collapseMenu } from '../menu/menuSlice';

// Ploting every region with sprite scale = 10 required coord factor = 10 
// as a consequence the galaxy is too large and cannot be display on the screen

export function Galaxy() {
  const dispatch = useDispatch()
  const clusters = useSelector(getRegionClusters)
  const scale = 10
  const distance = 120
  
  // Scale the coordinates
  const nodes = clusters.map(d => { return {...d, fx: d.x*scale, fy: d.y*scale, fz: d.z*scale, size: 1}} )
  // Fix galaxy center size
  const center = nodes.filter(n => n.name.startsWith('Galaxy'))[0]
  center.size = 3

  // console.log('Galaxy / nodes:', nodes)

  const links = []
  
  // Create Object
  function objectHandler(n) {
    // use a sphere as a drag handle
    const obj = new THREE.Mesh(
        new THREE.SphereGeometry(7),
        new THREE.MeshBasicMaterial({
          depthWrite: false,
          transparent: true,
          opacity: 0
        })
      );
  
    // add img sprite as child
    const material = new THREE.SpriteMaterial(
      { 
        color: n.color || '#ffffff',
        map: circle
      }
    );
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(n.size * scale, n.size * scale);
    obj.add(sprite);
  
    return obj;
  }

  function onClickHandler(n, ref) {
    // console.log('onClick:', n)
    // Display info
    dispatch(setNode(clusters.filter(d => d.id === n.id)[0]))
  }

   // Move toward node
   function onRightClickHandler(n, ref) {
    // console.log('onRightClickHandler')

    // Aim at node from outside it
    const distRatio = 1 + distance/Math.hypot(n.x, n.y, n.z);
  
    ref.current.cameraPosition(
      { x: n.x * distRatio, y: n.y * distRatio, z: n.z * distRatio }, // new position
      n, // lookAt ({ x, y, z })
      3000  // ms transition duration
    );
  }


  // Graph
  const Graph = () => {
    const ref = useRef();
    useEffect(() => {
      // // Bloom pass
      const bloomPass = new THREE.UnrealBloomPass();
      bloomPass.strength = 3;
      bloomPass.radius = 1;
      bloomPass.threshold = 0.1;
      ref.current.postProcessingComposer().addPass(bloomPass);

      // Forces
      // NA

      // Init camera position
      ref.current.cameraPosition(
        { x: center.fx, y: center.fx, z: center.fz }, // new position
        { x: center.fx, y: center.fy, z: center.fz}, // lookAt ({ x, y, z })
        3000  // ms transition duration
      );
      
    }, [])

    return <ForceGraph3D
      ref={ref}
      graphData={{
        nodes: nodes,
        links: links
      }}
      // autoPauseRedraw={false}
      nodeThreeObject={n => objectHandler(n)}
      enableNodeDrag={false}
      nodeLabel={n => n.name || '[unknown]'}
      onNodeClick={n => onClickHandler(n, ref)}
      onNodeRightClick={n => onRightClickHandler(n, ref)}
      onBackgroundClick={() => {
        dispatch(collapseMenu());
        dispatch(collapseInfo());
      } }
    />
  }

  return (
    <Graph/>
  )
}
