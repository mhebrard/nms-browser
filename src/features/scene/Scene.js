import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

import ForceGraph3D from 'react-force-graph-3d';

export function Scene() {
  const data = useSelector(graphData)
  return <ForceGraph3D graphData={data} />
}

export default Scene
