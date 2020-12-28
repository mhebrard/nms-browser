import * as THREE from '../three-bundle'

export const circle = new THREE.TextureLoader().load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/sprites/circle.png')
export const reticule = new THREE.Mesh(
  // RingGeometry(innerRadius, outerRadius, circleSegment, widthSegments, start, end)
  new THREE.RingGeometry(10, 12, 5, 1, 0, 2*Math.PI),
  new THREE.MeshBasicMaterial({color: '#FFFFFF', side: THREE.FrontSide})
)

export const CATALOGUE = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ0jFq80ut0o5jtApdhRG8sR2CIufVn0FNcugR_7fdCIfrDRfgB9s-SvEhBAePrQCibr1RcxFVoXj7o/pub?gid=0&single=true&output=tsv'
export const DISTANCES = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ0jFq80ut0o5jtApdhRG8sR2CIufVn0FNcugR_7fdCIfrDRfgB9s-SvEhBAePrQCibr1RcxFVoXj7o/pub?gid=1730024908&single=true&output=tsv'
