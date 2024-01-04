/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import { Box } from "@mui/material";
import Header from "./components/header/header";
import Footer from "./components/header/footer";
import HeroSection from "./components/heroSection";
import "./App.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

import { gsap } from "gsap";
import { useEffect } from "react";
import Key from "./assets/gifs/key.gif";
import LoveBirds from "./assets/gifs/love-birds.gif";
import LoveYou from "./assets/gifs/i-love-you.gif";
import LoveIdea from "./assets/gifs/love_idea.gif";
import Mail from "./assets/gifs/mail.gif";
import Marriage from "./assets/gifs/marriage.gif";
import Sunglasses from "./assets/gifs/sunglasses.gif";
import TaddyBear from "./assets/gifs/teddy-bear.gif";
import GreatPyrenees from "./assets/gifs/great-pyrenees.gif";

function App() {
  const heartAnimation = () => {
    //===================================================== SHADERS
    const vertexShader = `
varying float vDistance;
varying vec2 vUv;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    vDistance = -mvPosition.z; // Use negative Z-coordinate as distance from camera
    vUv = uv;
  }
`;
    const fragmentShader = `
uniform float maxDistance; // Adjust this value to control the maximum distance for full opacity
varying float vDistance;
varying vec2 vUv;
uniform sampler2D imageTexture;

void main() {
  float opacity = clamp(1.3 - (vDistance / 2.0), 0.0, 1.0);
  vec4 texColor = texture2D(imageTexture, vUv);
  gl_FragColor = vec4(texColor.rgb, opacity); // Adjust the color as needed
}
`;

    //===================================================== Variables
    let canvas,
      heartGlobal: any,
      gltfloader = new GLTFLoader(),
      WIDTH = window.innerWidth,
      rgbeLoader = new RGBELoader(),
      mainGroup = new THREE.Group(),
      textGroup = new THREE.Group(),
      HEIGHT = window.innerHeight;

    canvas = document.querySelector(".canvas");

    const Font_Loader = new FontLoader();

    // rgbeLoader.setDataType(THREE.UnsignedByteType);

    //===================================================== Create a WebGL renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      powerPreference: "high-performance",
      alpha: true,
      antialias: true,
      stencil: false,
      depth: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    //===================================================== Create an empty scene
    const scene = new THREE.Scene();
    scene.add(mainGroup,textGroup);
    // scene.background=new THREE.TextureLoader().load("/city_bg.jpg");
    rgbeLoader.load(
      "src/threejs/hdr/rural_asphalt_road_4k.hdr",
      (texture: any) => {
        const pmremGenerator = new THREE.PMREMGenerator(renderer);
        pmremGenerator.compileEquirectangularShader();
        const envMap = pmremGenerator.fromEquirectangular(texture).texture;
        scene.environment = envMap;
        texture.dispose();
        pmremGenerator.dispose();
      }
    );

    //===================================================== Create a perpsective camera
    const camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.001, 1000);
    camera.position.z = 0.6;

    //===================================================== Orbit Controls
    // const orbitControls = new OrbitControls(camera, canvas);
    // orbitControls.enableDamping = true;
    //===================================================== Resize
    window.addEventListener("resize", function () {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    });

    //===================================================== Create a mesh
    // const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    // const boxMaterial = new THREE.MeshBasicMaterial({ color: "red" });
    // const box = new THREE.Mesh(boxGeometry, boxMaterial);
    // scene.add(box);

    gltfloader.load("src/threejs/GLTF/heart/scene.gltf", (gltf: any) => {
      // Access the loaded model
      console.log(gltf);

      const model = gltf.scene;
      heartGlobal = model;
      model.name = "heart";
      model.scale.set(0.0025, 0.0025, 0.0025);
      model.position.set(0.00135, -0.07775, -0.07825);
      model.traverse((child: any) => {
        if (child.isMesh) {
          // Check if the material is a basic material or a standard material
          if (
            child.material.isMeshBasicMaterial ||
            child.material.isMeshStandardMaterial
          ) {
            child.material.color = new THREE.Color("#065BCE");
            child.material.transparent = true;

            // child.material = ShaderMaterial;
          }
        }
      });
      // const boundingBox = new THREE.Box3().setFromObject(model);
      // const center = new THREE.Vector3();
      // boundingBox.getCenter(center);
      // model.position.sub(center);

      mainGroup.add(model);
      mainGroup.position.x = -0.35;
      textGroup.position.y = -0.3;
    });
    //===================================================== Create Heart images
    // Image1
    const imgGeo1 = new THREE.PlaneGeometry(0.02, 0.028, 50);
    const imgMat1 = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        maxDistance: { value: 3 }, // Adjust the maximum distance
        imageTexture: {
          value: new THREE.TextureLoader().load(
            "src/threejs/assets/matches/1.png"
          ),
        },
      },
    });
    const img1 = new THREE.Mesh(imgGeo1, imgMat1);
    img1.position.set(0, 0.01407, -0.07);
    img1.rotation.z = -4.35 * (Math.PI / 180);
    // Image2
    const imgGeo2 = new THREE.PlaneGeometry(0.02, 0.028, 50);
    const imgMat2 = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        maxDistance: { value: 3 }, // Adjust the maximum distance
        imageTexture: {
          value: new THREE.TextureLoader().load(
            "src/threejs/assets/matches/2.png"
          ),
        },
      },
    });
    const img2 = new THREE.Mesh(imgGeo2, imgMat2);
    img2.position.set(0.01131, 0.00858, -0.065);
    img2.rotation.z = -50.32 * (Math.PI / 180);

    // Image3
    const imgGeo3 = new THREE.PlaneGeometry(0.02, 0.028, 50);
    const imgMat3 = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        maxDistance: { value: 3 }, // Adjust the maximum distance
        imageTexture: {
          value: new THREE.TextureLoader().load(
            "src/threejs/assets/matches/3.png"
          ),
        },
      },
    });
    const img3 = new THREE.Mesh(imgGeo3, imgMat3);
    img3.position.set(0.0066, -0.01248, -0.06663);
    img3.rotation.z = 22.87 * (Math.PI / 180);
    // Image4
    const imgGeo4 = new THREE.PlaneGeometry(0.02, 0.028, 50);
    const imgMat4 = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        maxDistance: { value: 3 }, // Adjust the maximum distance
        imageTexture: {
          value: new THREE.TextureLoader().load(
            "src/threejs/assets/matches/4.png"
          ),
        },
      },
    });
    const img4 = new THREE.Mesh(imgGeo4, imgMat4);
    img4.position.set(-0.00535, -0.01277, -0.06711);
    img4.rotation.z = -24.84 * (Math.PI / 180);
    // Image5
    const imgGeo5 = new THREE.PlaneGeometry(0.02, 0.028, 50);
    const imgMat5 = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
    alphaTest: 0,
    // blending: new THREE.NormalBlending,
      uniforms: {
        maxDistance: { value: 3 }, // Adjust the maximum distance
        imageTexture: {
          value: new THREE.TextureLoader().load(
            "src/threejs/assets/matches/5.png"
          ),
        },
      },
    });
    const img5 = new THREE.Mesh(imgGeo5, imgMat5);
    img5.position.set(-0.01259, 0.0053, -0.06822);
    img5.rotation.z = 64.17 * (Math.PI / 180);
    const imageGroup = new THREE.Group();
    // scene.add(imageGroup);
    imageGroup.add(img1, img2, img3, img4, img5);
    mainGroup.add(imageGroup);

    // TControl(mainGroup,"R");

    //===================================================== Create text geometry
    Font_Loader.load("src/assets/font/roboto.json", function (font: any) {
      const textGeometry = new TextGeometry("More than", {
        font: font,
        size: 0.02,
        height: 0.005,
        curveSegments: 12,
      });

      const textMaterial = new THREE.MeshBasicMaterial({ color: "#000000" });
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textGroup.add(textMesh);

      const boundingBox = new THREE.Box3().setFromObject(textMesh);
      const center = new THREE.Vector3();
      boundingBox.getCenter(center);
      textMesh.position.sub(center);
    });

    
    Font_Loader.load("src/assets/font/roboto.json", function (font: any) {
      const textGeometry1 = new TextGeometry("matches real connections", {
        font: font,
        size: 0.02,
        height: 0.005,
        curveSegments: 12,
      });

      const textMaterial1 = new THREE.MeshBasicMaterial({ color: "#000000" });
      const textMesh1 = new THREE.Mesh(textGeometry1, textMaterial1);
      textGroup.add(textMesh1);
      const boundingBox = new THREE.Box3().setFromObject(textMesh1);
      const center = new THREE.Vector3();
      boundingBox.getCenter(center);
      textMesh1.position.sub(center);
      textMesh1.position.y=-0.038

    });
    //===================================================== Create a point light in our scene
    const light = new THREE.PointLight("white", 3);
    const directionallight = new THREE.DirectionalLight("white", 2);
    const ambientLight = new THREE.AmbientLight("blue", 0.2);
    light.position.set(0, 0.2, 1);
    directionallight.position.set(0, 0.2, -1);
    scene.add(ambientLight, light, directionallight);

    //===================================================== Gsap Animate
    const tl = gsap.timeline({ paused: true });
    setTimeout(() => {
      tl.to(mainGroup.position, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "power1.inOut",
      });
      heartGlobal.traverse((child: any) => {
        if (child.isMesh) {
          // Check if the material is a basic material or a standard material
          if (
            child.material.isMeshBasicMaterial ||
            child.material.isMeshStandardMaterial
          ) {
            tl.to(child.material, {
              opacity: 0.5,
              duration: 0.8,
              ease: "power1.inOut",
            });
            tl.to(child.material, {
              opacity: 1,
              duration: 0.8,
              ease: "power1.inOut",
            });
          }
        }
      });

      // tl.to(heartGlobal?.position, { x:0,y:0,z:-5, duration: 1.5, delay:0.5, ease: "power1.inOut" },"-=1.7");
      tl.to(
        imageGroup.rotation,
        { z: -Math.PI * 2, duration: 1.5, ease: "power1.inOut" },
        "-=1.5"
      );

      tl.to(
        img1.position,
        {
          x: -0.02306,
          y: 0.0132,
          z: 0.575,
          duration: 1.5,
          ease: "power1.inOut",
        },
        "-=1.5"
      );
      tl.to(
        img1.rotation,
        { z: 0.67796, duration: 1.5, ease: "power1.inOut" },
        "-=1.5"
      );
      tl.to(
        img2.position,
        {
          x: 0.01215,
          y: -0.01283,
          z: 0.5754,
          duration: 1.5,
          ease: "power1.inOut",
        },
        "-=1.5"
      );
      tl.to(
        img2.rotation,
        { z: -1.11739, duration: 1.5, ease: "power1.inOut" },
        "-=1.5"
      );
      tl.to(
        img3.position,
        {
          x: -0.01446,
          y: -0.01323,
          z: 0.5753,
          duration: 1.5,
          ease: "power1.inOut",
        },
        "-=1.5"
      );
      tl.to(
        img3.rotation,
        { z: 1.02353, duration: 1.5, ease: "power1.inOut" },
        "-=1.5"
      );
      tl.to(
        img4.position,
        {
          x: 0.01966,
          y: 0.01099,
          z: 0.5752,
          duration: 1.5,
          ease: "power1.inOut",
        },
        "-=1.5"
      );
      tl.to(
        img4.rotation,
        { z: 0.77481, duration: 1.5, ease: "power1.inOut" },
        "-=1.5"
      );
      tl.to(
        img5.position,
        {
          x: -0.00032,
          y: 0.02025,
          z: 0.5751,
          duration: 1.5,
          ease: "power1.inOut",
        },
        "-=1.5"
      );
      tl.to(
        img5.rotation,
        { z: -0.2694, duration: 1.5, ease: "power1.inOut" },
        "-=1.5"
      );
      tl.to(heartGlobal.position, {
        y: 0.5,
        duration: 0.5,
        ease: "power1.inOut",
      });
      tl.to(textGroup.position, {
        y: 0.03,
        duration: 0.5,
        ease: "power1.inOut",
      });
    }, 500);

    //===================================================== Animate

    const clock = new THREE.Clock();

    function Animation() {
      const elapsedTime = clock.getElapsedTime();
      setTimeout(() => {
        heartGlobal.rotation.y = elapsedTime;
      }, 500);

      renderer.render(scene, camera);
      requestAnimationFrame(Animation);
    }

    Animation();
    //===================================================== TransformControls

    function TControl(name: any, type = "P", group = true) {
      const tControl = new TransformControls(camera, renderer.domElement);
      tControl.addEventListener("dragging-changed", (event: any) => {
        OrbitControls.enabled = !event.value;
      });
      tControl.attach(name);
      scene.add(tControl);

      tControl.addEventListener("change", () => {
        // The object's position has changed
        const newPosition = name.position;
        const newRotate = name.rotation;
        const newScale = name.scale;
        type == "R"
          ? (console.log("New Rotation:", {
              x: parseFloat(newRotate.x.toFixed(5)),
              y: parseFloat(newRotate.y.toFixed(5)),
              z: parseFloat(newRotate.z.toFixed(5)),
            }),
            tControl.setMode("rotate"))
          : type == "S"
          ? (console.log("New Scale:", {
              x: parseFloat(newScale.x.toFixed(5)),
              y: parseFloat(newScale.y.toFixed(5)),
              z: parseFloat(newScale.z.toFixed(5)),
            }),
            tControl.setMode("scale"))
          : (console.log("New Position:", {
              x: parseFloat(newPosition.x.toFixed(5)),
              y: parseFloat(newPosition.y.toFixed(5)),
              z: parseFloat(newPosition.z.toFixed(5)),
            }),
            tControl.setMode("translate"));
      });
    }
    //===================================================== Debugger

    const axesHelper = new THREE.AxesHelper(1000); // Adjust the size as needed
    // scene.add(axesHelper);

    //===================================================== Other function

    const track = document.querySelector(".animationHeight");
    window.addEventListener("scroll", function (event) {
      const trackHeight = track?.offsetHeight;
      const windowHeight = window.innerHeight;
      const progress =
        (window.pageYOffset - track?.offsetTop) / (trackHeight - windowHeight);
      console.log("progress:", progress);
      tl.progress(progress);
    });
  };

  useEffect(() => {
    heartAnimation();
  }, []);

  return (
    <Box className={`landingPage`}>
      <Header />
      <HeroSection />
      <div className="p-relative animationHeight">
        <div>
          <img
            className="mgif"
            style={{ position: "absolute", left: "10%", top: "30%" }}
            src={Key}
          />
          <img
            className="mgif"
            style={{ position: "absolute", left: "50%", top: "30%" }}
            src={LoveYou}
          />
          <img
            className="mgif"
            style={{ position: "absolute", left: "88%", top: "30%" }}
            src={LoveBirds}
          />
          <img
            className="mgif"
            style={{ position: "absolute", left: "25%", top: "50%" }}
            src={Mail}
          />
          <img
            className="mgif"
            style={{ position: "absolute", left: "70%", top: "50%" }}
            src={Marriage}
          />
          <img
            className="mgif"
            style={{ position: "absolute", left: "10%", top: "70%" }}
            src={Sunglasses}
          />
          <img
            className="mgif"
            style={{ position: "absolute", left: "50%", top: "70%" }}
            src={TaddyBear}
          />
          <img
            className="mgif"
            style={{ position: "absolute", left: "88%", top: "70%" }}
            src={GreatPyrenees}
          />
        </div>
        <canvas className="canvas"></canvas>
      </div>
      <Footer />
    </Box>
  );
}

export default App;
