import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader, HDRLoader } from "three/examples/jsm/Addons.js";

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//scene
const scene = new THREE.Scene();


//texture loader color
const textureLoader = new THREE.TextureLoader();
const hemisphere = textureLoader.load("src/assets/3dmodel/webgl_animation_skinning_morph.jpg")
const material = new THREE.MeshStandardMaterial({
    map: hemisphere
});

const hdrLoader = new HDRLoader()
hdrLoader.load("src/assets/3dmodel/environment.hdr",(env)=>{
  console.log(env)
  env.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = env
  scene.environment = env
})

let mixer;
const gltfLoader = new GLTFLoader();
gltfLoader.load(
  "src/assets/3dmodel/RobotExpressive.glb",
  (glb) => {
    const modal = glb.scene;
    if(!modal) return
    modal.rotation.x =  Math.PI / 12
    modal.position.y =  -5
    modal.position.z =  -5

    scene.add(modal);
    if(glb.animations && glb.animations.length>0){
        mixer = new THREE.AnimationMixer(modal)
        const action = mixer.clipAction(glb.animations[6])
        action.play()
    }
  },
  () => {
    // console.log("modal is loading");
  },
  (error) => {
    console.log("error", error);
  },
);

const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(2, 2, 3);

scene.add(directionalLight);


//camera
const camera = new THREE.PerspectiveCamera(
  75,
  size.width / size.height,
  0.1,
  100,
);
camera.position.z = 7
camera.position.y = 0
camera.position.x = 0



//renderer
const canvas = document.querySelector("#webgl");
const renderer = new THREE.WebGLRenderer({ canvas });

//controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.01;

renderer.setSize(size.width, size.height);

//to make the object responsive
window.addEventListener("resize", () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;
  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix(); //to update the camera aspect
  renderer.setSize(size.width, size.height);
});

const timer = new THREE.Timer()
function animate() {
    timer.update()
  const delta = timer.getDelta()
  controls.update();
  if(mixer){
    mixer.update(delta)
  }
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
