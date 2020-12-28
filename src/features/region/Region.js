import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ForceGraph3D from 'react-force-graph-3d'
import * as THREE from '../../three-bundle'
import { COLORS } from '../../data/categories'
import { getRegionSpecificDistancesList, getRegionSpecificSystemList } from './regionSlice';
import { getCategory } from '../menu/menuSlice';
import { circle } from '../../data/assets';
import { setVisibility, setPosition, setNode } from '../tooltip/tooltipSlices'

export function Region() {
  // Get systems data
  const systems = useSelector(getRegionSpecificSystemList)
  const nodes = systems.map(d => { return {...d, id: d.ssi}} )
  const distances = useSelector(getRegionSpecificDistancesList)
  const links = distances.map(d => { return {...d} })
  const category = useSelector(getCategory) // from scene 
  const scale = 10
  const dispatch = useDispatch()
  
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
        color: COLORS[n[category]],
        map: circle
      }
    );
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(scale, scale);
    obj.add(sprite);
  
    return obj;
  }
  
  function onClickHandler(n, ref) {
    // Aim at node from outside it
    const distance = 120;
    const distRatio = 1 + distance/Math.hypot(n.x, n.y, n.z);
  
    ref.current.cameraPosition(
      { x: n.x * distRatio, y: n.y * distRatio, z: n.z * distRatio }, // new position
      n, // lookAt ({ x, y, z })
      3000  // ms transition duration
    );
  }

  function onHoverHandler(n, ref) {
    if (n) {
      const vector = new THREE.Vector3(n.x,n.y,n.z)
      const canvas = ref.current.renderer().domElement
      vector.project(ref.current.camera())
      vector.x = Math.round((0.5 + vector.x / 2) * (canvas.width / window.devicePixelRatio));
      vector.y = Math.round((0.5 - vector.y / 2) * (canvas.height / window.devicePixelRatio));
      dispatch(setPosition({x:vector.x, y:vector.y}))
      dispatch(setNode(systems.filter(d => d.ssi === n.ssi)[0]))
    }
    dispatch(setVisibility(n ? true : false))  
  }

  // Graph
  const Graph = () => {
    const ref = useRef();
    useEffect(() => {
      // Bloom pass
      const bloomPass = new THREE.UnrealBloomPass();
      bloomPass.strength = 3;
      bloomPass.radius = 1;
      bloomPass.threshold = 0.1;
      ref.current.postProcessingComposer().addPass(bloomPass);

      // Force distance
      ref.current.d3Force('link').distance(n => n.distance);
    }, [])

    return <ForceGraph3D
      ref={ref}
      graphData={{
        nodes: nodes,
        links: links
      }}
      nodeThreeObject={n => objectHandler(n)}
      enableNodeDrag={false}
      linkVisibility={true}
      // nodeLabel={n => n.systemName}
      onNodeClick={n => onClickHandler(n, ref)}
      onNodeHover={n => onHoverHandler(n, ref)}
    />
  }

  return (
    <Graph/>
  )
}
