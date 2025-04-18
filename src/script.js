import * as THREE from 'three'


// Audio
const audio = new Audio('src/Super_Nova2.mp3');
audio.preload = 'auto';
const btn = document.getElementById('audio_btn');

audio.play()
    .then(() => {

        btn.classList.add('playing');
        addClickListener();
    })
    .catch(error => {

        console.error("Autoplay failed:", error);
        addClickListener();
    });

function addClickListener() {
    btn.addEventListener('click', function () {
        if (audio.paused) {
            audio.play();
            btn.classList.add('playing');
            let isFadedOut = true
            if (isFadedOut) {
                gsap.to("#audio_btn", { opacity: 1, scale: 1, duration: 0.3 });
                isFadedOut = false;
            }
        } else {
            audio.pause();
            btn.classList.remove('playing');
        }
    });
}




//Animation Stuff
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollSmoother);

ScrollSmoother.create({
    smooth: 1,
    effects: true
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
    }, "-=1")


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
        pin: true,
        start: "top top",
        end: "bottom top",
        scrub: 1,

    }
})
    .to("#scene-1", {
        opacity: 0,
        scale: 1.2,
    }, 0)
    .to("#audio_btn", {
        opacity: 0,
        scale: 1.2,
    }, 0)
    .to("#scene-2", {
        opacity: 1,
    }, 0);




const nebulaScene = new THREE.Scene();
const nebulaSceneCamera = new THREE.PerspectiveCamera(75, window.innerWidth / (window.innerHeight), 0.3, 1000);

const nebulaSceneRenderer = new THREE.WebGLRenderer({ canvas: document.getElementById("nebula-canvas") });


nebulaSceneRenderer.setSize(window.innerWidth, window.innerHeight);
nebulaSceneRenderer.setAnimationLoop(nebulaSceneAnimate);



const particleCount = 5000;
const nebulaGroup = new THREE.Group(); // Group for better control

const colors = ["red", "green", "blue", "cyan", "yellow", "purple"]

for (let i = 0; i < particleCount; i++) {

    let c = colors[i % colors.length]

    // Create a small sphere
    const particleGeometry = new THREE.SphereGeometry(0.005, 10, 10); // Tiny spheres
    const particleMaterial = new THREE.MeshStandardMaterial({
        emissive: new THREE.Color(c), // Warm reddish-brown glow
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
    x: 0.001,
    y: 0.0007,
    z: 0,
}

function nebulaSceneAnimate() {

    // Rotate slowly
    nebulaGroup.rotation.y += nebulaRotationSpeed.y;
    nebulaGroup.rotation.x += nebulaRotationSpeed.x;
    nebulaGroup.rotation.z += nebulaRotationSpeed.z;

    nebulaSceneRenderer.render(nebulaScene, nebulaSceneCamera);

}

splitText("#scene-3 > #scene3-texts > .text1")
splitText("#scene-3 > #scene3-texts > .text2")
const scene3Chars1 = document.querySelectorAll("#scene-3 > #scene3-texts > .text1 > .char")
const scene3Chars2 = document.querySelectorAll("#scene-3 > #scene3-texts > .text2 > .char")


gsap.timeline({
    scrollTrigger: {
        trigger: "#scene-3",
        start: "top 65%",
        end: "bottom 130%",
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


splitText("#scene-3 > #scene3-texts2 > .text1")
splitText("#scene-3 > #scene3-texts2 > .text2")
const scene3Chars3 = document.querySelectorAll("#scene-3 > #scene3-texts2 > .text1 > .char")
const scene3Chars4 = document.querySelectorAll("#scene-3 > #scene3-texts2 > .text2 > .char")


gsap.timeline({
    scrollTrigger: {
        trigger: "#scene-3",
        start: "top 25%",
        end: "bottom bottom",
        scrub: 1,
    }

}).from(scene3Chars3, {
    opacity: 0,
    y: 50,
    stagger: 0.05,
    ease: "power3.out",
    duration: 1.5
}).from(scene3Chars4, {
    opacity: 0,
    y: 50,
    stagger: 0.05,
    ease: "power3.out",
    duration: 1.5
})



const starScene = new THREE.Scene();
const starSceneCamera = new THREE.PerspectiveCamera(75, window.innerWidth / (window.innerHeight), 0.1, 1000);

const starSceneRenderer = new THREE.WebGLRenderer({ canvas: document.getElementById("scene3-canvas") });

starSceneRenderer.setSize(window.innerWidth, window.innerHeight);
starSceneRenderer.setAnimationLoop(starSceneAnimate);



const StarSceneNebulaGroup = new THREE.Group(); // Group for better control

for (let i = 0; i < particleCount; i++) {

    let c = colors[i % colors.length]

    // Create a small sphere
    const particleGeometry = new THREE.SphereGeometry(0.005, 10, 10); // Tiny spheres
    const particleMaterial = new THREE.MeshStandardMaterial({
        emissive: new THREE.Color(c), // Warm reddish-brown glow
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


const StarSceneLight = new THREE.PointLight(0xFFFFFF, 2, 20); // Warm orange glow
StarSceneLight.position.set(-1, 2, 4);
starScene.add(StarSceneLight);

starSceneCamera.position.z = 1;

const initialStarGeometry = new THREE.SphereGeometry(0.35,)
const initialStarMaterial = new THREE.MeshPhongMaterial({
    emissive: new THREE.Color(0xd5850e),
    emissiveIntensity: 0.6,
    color: 0xffffff,
})

const initialStar = new THREE.Mesh(initialStarGeometry, initialStarMaterial)

starScene.add(initialStar)

function starSceneAnimate() {
    StarSceneNebulaGroup.rotation.y += nebulaRotationSpeed.y;
    StarSceneNebulaGroup.rotation.x += nebulaRotationSpeed.x;
    StarSceneNebulaGroup.rotation.z += nebulaRotationSpeed.z;


    starSceneRenderer.render(starScene, starSceneCamera);

}


splitText("#scene-3 > #scene3-texts3 > .text1")
splitText("#scene-3 > #scene3-texts3 > .text2")
const scene3Chars5 = document.querySelectorAll("#scene-3 > #scene3-texts3 > .text1 > .char")
const scene3Chars6 = document.querySelectorAll("#scene-3 > #scene3-texts3 > .text2 > .char")


gsap.timeline({
    scrollTrigger: {
        trigger: "#scene-3",
        start: "top top",
        end: "bottom -200%",
        scrub: 1,
        pin: "#scene-3",
        // markers:true
    }

}).to(StarSceneNebulaGroup.scale, {
    x: 0,
    y: 0,
    z: 0,
    duration: 5
})
    .from(initialStar.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 5
    }, "-=70%") // Starts when the first tween is 30% complete
    .from(scene3Chars5, {
        opacity: 0,
        y: 50,
        duration: 1.5,
        stagger: 0.05
    }) // Starts right after the previous tween finishes

    .to(initialStar.scale, {
        x: 0.7,
        y: 0.7,
        z: 0.7,
        duration: 5
    }, "<")
    .from(scene3Chars6, {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.05
    });


gsap.timeline({
    scrollTrigger: {
        trigger: "#scene-4",
        start: "top bottom",
        end: "bottom boottom",
        scrub: 1,
        pin: "#scene3-canvas",
        // markers:true
    }
})


splitText("#scene-4 > .text1")
splitText("#scene-4 > .text2")
splitText("#scene-4 > .text3")
const scene4Character1 = document.querySelectorAll("#scene-4 > .text1 > .char")
const scene4Character2 = document.querySelectorAll("#scene-4 > .text2 > .char")
const scene4Character3 = document.querySelectorAll("#scene-4 > .text3 > .char")

gsap.timeline({
    scrollTrigger: {
        trigger: "#scene-4",
        start: "top top",
        end: "bottom top",
        scrub: 1,
        pin: true
    }
})
    .from(scene4Character1, {
        opacity: 0,
        y: 50,
        duration: 1.5,
        stagger: 0.05
    })
    .from(scene4Character2, {
        opacity: 0,
        y: 50,
        duration: 1.5,
        stagger: 0.05
    })
    .from(scene4Character3, {
        opacity: 0,
        y: 50,
        duration: 1.5,
        stagger: 0.05
    })




gsap.timeline({
    scrollTrigger: {
        trigger: "#scene-5",
        start: "top bottom",
        end: "bottom bottom",
        scrub: 1,
    }
})
    .to("#scene-4", {
        opacity: 0,
        duration: 0.5
    }, "<")
    .to(initialStar.scale, {
        x: 4,
        y: 4,
        z: 4,
        duration: 1
    }, "<")
    .to(StarSceneNebulaGroup.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1
    }, "<")


splitText("#scene-5 > .text1")
splitText("#scene-5 > .text2")
const scene5Chars1 = document.querySelectorAll("#scene-5 > .text1 > .char")
const scene5Chars2 = document.querySelectorAll("#scene-5 > .text2 > .char")


gsap.timeline({
    scrollTrigger: {
        trigger: "#scene-5",
        start: "top 50%",
        end: "top top",
        scrub: 1,
    }
})
    .from(scene5Chars1, {
        opacity: 0,
        y: 50,
        duration: 1.5,
        stagger: 0.05
    })
    .from(".equation-image", {
        opacity: 0,
        y: 50,
        duration: 1.5
    })

    .from(scene5Chars2, {
        opacity: 0,
        y: 50,
        duration: 1.5,
        stagger: 0.05
    })