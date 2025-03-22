import * as THREE from 'three'



gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollSmoother);

ScrollSmoother.create({
    smooth: 1,
    effects:true
})

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
        trigger: "#initial-scenes-wrapper",
        pin:true,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        
    }
})
.to("#scene-1", {
    opacity: 0,
    scale: 1.2,
}, 0)
.to("#scene-2", {
    opacity: 1,
}, 0);




const nebulaScene = new THREE.Scene();
const nebulaSceneCamera = new THREE.PerspectiveCamera( 75, window.innerWidth / (window.innerHeight), 0.3 , 1000 );

const nebulaSceneRenderer = new THREE.WebGLRenderer({ canvas: document.getElementById("nebula-canvas") });


nebulaSceneRenderer.setSize( window.innerWidth, window.innerHeight);
nebulaSceneRenderer.setAnimationLoop( nebulaSceneAnimate );



const particleCount = 5000;
const nebulaGroup = new THREE.Group(); // Group for better control

for (let i = 0; i < particleCount; i++) {
    // Create a small sphere
    const particleGeometry = new THREE.SphereGeometry(0.005, 10, 10); // Tiny spheres
    const particleMaterial = new THREE.MeshStandardMaterial({
        emissive: new THREE.Color(0xAA5533), // Warm reddish-brown glow
        emissiveIntensity: 0.9, // Slightly stronger glow for effect
        color: 0x442211, // Darker reddish-brown base
        transparent: true,
        opacity: 0.8
    });

    const particle = new THREE.Mesh(particleGeometry, particleMaterial);

    
    particle.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
    );

    nebulaGroup.add(particle);
}

nebulaScene.add(nebulaGroup);


const light = new THREE.PointLight(0xFFAA88, 2, 20); // Warm orange glow
light.position.set(0, 0, 4);
nebulaScene.add(light);

nebulaSceneCamera.position.z = 1;


let nebulaRotationSpeed = {
    x : 0.001,
    y : 0.0007,
    z : 0,
}

function nebulaSceneAnimate() {

    // Rotate slowly
    nebulaGroup.rotation.y += nebulaRotationSpeed.y;
    nebulaGroup.rotation.x += nebulaRotationSpeed.x;
    nebulaGroup.rotation.z += nebulaRotationSpeed.z;

	nebulaSceneRenderer.render( nebulaScene, nebulaSceneCamera );

}

splitText("#scene-3 > #scene3-texts > .text1")
splitText("#scene-3 > #scene3-texts > .text2")
const scene3Chars1 = document.querySelectorAll("#scene-3 > #scene3-texts > .text1 > .char")
const scene3Chars2 = document.querySelectorAll("#scene-3 > #scene3-texts > .text2 > .char")
console.log(scene3Chars1)
console.log(scene3Chars2)

gsap.timeline({
    scrollTrigger: {
        trigger: "#scene-3",
        start: "top 50%",
        end: "bottom bottom",
        pin: true,
        scrub: 2,    
    }

}).from(scene3Chars1, {
    opacity: 0,
    y: 50,
    stagger: 0.05,
    ease: "power3.out",
    duration: 1.5
}).from(scene3Chars2, {
    opacity: 0,
    y: 50,
    stagger: 0.05,
    ease: "power3.out",
    duration: 1.5
})



const starScene = new THREE.Scene();
const starSceneCamera = new THREE.PerspectiveCamera( 75, window.innerWidth / (window.innerHeight), 0.3 , 1000 );

const starSceneRenderer = new THREE.WebGLRenderer({ canvas: document.getElementById("scene3-canvas") });

starSceneRenderer.setSize( window.innerWidth, window.innerHeight);
starSceneRenderer.setAnimationLoop( starSceneAnimate );





const StarSceneNebulaGroup = new THREE.Group(); // Group for better control

for (let i = 0; i < particleCount; i++) {
    // Create a small sphere
    const particleGeometry = new THREE.SphereGeometry(0.005, 10, 10); // Tiny spheres
    const particleMaterial = new THREE.MeshStandardMaterial({
        emissive: new THREE.Color(0xAA5533), // Warm reddish-brown glow
        emissiveIntensity: 0.9, // Slightly stronger glow for effect
        color: 0x442211, // Darker reddish-brown base
        transparent: true,
        opacity: 0.8
    });

    const particle = new THREE.Mesh(particleGeometry, particleMaterial);

    // Randomly position the particles
    let radius = Math.random() * 5
    let theta = Math.random() * 2 * Math.PI
    let phi = Math.random() * 2 * Math.PI
    particle.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
    );

    StarSceneNebulaGroup.add(particle);
}

starScene.add(StarSceneNebulaGroup);


const StarSceneLight = new THREE.PointLight(0xFFAA88, 2, 20); // Warm orange glow
StarSceneLight.position.set(0, 0, 4);
starScene.add(StarSceneLight);

starSceneCamera.position.z = 1;



function starSceneAnimate() {
    StarSceneNebulaGroup.rotation.y += nebulaRotationSpeed.y;
    StarSceneNebulaGroup.rotation.x += nebulaRotationSpeed.x;
    StarSceneNebulaGroup.rotation.z += nebulaRotationSpeed.z;
	starSceneRenderer.render( starScene , starSceneCamera );

}