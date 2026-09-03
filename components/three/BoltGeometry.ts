import * as THREE from "three";

// Classic lightning-bolt silhouette, traced as a closed polygon and extruded
// with a bevel for a faceted, chrome-cut look (echoes the logo's crossed bolts
// without literally reproducing the artwork).
const BOLT_POINTS: [number, number][] = [
  [0.42, 1.05],
  [-0.5, 0.05],
  [0.02, 0.05],
  [-0.4, -1.05],
  [0.5, -0.02],
  [0.02, -0.02],
];

export function createBoltGeometry(): THREE.ExtrudeGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(BOLT_POINTS[0][0], BOLT_POINTS[0][1]);
  for (let i = 1; i < BOLT_POINTS.length; i += 1) {
    shape.lineTo(BOLT_POINTS[i][0], BOLT_POINTS[i][1]);
  }
  shape.closePath();

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.22,
    bevelEnabled: true,
    bevelThickness: 0.045,
    bevelSize: 0.045,
    bevelSegments: 3,
    curveSegments: 1,
  });
  geometry.center();
  return geometry;
}
