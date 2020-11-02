import React from 'react';
import {useRef, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { getNodes, getLinks, getCategory, getScale } from './sceneSlice'
import styles from './Scene.module.css';
import { setVisibility, setPosition } from '../tooltip/tooltipSlices'
import ForceGraph3D from 'react-force-graph-3d'
import { COLORS } from '../../data/categories'
import { circle, reticule } from '../../data/assets'
import * as THREE from '../../three-bundle'
import { Vector3 } from 'three';

export function Scene() {
  const nodes = useSelector(getNodes)
  const links = useSelector(getLinks)
  const category = useSelector(getCategory)
  const scale = useSelector(getScale)
  const dispatch = useDispatch()

  // Copy data for graph
  const graphData = {
    nodes: nodes.map(e => { return {...e} }),
    links: links.map(e => { return {...e} })
  }

  // Effects
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

      // Add
      // ref.current.scene().add(reticule)
    },[])

    return <ForceGraph3D
      ref={ref}
      graphData={graphData}
      nodeThreeObject={n => objectHandler(n, {category, scale})}
      enableNodeDrag={false}
      linkVisibility={false}
      nodeLabel={n => n['PC Name'] ? n['PC Name'] : n['Original Name']}
      onNodeClick={(n, e) => onClickHandler(n, e, ref)}
      onNodeHover={n => onHoverHandler(n, ref, dispatch)}
    />
  }

  return <Graph/>
}

// Three: Object
function objectHandler(n, p) {
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
      color: COLORS[n[p.category]],
      map: circle
    }
  );
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(p.scale, p.scale);
  obj.add(sprite);

  return obj;
}

// Three: onClick
function onClickHandler(n, e, ref) {
  // Aim at node from outside it
  const distance = 120;
  const distRatio = 1 + distance/Math.hypot(n.x, n.y, n.z);

  ref.current.cameraPosition(
    { x: n.x * distRatio, y: n.y * distRatio, z: n.z * distRatio }, // new position
    n, // lookAt ({ x, y, z })
    3000  // ms transition duration
  );
}

// Three: onHover
function onHoverHandler(n, ref, dispatch) {
  if (n) {
    const vector = new Vector3(n.x,n.y,n.z)
    const canvas = ref.current.renderer().domElement
    vector.project(ref.current.camera())
    vector.x = Math.round((0.5 + vector.x / 2) * (canvas.width / window.devicePixelRatio));
    vector.y = Math.round((0.5 - vector.y / 2) * (canvas.height / window.devicePixelRatio));
    dispatch(setPosition({x:vector.x, y:vector.y}))
  }
  dispatch(setVisibility( n ? true : false))  
}

export default Scene
