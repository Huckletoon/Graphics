// Import bootstrap's contents for webpack (not used below)
// These lines simply ensure that bootstrap is placed in the bundle files
// that are generated by webpack so we don't have to link them separately
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

// Import jQuery as the usual '$' variable
import $ from 'jquery'

// Import the three.js library
import Detector from 'three/examples/js/Detector'

// Import helpers
import MeshWidget from './helpers/MeshWidget'
import Interface from './interface'
import MeshFactory from './objects/MeshFactory'

let widget = null

// To run once after the DOM is fully loaded
$(document).ready(() => {
  // Make sure WebGL is supported
  if (!Detector.webgl) {
    console.log('adding message')
    Detector.addGetWebGLMessage({ parent: $('#GLWidget')[0] })
    return
  }

  // Initialize the widget
  widget = new MeshWidget($('#GLWidget')[0], MeshWidget.ControlTypes.DYNAMIC_ORBIT)

  // Put all the event listeners in place
  Interface.initialize()

  // Widget should resize any time window resizes
  window.addEventListener('resize', () => { widget.requestResize() }, false)

  // Pass references to widget to other classes
  Interface.widget = widget
  MeshFactory.widget = widget

  // Start the animation loop
  animate()
})

// Basic update/animate function (MeshWidget.render does all the work)
function animate () {
  widget.render()
  requestAnimationFrame(animate)
}
