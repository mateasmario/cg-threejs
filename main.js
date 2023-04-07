import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


camera.position.z = 0;

const loader = new GLTFLoader();

loader.load( 'models/mrkrabs/scene.gltf', function ( gltf ) {
    const model = gltf.scene;

    model.position.setX(0);
    model.position.setY(0);
    model.position.setZ(-1000);

	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );



const light = new THREE.DirectionalLight( 0xffffff, 3 ); // soft white light
light.position.setX(0);
light.position.setY(100);
light.position.setZ(1000);
scene.add( light );

function animate() {
	requestAnimationFrame( animate );

	renderer.render( scene, camera );
}

animate();