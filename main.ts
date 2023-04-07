import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffddcc);
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


camera.position.z = 100;

const loader = new GLTFLoader();
let mixer;
let model;

loader.load( 'models/mrkrabs/scene.gltf', function ( gltf ) {
    model = gltf.scene;
    const clips = gltf.animations;

    mixer = new THREE.AnimationMixer(model);
    const takeClip = THREE.AnimationClip.findByName(clips, 'Take 001');
    const takeAction = mixer.clipAction(takeClip);
    takeAction.play();

    model.position.setX(0);
    model.position.setY(-400);
    model.position.setZ(-750);

	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );


const light = new THREE.DirectionalLight( 0xffffff, 3.5 ); // soft white light

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

let rotationDirection = "right";
let positionX = 0;

// create an AudioListener and add it to the camera
const listener = new THREE.AudioListener();
camera.add( listener );

// create a global audio source
const sound = new THREE.Audio( listener );

// Song
const audioLoader = new THREE.AudioLoader();
audioLoader.load( 'audio/out_of_your_mind.mp3', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setLoop( true );
	sound.setVolume( 0.5 );
	sound.play();
});

// Keydown controls
function setupKeyControls() {
    // var krabs = scene.getObjects();
    document.onkeydown = function(e) {
        switch(e.keyCode) {
            case 38: // Up Arrow Key
                break;
            case 40: // Down Arrow Key
                break;
            case 37: // Left Arrow Key
                if (positionX > -500) {
                    positionX -= 10;
                    model.position.setX(positionX);
                }
                break
            case 39: // Right Arrow Key
                if (positionX < 500) {
                    positionX += 10;
                    model.position.setX(positionX);
                }
                break;
        }
    }
}

function animate() {
	requestAnimationFrame( animate );
    
    if (model) {
        if (model.rotation.y >= 0.5) {
            rotationDirection = "left";
        }
        else if (model.rotation.y <= -0.5) {
            rotationDirection = "right";
        }

        if (rotationDirection == "right") {
            model.rotation.y += 0.015;
        }
        else {
            model.rotation.y -= 0.015;
        }
        
    }

    if (mixer) {
        mixer.update(clock.getDelta());
    }

    setupKeyControls();

	render();
}

function render() {
    renderer.render(scene, camera)
}

animate();