// Parent class
import MeshFactory from './MeshFactory'

// Base geometry factories
import CubeFactory from './CubeFactory'
import CylinderFactory from './CylinderFactory'
import SphereFactory from './SphereFactory'

/**
 * A class to build a representation of robitic skeletal bipedal character
 * for use with Three.js.  Do not call makeObjectGeometry() on this class
 * as it is left abstract. Use generateMesh() instead.
 **/
class HumanoidFactory extends MeshFactory {
  /**
   * Create a new humanoid factory object.
   **/
  constructor () {
    super()
    this._name = 'Humanoid'
  }

  /**
   * Build and return a THREE.Mesh() object representing a bipedal robot.
   * @override
   **/
  generateMesh () {
    // Empty root object for the entire humanoid character
    let root = MeshFactory.generateEmptyNode('Humanoid')

    // Create your makers
    let cubeMaker = new CubeFactory()
    let cylMaker = new CylinderFactory()
    let sphMaker = new SphereFactory()

    // make the torso and manipulate it
    let torso = cylMaker.generateMesh()
    torso.name = 'Torso'
    torso.transform.setScale(0.1, 0.6, 0.1)
    torso.transform.setPosition(0, 0.4, 0)
    torso = MeshFactory.isolateScale(torso)

    let neck = cylMaker.generateMesh()
    neck.name = 'Neck'
    neck.transform.setScale(0.1, 0.2, 0.1)
    neck.transform.setPosition(0, 0.75, 0)
    neck.transform.setPivot(0, -0.6, 0)
    neck = MeshFactory.isolateScale(neck)

    let head = sphMaker.generateMesh()
    head.name = 'Head'
    head.transform.setScale(0.2, 0.2, 0.2)
    head.transform.setPosition(0, 0.35, 0)
    head.transform.setPivot(0, -0.2, 0)
    head = MeshFactory.isolateScale(head)

    let shoulders = cylMaker.generateMesh()
    shoulders.name = 'Shoulders'
    shoulders.transform.setScale(0.1, 0.4, 0.1)
    shoulders.transform.setPosition(0, 0.55, 0)
    shoulders.transform.setPivot(0, -0.55, 0)
    shoulders.transform.setRotation(0, 0, Math.PI / 2)
    shoulders = MeshFactory.isolateScale(shoulders)

    let leftArm = cylMaker.generateMesh()
    leftArm.name = 'Left Arm'
    leftArm.transform.setScale(0.1, 0.5, 0.1)
    leftArm.transform.setPosition(-2.3, 2.4, 0)
    leftArm.transform.setPivot(0, -1.9, 0)
    leftArm.transform.setRotation(0, 0, Math.PI / 2)
    leftArm = MeshFactory.isolateScale(leftArm)

    let rightArm = cylMaker.generateMesh()
    rightArm.name = 'Right Arm'
    rightArm.transform.setScale(0.1, 0.5, 0.1)
    rightArm.transform.setPosition(-1.5, 2.4, 0)
    rightArm.transform.setPivot(0, -1.9, 0)
    rightArm.transform.setRotation(0, 0, Math.PI / 2)
    rightArm = MeshFactory.isolateScale(rightArm)

    let leftHand = sphMaker.generateMesh()
    leftHand.name = 'Left Hand'
    leftHand.transform.setScale(0.15, 0.15, 0.15)
    leftHand.transform.setPosition(0, 0.6, 0)
    leftHand.transform.setPivot(0, -0.5, 0)
    leftHand = MeshFactory.isolateScale(leftHand)

    let rightHand = sphMaker.generateMesh()
    rightHand.name = 'Right Hand'
    rightHand.transform.setScale(0.15, 0.15, 0.15)
    rightHand.transform.setPosition(0, 0.6, 0)
    rightHand.transform.setPivot(0, -0.5, 0)
    rightHand = MeshFactory.isolateScale(rightHand)

    let hips = cylMaker.generateMesh()
    hips.name = 'Hips'
    hips.transform.setScale(0.1, 0.2, 0.1)
    hips.transform.setPosition(0, -0.55, 0)
    hips.transform.setPivot(0, 0.55, 0)
    hips.transform.setRotation(0, 0, Math.PI / 2)
    hips = MeshFactory.isolateScale(hips)

    let rightLeg = cylMaker.generateMesh()
    rightLeg.name = 'Right Leg'
    rightLeg.transform.setScale(0.1, 0.375, 0.1)
    rightLeg.transform.setPosition(-2.1, 2.275, 0)
    rightLeg.transform.setPivot(0, -1.9, 0)
    rightLeg.transform.setRotation(0, 0, Math.PI / 2)
    rightLeg = MeshFactory.isolateScale(rightLeg)

    let leftLeg = cylMaker.generateMesh()
    leftLeg.name = 'Left Leg'
    leftLeg.transform.setScale(0.1, 0.375, 0.1)
    leftLeg.transform.setPosition(-1.7, 2.275, 0)
    leftLeg.transform.setPivot(0, -1.9, 0)
    leftLeg.transform.setRotation(0, 0, Math.PI / 2)
    leftLeg = MeshFactory.isolateScale(leftLeg)

    let rightFoot = cubeMaker.generateMesh()
    rightFoot.name = 'Right Foot'
    rightFoot.transform.setScale(0.15, 0.075, 0.225)
    rightFoot.transform.setPosition(0, 0.45, -0.1)
    rightFoot.transform.setPivot(0, -0.6, -0.7)
    rightFoot = MeshFactory.isolateScale(rightFoot)

    let leftFoot = cubeMaker.generateMesh()
    leftFoot.name = 'Left Foot'
    leftFoot.transform.setScale(0.15, 0.075, 0.225)
    leftFoot.transform.setPosition(0, 0.45, -0.1)
    leftFoot.transform.setPivot(0, -0.6, -0.7)
    leftFoot = MeshFactory.isolateScale(leftFoot)

    hips.add(leftLeg)
    hips.add(rightLeg)
    leftLeg.add(leftFoot)
    rightLeg.add(rightFoot)
    torso.add(hips)
    rightArm.add(rightHand)
    leftArm.add(leftHand)
    shoulders.add(rightArm)
    shoulders.add(leftArm)
    neck.add(head)
    torso.add(neck)
    torso.add(shoulders)
    root.add(torso)

    // Return the completed mesh
    return root
  }
}

// Export the HumanoidFactory class for use in other modules
export default HumanoidFactory
