import './style.css'
import * as THREE from "three"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const size = {
    width: window.innerWidth,
    height: window.innerHeight
}
//scene
const scene = new THREE.Scene()
//3d object
//cube
// const geometry = new THREE.BoxGeometry(1,1,1)
// const material = new THREE.MeshBasicMaterial({color: 0xdadada, wireframe: true})
// const cube = new THREE.Mesh(geometry, material)
// scene.add(cube)

//sphere
const geometry = new THREE.SphereGeometry( 4, 12, 12 );
const material = new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe: true } );
const sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );

// const clock = new THREE.Clock()
const timer = new THREE.Timer()
//camera
const camera = new THREE.PerspectiveCamera(75, size.width / size.height, 0.1, 100)
// const camera = new THREE.OrthographicCamera(-2, 2, 2, -2, 0.1, 100)
camera.position.z = 20;
// camera.lookAt(0,0,0)
//renderer
const canvas = document.querySelector("#webgl")

const renderer = new THREE.WebGLRenderer({canvas})

//controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true;
controls.dampingFactor = 0.01;

renderer.setSize(size.width, size.height)

//to make the object responsive
window.addEventListener("resize", ()=>{
    size.width = window.innerWidth;
    size.height = window.innerHeight;
    camera.aspect = size.width / size.height
    camera.updateProjectionMatrix() //to update the camera aspect
    renderer.setSize(size.width, size.height)
})

function animate() {
    // const delta = clock.getElapsedTime()
    // const delta = timer.getDelta()
    // timer.update()
    controls.update();
    // cube.rotation.y += 0.01;
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}

animate()