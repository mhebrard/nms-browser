import React from 'react';
import {useRef, useEffect} from 'react'
import { useSelector } from 'react-redux';

import { getNodes, getLinks, getCategory, getScale } from './sceneSlice'
import ForceGraph3D from 'react-force-graph-3d'
import { COLORS } from '../../data/categories'
import { circle } from '../../data/assets'
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

  // Bloom Pass
  const Graph = () => {
    const ref = useRef();
    useEffect(() => {
      const bloomPass = new THREE.UnrealBloomPass();
      bloomPass.strength = 3;
      bloomPass.radius = 1;
      bloomPass.threshold = 0.1;
      ref.current.postProcessingComposer().addPass(bloomPass);
    },[])

    return <ForceGraph3D
      ref={ref}
      graphData={graphData}
      nodeThreeObject={n => objectHandler(n, {category, scale})}
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
