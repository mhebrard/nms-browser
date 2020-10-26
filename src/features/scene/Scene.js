import React from 'react';
import {useRef, useEffect} from 'react'
import { useSelector } from 'react-redux';

import { getNodes, getLinks, getCategory, getScale } from './sceneSlice'
import ForceGraph3D from 'react-force-graph-3d'
import { COLORS } from '../../data/categories'
import { circle, reticule } from '../../data/assets'
import * as THREE from '../../three-bundle'

export function Scene() {
  const nodes = useSelector(getNodes)
  const links = useSelector(getLinks)
  const category = useSelector(getCategory)
  const scale = useSelector(getScale)

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
      // fgRef.current.d3Force('collision', d3.forceCollide(node => Math.sqrt(100 / (node.level + 1))));
      // Graph.d3Force('link').distance(d => d.distance)
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
      onNodeClick={n => onClickHandler(n, ref)}
      // onNodeHover={n => onHoverHandler(n, ref)}
    />
  }

  return <Graph/>
}

// Three: Object
function objectHandler(n, p) {
  // console.log('object', n)

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
function onClickHandler(n, ref) {
  console.log('click', n)
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
function onHoverHandler(n, ref) {
  // return document.querySelector('#chart').style.cursor = n ? 'pointer' : null
  if (n) {
    reticule.position.set(n.x,n.y,n.z) // new position
    reticule.lookAt(ref.current.camera().position) // LookAt
  }
}

// function labelHandler(n) {
//   // SSI, Original Name, PC Name, Star Type, Star Color, Race	Economy	Trade	Sell	Buy	Wealth	Wealth Rate	Conflict	Conflict Rate	Planets	Moons	Discovered by	Date	Dist. to Center	Coordinates	Glyphs	Position
//   return `
//     <div class='tronbox'>
//       ${n['PC Name']}<br/>
//       ${n['Star Type']}<br/>
//       ${n['Race']}
//     </div>
//   `
// }

    // Three: onHover
    // function onHoverHandler(n) {
    //   return document.querySelector('#chart').style.cursor = n ? 'pointer' : null
    // }

    // Three: onClick
    // function onClickHandler(n,e) {
    //   console.log('click',n,e)

    //   d3.select('#gaze')
    //     .datum(n)
    //     .style('left', `${e.clientX - 5}px`)
    //     .style('top', `${e.clientY - 5}px`)
    //     .style('opacity', 1)

    //   d3.select('#tip')
    //     .datum(n)
    //     .style('left', `${e.clientX + p.margin}px`)
    //     .style('top', `${e.clientY + p.margin}px`)
    //     .style('opacity', 1)
    //   d3.select('#system_name').datum(n)
    //     .text(d => d['PC Name'])
    //   d3.select('#system_content').datum(n)
    //     .html(d => `
    //       <label>Race: </label>${d['Race']}<br/>
    //       <label>Economy: </label>${d['Economy']}<br/>
    //       <label>Sell: </label>${d['Sell']} / <label>Buy: </label>${d['Buy']}<br/>
    //       <label>Wealth: </label>${d['Wealth']}<br/>
    //       <label>Conflict: </label>${d['Conflict']}<br/>
    //     `)
    // }

    // Three: plot data
    // function createGraph() {
    //   console.log('create graph...')
    //   return new Promise((resolve, reject) => {
    //     // Bloom renderer
    //     const bloomPass = new UnrealBloomPass();
    //     bloomPass.strength = p.bloomStrength;
    //     bloomPass.radius = p.bloomRadius;
    //     bloomPass.threshold = p.bloomThreshold;

    //     const Graph = ForceGraph3D()(document.querySelector('#chart'))
	  //       // .width(size)
    //       // .height(size)
    //       .nodeThreeObject(n => objectHandler(n))
    //       // .nodeColor(n => colorHandler(n))
    //       .nodeLabel('PC Name')
    //       .onNodeClick((n,e) => onClickHandler(n,e))
    //       .onNodeHover(n => onHoverHandler(n))
    //       // .linkVisibility(false)
    //       .graphData(v.data)
    //     Graph.postProcessingComposer().addPass(bloomPass)
    //     Graph.d3Force('link').distance(d => d.distance)

    //     resolve()
    //   })
    // }

export default Scene