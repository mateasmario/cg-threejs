import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffddcc);
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


camera.position.z = 0;

const loader = new GLTFLoader();
let mixer;

loader.load( 'models/mrkrabs/scene.gltf', function ( gltf ) {
    const model = gltf.scene;
    const clips = gltf.animations;

    mixer = new THREE.AnimationMixer(model);
    const takeClip = THREE.AnimationClip.findByName(clips, 'Take 001');
    const takeAction = mixer.clipAction(takeClip);
    takeAction.play();

    model.position.setX(0);
    model.position.setY(-200);
    model.position.setZ(-750);

	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );


const light = new THREE.DirectionalLight( 0xffffff, 3 ); // soft white light

light.position.setX(0);
light.position.setY(100);
light.position.setZ(1000);
scene.add( light );

const clock = new THREE.Clock()


window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

function animate() {
	requestAnimationFrame( animate );

    if (mixer) {
        mixer.update(clock.getDelta());
    }

	render();
}

function render() {
    renderer.render(scene, camera)
}

animate();