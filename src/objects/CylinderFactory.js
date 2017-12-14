// Import the three.js library and components needed
import * as THREE from 'three'

// Parent class
import MeshFactory from './MeshFactory'

/**
 * A class to build cylinder meshes for use with Three.js
 **/
class CylinderFactory extends MeshFactory {
  /**
   * Create a new cylinder Factory object that will use the given subdivision
   * parameter to generate unit cylinders centered at (0, 0, 0) aligned with Y.
   * @param {slices} number The number of subdivisions around the central axis.
   **/
  constructor (slices) {
    super()
    this._count++
    this._name = `Cylinder ${this._count}`
    this._slices = slices || 18
  }

  /**
   * Set the subdivisions around the outside of the cylinder.
   * @param {newVal} number The number of subdivisions around the central axis.
   **/
  set slices (newVal) {
    if (typeof newVal === 'number') {
      this._slices = newVal
    }
  }

  /**
   * Build and return a THREE.Geometry() object representing a cylinder.
   * @override
   **/
  makeObjectGeometry () {
    // A fresh, empty Geometry object that will hold the mesh geometry
    var cylGeom = new THREE.Geometry()

    // Store this._slices in a smaller named variable so this isn't such a mess
    let s = this._slices
    // Create our theta increment
    let theta = (2 * Math.PI) / s

    // Make top center vertex
    cylGeom.vertices.push(new THREE.Vector3(0.0, 1.0, 0.0))
    let norms = []
    norms.push(new THREE.Vector3(0.0, 1.0, 0.0))
    // create vertices for top circle
    for (let c = 0; c < s; c++) {
      cylGeom.vertices.push(new THREE.Vector3(Math.cos(c * theta), 1, Math.sin(c * theta)))
      norms.push(new THREE.Vector3(Math.cos(c * theta), 0, Math.sin(c * theta)))
    }
    // create vertices for bottom circle
    for (let c = 0; c < s; c++) {
      cylGeom.vertices.push(new THREE.Vector3(Math.cos(c * theta), -1, Math.sin(c * theta)))
      norms.push(new THREE.Vector3(Math.cos(c * theta), 0, Math.sin(c * theta)))
    }
    // create bottom center vertex
    cylGeom.vertices.push(new THREE.Vector3(0.0, -1.0, 0.0))
    norms.push(new THREE.Vector3(0.0, -1.0, 0.0))

    // create top face
    for (let c = 1; c <= s; c++) {
      let l = c % s + 1 // third vertex mod
      cylGeom.faces.push(new THREE.Face3(0, l, c, norms[0]))
    }
    // create middle cylinder bit
    for (let c = 1; c <= s; c++) {
      let l = c % s + 1 // 2nd vertex mod
      cylGeom.faces.push(new THREE.Face3(c + s, c, l, [norms[c + s], norms[c], norms[l]]))
      cylGeom.faces.push(new THREE.Face3(l, l + s, c + s, [norms[l], norms[l + s], norms[c + s]]))
    }
    // create bottom face
    let a = s * 2 - 1
    for (let c = 1; c <= s; c++) {
      let l = c % s + 1 // 3rd vertex mod
      cylGeom.faces.push(new THREE.Face3(a, c + s, l + s, norms[a]))
    }

    // Return finished geometry
    return cylGeom
  }
}

// Export the CylinderFactory class for use in other modules
export default CylinderFactory
