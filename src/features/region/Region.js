import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ForceGraph3D from 'react-force-graph-3d'
import * as THREE from '../../three-bundle'
import * as d3 from '../../d3-bundle'
import { COLORS } from '../../data/categories'
import { getNeighbourRegionDistancesList, getNeighbourRegionSystemList, setSystems } from './regionSlice';
import { collapseMenu, getCategory, getRegionID } from '../menu/menuSlice';
import { circle } from '../../data/assets';
import { collapseTooltip, setNode } from '../tooltip/tooltipSlices'

export function Region() {
  const dispatch = useDispatch()
  // Get systems data
  // const systems = useSelector(getRegionSpecificSystemList)
  const systems = useSelector(getNeighbourRegionSystemList)
  const nodes = systems.map(d => { return {...d, id: d.glyphs}} )
  dispatch(setSystems(systems))
  // const distances = useSelector(getRegionSpecificDistancesList)
  const distances = useSelector(getNeighbourRegionDistancesList)
  const links = distances.map(d => { return {...d} })

  // console.log('distances', distances)
  const regionID = useSelector(getRegionID)
  const category = useSelector(getCategory)
  const scale = 10
  const distance = 120;
  
  // Create Object
  function objectHandler(n) {
    // console.log('objectHandler',n['PC']['Normal'].name, '-', n.region, '<>',region, '-', n.region === region ? n[category] || 'uncharted' : 'outRegion',)
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
        color: n.regionID === regionID ? COLORS[n[category]] || '#ffffff' : '#800080',
        map: circle
      }
    );
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(scale, scale);
    obj.add(sprite);
  
    return obj;
  }

  // Display tooltip
  function onClickHandler(n, ref) {
    // console.log('click on', n)
    // console.log('onClickHandler',n['PC']['Normal'].name, '-', n.region, '<>',region, '-', n.region === region ? COLORS[n[category]] || 'uncharted' : 'outRegion',)
    // console.log('camera', ref.current.cameraPosition())
    dispatch(setNode(systems.filter(d => d.glyphs === n.glyphs)[0]))
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
      // Bloom pass
      const bloomPass = new THREE.UnrealBloomPass();
      bloomPass.strength = 3;
      bloomPass.radius = 1;
      bloomPass.threshold = 0.1;
      ref.current.postProcessingComposer().addPass(bloomPass);

      // Force distance
      ref.current.d3Force('link').distance(n => n.distance);
      // Force region
      ref.current.d3Force('x', d3.forceX(n => n.cx*1000).strength(0.05));
      ref.current.d3Force('y', d3.forceY(n => n.cy*1000).strength(0.05));
      ref.current.d3Force('z', d3.forceZ(n => n.cz*1000).strength(0.05));

      // Init camera position
      ref.current.cameraPosition(
        { x: 0, y: 0, z: distance*scale }, // new position
        { x:0, y:0, z:0}, // lookAt ({ x, y, z })
        3000  // ms transition duration
      );
      
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
      nodeLabel={n => n.name || n.originalName || '[unknown]' }
      // onNodeHover={n => onHoverHandler(n, ref)}
      onNodeClick={n => onClickHandler(n, ref)}
      onNodeRightClick={n => onRightClickHandler(n, ref)}
      onBackgroundClick={() => {
        dispatch(collapseMenu());
        dispatch(collapseTooltip());
      } }
    />
  }

  return (
    <Graph/>
  )
}
