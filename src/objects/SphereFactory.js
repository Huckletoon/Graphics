// Import the three.js library and components needed
import * as THREE from 'three'

// Parent class
import MeshFactory from './MeshFactory'

/**
 * A class to build sphere meshes for use with Three.js
 **/
class SphereFactory extends MeshFactory {
  /**
   * Create a new sphere factory object that will use the given subdivision
   * parameters to generate unit spheres centered at (0, 0, 0).
   * @param {slices} number The number of subdivisions around the equator.
   * @param {stacks} number The number of subdivisions between the poles.
   **/
  constructor (slices, stacks) {
    super()
    this._count++
    this._name = `Sphere ${this._count}`
    this._slices = slices || 36
    this._stacks = stacks || 18
  }

  /**
   * Set the subdivisions around the equator of the sphere.
   * @param {newVal} number The number of subdivisions around the equator.
   **/
  set slices (newVal) {
    if (typeof newVal === 'number') {
      this._slices = newVal
    }
  }

  /**
   * Set the subdivisions between the poles of the sphere.
   * @param {newVal} number The number of subdivisions between the poles.
   **/
  set stacks (newVal) {
    if (typeof newVal === 'number') {
      this._stacks = newVal
    }
  }

  /**
   * Build and return a THREE.Geometry() object representing a sphere.
   * @override
   **/
  makeObjectGeometry () {
    // A fresh, empty Geometry object that will hold the mesh geometry
    var cylGeom = new THREE.Geometry()

    let sl = this._slices
    let st = this._stacks
    let theta = 2 * Math.PI / sl
    let phi = Math.PI / st

    // create top vertex
    cylGeom.vertices.push(new THREE.Vector3(0, 1, 0))
    let norms = []
    norms.push(new THREE.Vector3(0, 1, 0))

    // create sphere vertices
    for (let c = 1; c < st; c++) {
      let rad = Math.sin(c * phi)
      for (let d = 0; d < sl; d++) {
        let vert = new THREE.Vector3(rad * Math.sin(d * theta), Math.cos(c * phi), rad * Math.cos(d * theta))
        cylGeom.vertices.push(vert)
        norms.push(vert)
      }
    }

    // create bottom vertex
    cylGeom.vertices.push(new THREE.Vector3(0, -1, 0))
    norms.push(new THREE.Vector3(0, -1, 0))

    // connect faces for top stack
    for (let c = 1; c <= sl; c++) {
      let l = c % sl + 1 // third vertex mod
      cylGeom.faces.push(new THREE.Face3(0, c, l, [norms[0], norms[c], norms[l]]))
    }

    // connect faces for rest of sphere except last stack
    for (let c = 0; c < st - 2; c++) {
      for (let d = 1; d <= sl; d++) {
        let stackMod = c * sl
        let l = d % sl + 1
        cylGeom.faces.push(new THREE.Face3(stackMod + d, stackMod + d + sl, l + stackMod, [norms[stackMod + d], norms[stackMod + d + sl], norms[l + stackMod]]))
        cylGeom.faces.push(new THREE.Face3(l + stackMod, d + sl + stackMod, l + sl + stackMod, [norms[l + stackMod], norms[d + sl + stackMod], norms[l + sl + stackMod]]))
      }
    }

    // connect faces for last stack
    let a = cylGeom.vertices.length - 1
    for (let c = 1; c <= sl; c++) {
      let l = c % sl + 1 // third vertex mod
      cylGeom.faces.push(new THREE.Face3(a, a - c, a - l, [norms[a], norms[a - c], norms[a - l]]))
    }

    // Return finished geometry
    return cylGeom
  }
}

// Export the SphereFactory class for use in other modules
export default SphereFactory
