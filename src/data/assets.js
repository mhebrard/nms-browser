import * as THREE from '../three-bundle'

export const circle = new THREE.TextureLoader().load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/sprites/circle.png')
export const reticule = new THREE.Mesh(
  // RingGeometry(innerRadius, outerRadius, circleSegment, widthSegments, start, end)
  new THREE.RingGeometry(10, 12, 5, 1, 0, 2*Math.PI),
  new THREE.MeshBasicMaterial({color: '#FFFFFF', side: THREE.FrontSide})
)