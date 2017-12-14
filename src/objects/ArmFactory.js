// Import the three.js library and components needed
import * as THREE from 'three'

// Parent class
import MeshFactory from './MeshFactory'

class ArmFactory extends MeshFactory {
  constructor (stacks, slices, width, height) {
    super()
    this._count++
    this._name = `Arm ${this._count}`
    this._stacks = stacks || 36
    this._slices = slices || 20
    this.width = width || 22
    this.height = height || 28
  }

  /**
   * Build and return a THREE.Geometry() object representing an arm from the bell monument
   * @override
   **/
  makeObjectGeometry () {
    let arm = new THREE.Geometry()
    let st = this._stacks
    let sl = this._slices
    let w = this.width
    let h = this.height
    let norms = []

    // make the vertices for the arm
    // Make end face
    arm.vertices.push(new THREE.Vector3(w, 0, 0))
    norms.push(new THREE.Vector3(0, -1, 0))
    // Utilize the parametric equation for a torus, but modify it to make an ellipsoid torus instead of circular
    let phi = Math.PI / 2 / st
    let theta = 2 * Math.PI / sl
    for (let c = 0; c < st; c++) {
      for (let d = 0; d < sl; d++) {
        let vert3 = new THREE.Vector3(Math.cos(phi * c) * (w + Math.cos(d * theta)), Math.sin(phi * c) * (h + Math.cos(d * theta)), Math.sin(d * theta))
        arm.vertices.push(vert3)
        let vertNorm = new THREE.Vector3()
        vertNorm.copy(vert3)
        norms.push(vertNorm.normalize())
      }
    }

    // connect the faces for the arm
    // Start with the end faces
    for (let c = 1; c <= sl; c++) {
      let l = c % sl + 1 // third vertex mod
      arm.faces.push(new THREE.Face3(0, c, l, norms[0]))
    }
    // do all the other faces
    for (let c = 0; c < st - 1; c++) {
      for (let d = 1; d <= sl; d++) {
        let stackMod = c * sl
        let l = d % sl + 1
        arm.faces.push(new THREE.Face3(d + stackMod, stackMod + d + sl, l + stackMod, [norms[stackMod + d], norms[stackMod + d + sl], norms[l + stackMod]]))
        arm.faces.push(new THREE.Face3(l + stackMod, d + sl + stackMod, l + sl + stackMod, [norms[l + stackMod], norms[d + sl + stackMod], norms[l + sl + stackMod]]))
      }
    }

    // Return the finished geometry
    return arm
  }
}

export default ArmFactory
