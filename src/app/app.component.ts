import { Component } from '@angular/core';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  ngAfterViewInit(): void {
    

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')
const addSphere = document.querySelector('a.addCircle')
const addCuboid = document.querySelector('a.addCube')
let ind=0
let planes=[]
let inds=0
let spheres=[]

// colorPicker


function dec2hex(i) {
  var result = "0x000000";
  if (i >= 0 && i <= 15) { result = "0x00000" + i.toString(16); }
  else if (i >= 16 && i <= 255) { result = "0x0000" + i.toString(16); }
  else if (i >= 256 && i <= 4095) { result = "0x000" + i.toString(16); }
  else if (i >= 4096 && i <= 65535) { result = "0x00" + i.toString(16); }
  else if (i >= 65535 && i <= 1048575) { result = "0x0" + i.toString(16); }
  else if (i >= 1048575 ) { result = '0x' + i.toString(16); }
if (result.length == 8){return result;}
 
}

// Add Data Components
function addCub(){
  const geometry = new THREE.BoxGeometry( 0.8,0.1,2.3);
    var material = new THREE.MeshBasicMaterial();
  planes[ind] = new THREE.Mesh(geometry,material)
  scene.add(planes[ind])
  var f=gui.addFolder('Cuboid '+(ind+1));
  var f1 = gui.addFolder('CSize'+(ind+1));
  f1.add(planes[ind].scale,'x').min(0).max(10)
  f1.add(planes[ind].scale,'y').min(0).max(10)
  f1.add(planes[ind].scale,'z').min(0).max(10)
  var f2=gui.addFolder('CPosition'+(ind+1));
  f2.add(planes[ind].position,'x').min(0).max(10)
  f2.add(planes[ind].position,'y').min(0).max(10)
  f2.add(planes[ind].position,'z').min(0).max(10)
  var f3 = gui.addFolder('CRotation'+(ind+1));
  f3.add(planes[ind].rotation,'x').min(0).max(10)
  f3.add(planes[ind].rotation,'y').min(0).max(10)
  f3.add(planes[ind].rotation,'z').min(0).max(10)
  gui.addColor( planes[ind].material, 'color') 
  ind=ind+1
}
addCuboid.addEventListener('click',addCub)

function addSph(){
  const geometry = new THREE.SphereGeometry( 1, 3, 2 );
  const material = new THREE.MeshBasicMaterial();
  spheres[inds] = new THREE.Mesh(geometry,material)
  scene.add(spheres[inds])
  var f=gui.addFolder('Sphere '+(inds+1));
  var f1 = gui.addFolder('SSize'+(inds+1));
  f1.add(spheres[inds].scale,'x').min(0).max(10)
  f1.add(spheres[inds].scale,'y').min(0).max(10)
  f1.add(spheres[inds].scale,'z').min(0).max(10)
  var f2=gui.addFolder('SPosition'+(inds+1));
  f2.add(spheres[inds].position,'x').min(0).max(10)
  f2.add(spheres[inds].position,'y').min(0).max(10)
  f2.add(spheres[inds].position,'z').min(0).max(10)
  var f3 = gui.addFolder('SRotation'+(inds+1));
  f3.add(spheres[inds].rotation,'x').min(0).max(10)
  f3.add(spheres[inds].rotation,'y').min(0).max(10)
  f3.add(spheres[inds].rotation,'z').min(0).max(10)
  gui.addColor( spheres[inds].material, 'color') 
  inds=inds+1
}
addSphere.addEventListener('click',addSph)




// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xcfcfcf)
// Objects
const geometry = new THREE.BoxGeometry( 3,0.01,2.3);

// Materials

const material = new THREE.MeshBasicMaterial()
material.color = new THREE.Color(0xffffff)

// Mesh
const plane = new THREE.Mesh(geometry,material)
scene.add(plane)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // plane.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
  }
}
