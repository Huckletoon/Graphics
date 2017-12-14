// Parent class
import MeshFactory from './MeshFactory'

// Base geometry factories
import CubeFactory from './CubeFactory'
import CylinderFactory from './CylinderFactory'
import ArmFactory from './ArmFactory'

/**
 * A class to build a representation of the UW Stout Bell monument
 * for use with Three.js.  Do not call makeObjectGeometry() on this
 * class as it is left abstract. Use generateMesh() instead.
 **/
class SculptureFactory extends MeshFactory {
  /**
   * Create a new sculpture factory object.
   **/
  constructor () {
    super()
    this._name = 'Sculpture'
  }

  /**
   * Build and return a THREE.Mesh() object representing the Stout Bell Monument.
   * @override
   **/
  generateMesh () {
    // Empty root object for the entire bell sculpture
    let root = MeshFactory.generateEmptyNode('Sculpture')

    // make factories
    let cylMaker = new CylinderFactory(30)
    let holdMaker = new CylinderFactory(8)
    let armMaker = new ArmFactory()

    // make the base platform and add it to the root
    let platform = cylMaker.generateMesh()
    platform.name = 'Platform'
    platform.transform.setScale(2.5, 0.1, 2.5)
    platform.transform.setPosition(0, -10, 0)
    root.add(platform)

    // make 4 benches, move 'em and rotate 'em, add 'em to the root
    let benches = MeshFactory.generateEmptyNode('benches')
    let bench0 = this.makeBench()
    let bench1 = this.makeBench()
    let bench2 = this.makeBench()
    let bench3 = this.makeBench()
    bench0.transform.setRotation(0, 0.5 * Math.PI, 0)
    bench1.transform.setRotation(0, 0.5 * Math.PI, 0)
    bench0.transform.setPosition(0, -0.8, 2)
    bench1.transform.setPosition(0, -0.8, -2)
    bench2.transform.setPosition(0, -0.8, -2)
    bench3.transform.setPosition(0, -0.8, 2)
    benches.add(bench0)
    benches.add(bench1)
    benches.add(bench2)
    benches.add(bench3)
    root.add(benches)

    // make 4 arms, move 'em and rotate 'em, add 'em to the root
    let arms = MeshFactory.generateEmptyNode('arms')
    let arm0 = armMaker.generateMesh()
    let arm1 = armMaker.generateMesh()
    let arm2 = armMaker.generateMesh()
    let arm3 = armMaker.generateMesh()
    arm0.transform.setScale(0.1, 0.1, 0.1)
    arm1.transform.setScale(0.1, 0.1, 0.1)
    arm2.transform.setScale(0.1, 0.1, 0.1)
    arm3.transform.setScale(0.1, 0.1, 0.1)
    let neg = 0.25 * Math.PI
    arm0.transform.setRotation(0, 0.5 * Math.PI - neg, 0)
    arm1.transform.setRotation(0, Math.PI - neg, 0)
    arm2.transform.setRotation(0, 1.5 * Math.PI - neg, 0)
    arm3.transform.setRotation(0, 2 * Math.PI - neg, 0)
    arms.transform.setPosition(0, -0.9, 0)
    arms.add(arm0)
    arms.add(arm1)
    arms.add(arm2)
    arms.add(arm3)
    root.add(arms)

    // Make the thing that holds the bell.
    let holder = holdMaker.generateMesh()
    holder.transform.setScale(0.3, 0.2, 0.3)
    holder.transform.setRotation(0, 25 * Math.PI / 180, 0)
    holder.transform.setPosition(0, 9.3, 0)
    holder.name = 'Bell Holder thing'
    root.add(holder)

    // Make the damn bell
    let bell = MeshFactory.generateEmptyNode('bell')
    let parts = []
    for (let c = 0; c < 12; c++) {
      parts.push(cylMaker.generateMesh())
      parts[c].transform.setScale(0.5, 0.1, 0.5)
      bell.add(parts[c])
    }
    // set the size for all these pieces
    parts[0].transform.setScale(0.1, 0.1, 0.1)
    parts[1].transform.setScale(0.26, 0.1, 0.26)
    parts[2].transform.setScale(0.28, 0.1, 0.28)
    parts[3].transform.setScale(0.285, 0.1, 0.285)
    parts[4].transform.setScale(0.29, 0.1, 0.29)
    parts[5].transform.setScale(0.3, 0.1, 0.3)
    parts[6].transform.setScale(0.31, 0.1, 0.31)
    parts[7].transform.setScale(0.325, 0.1, 0.325)
    parts[8].transform.setScale(0.34, 0.1, 0.34)
    parts[9].transform.setScale(0.37, 0.1, 0.37)
    parts[10].transform.setScale(0.41, 0.1, 0.41)
    parts[11].transform.setScale(0.46, 0.1, 0.46)
    // move those things into place
    parts[0].transform.setPosition(0, 16, 0)
    parts[1].transform.setPosition(0, 15, 0)
    parts[2].transform.setPosition(0, 14.5, 0)
    parts[3].transform.setPosition(0, 14, 0)
    parts[4].transform.setPosition(0, 13.5, 0)
    parts[5].transform.setPosition(0, 13, 0)
    parts[6].transform.setPosition(0, 12.5, 0)
    parts[7].transform.setPosition(0, 12, 0)
    parts[8].transform.setPosition(0, 11.5, 0)
    parts[9].transform.setPosition(0, 11, 0)
    parts[10].transform.setPosition(0, 10.5, 0)
    parts[11].transform.setPosition(0, 10, 0)
    // Add to the root. I could have used a for loop for these two but, meh
    root.add(bell)

    // Return finished geometry
    return root
  }

  // Helper function that creates a bench at the origin
  makeBench () {
    // set up 'root' and factory
    let bench = MeshFactory.generateEmptyNode('bench')
    let cubeMaker = new CubeFactory()

    // make bench legs
    let leg0 = cubeMaker.generateMesh()
    let leg1 = cubeMaker.generateMesh()
    leg0.name = 'leg0'
    leg1.name = 'leg1'
    leg0.transform.setScale(0.08, 0.1, 0.08)
    leg1.transform.setScale(0.08, 0.1, 0.08)
    leg0.transform.setPosition(4, 0, 0)
    leg1.transform.setPosition(-4, 0, 0)

    // make bench seat
    let seat = cubeMaker.generateMesh()
    seat.name = 'seat'
    seat.transform.setScale(0.5, 0.05, 0.15)
    seat.transform.setPosition(0, 2.5, 0)

    // add everything to the root object, set the transform, and return it
    bench.transform.setPosition(0, -0.8, 0)
    bench.add(leg0)
    bench.add(leg1)
    bench.add(seat)
    return bench
  }
}

export default SculptureFactory
