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
const nebulaSceneCamera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const nebulaSceneRenderer = new THREE.WebGLRenderer({ canvas: document.getElementById("nebula-canvas") });


nebulaSceneRenderer.setSize( window.innerWidth, window.innerHeight );
nebulaSceneRenderer.setAnimationLoop( animate );



const particleCount = 5000;
const nebulaGroup = new THREE.Group(); // Group for better control

for (let i = 0; i < particleCount; i++) {
    // Create a small sphere
    const particleGeometry = new THREE.SphereGeometry(0.01, 8, 8); // Tiny spheres
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
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        (radius * Math.cos(phi))
    );

    nebulaGroup.add(particle);
}

nebulaScene.add(nebulaGroup);


const light = new THREE.PointLight(0xFFAA88, 2, 20); // Warm orange glow
light.position.set(0, 0, 3);
nebulaScene.add(light);

nebulaSceneCamera.position.z = 0;
nebulaSceneCamera.position.x = 0;
nebulaSceneCamera.position.y = 0;


let nebulaRotationSpeed = {
    x : 0.001,
    y : 0.0007
}

function animate() {

    // Rotate slowly
    nebulaGroup.rotation.y += nebulaRotationSpeed.y;
    nebulaGroup.rotation.x += nebulaRotationSpeed.x;

    // Slightly move particles up and down
    // nebulaGroup.children.forEach(particle => {
    //     particle.position.y += Math.sin(Date.now() * 0.0001 + particle.position.x) * 0.002;
    // });


	nebulaSceneRenderer.render( nebulaScene, nebulaSceneCamera );

}


gsap.timeline({
    scrollTrigger: {
        trigger: "#scene-2",
        start: "top top",
        markers:true,
        end: "bottom top",
        pin:true,
        scrub: 1
    }
})
.to(nebulaGroup.scale, {
    x: 0.2, // Shrinking effect
    y: 0.2,
    z: 0.2,
    duration: 3,
    ease: "power2.inOut"
})
.to(nebulaSceneCamera.position , {
    z:2,
    duration: 3,
    ease: "linear"
})
.to(nebulaRotationSpeed , {
    x : 0.0001,
    y : 0.0001
})