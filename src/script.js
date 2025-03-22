import * as THREE from 'three'



gsap.registerPlugin(ScrollTrigger);

function splitText(target) {
    let element = document.querySelector(target);
    let text = element.innerText;
    element.innerHTML = text
        .split("")
        .map(char => `<span class="char">${char}</span>`)
        .join(""); // Wrap each character in a span
}

splitText("#main-text");

const chars = document.querySelectorAll("#main-text .char");
const initialScrollIndicator = document.getElementById("scroll-indicator")

const scene1tl = gsap.timeline();

// GSAP animation for the manually split text
scene1tl.from(chars, {
    opacity: 0,
    y: 50,
    stagger: 0.05,
    ease: "power3.out",
    duration: 1.5
})

// Fade in the scroll indicator right after text animation
  .from(initialScrollIndicator, {
    opacity: 0,
    duration: 1
} , "-=1")


const scrollIndicatorTimeline = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });

scrollIndicatorTimeline.to(initialScrollIndicator, {
    y: 10, // Moves it down
    duration: 0.6,
    ease: "power1.inOut"
})
.to(initialScrollIndicator, {
    y: 0, // Moves it back up
    duration: 0.6,
    ease: "power1.inOut"
});


gsap.timeline({
    scrollTrigger: {
        trigger: "#scenes-wrapper",
        pin:true,
        start: "top top",
        end: "+=500px",
        scrub: true
    }
})
.to("#main-text, #scroll-indicator", {
    opacity: 0,
    scale: 1.2,
}, 0)
.to("#scene-2", {
    opacity: 1,
}, 0);




const nebulaScene = new THREE.Scene();
const nebulaSceneCamera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const nebulaSceneRenderer = new THREE.WebGLRenderer({ canvas: document.getElementById("nebula-canvas") });


nebulaSceneRenderer.setSize( window.innerWidth, window.innerHeight );
nebulaSceneRenderer.setAnimationLoop( animate );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );

nebulaScene.add( cube );

nebulaSceneCamera.position.z = 5;

function animate() {

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	nebulaSceneRenderer.render( nebulaScene, nebulaSceneCamera );

}
