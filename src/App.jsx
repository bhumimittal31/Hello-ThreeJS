import React, { useRef, useEffect } from "react";
import * as THREE from 'three';
import gsap from 'gsap';
import typeface from 'three/examples/fonts/helvetiker_regular.typeface.json';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const App = () => {
  const sceneRef = useRef(null);
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 3;
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    sceneRef.current.appendChild(renderer.domElement);

    //rsizeing
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.updateProjectionMatrix();
    })
    //setpixelratio
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    //font
    const fontloader = new FontLoader();
    fontloader.load('fonts/helvetiker_regular.typeface.json', (font) => {
      const textgeometry = new TextGeometry('Hello Three.js', {
        font: font,
        size: 0.5,
        height: 0.2,
        curveSegments: 24,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 8
      });
      const textmaterial = new THREE.MeshNormalMaterial({ color: 'white' });
      const mesh = new THREE.Mesh(textgeometry, textmaterial);
      scene.add(mesh);
      textgeometry.center();
    });

    // Heart Object
    const heartX = -25;
    const heartY = -25;
    const heartShape = new THREE.Shape();
    heartShape.moveTo(25 + heartX, 25 + heartY);
    heartShape.bezierCurveTo(25 + heartX, 25 + heartY, 20 + heartX, 0 + heartY, 0 + heartX, 0 + heartY);
    heartShape.bezierCurveTo(-30 + heartX, 0 + heartY, -30 + heartX, 35 + heartY, -30 + heartX, 35 + heartY);
    heartShape.bezierCurveTo(-30 + heartX, 55 + heartY, -10 + heartX, 77 + heartY, 25 + heartX, 95 + heartY);
    heartShape.bezierCurveTo(60 + heartX, 77 + heartY, 80 + heartX, 55 + heartY, 80 + heartX, 35 + heartY);
    heartShape.bezierCurveTo(80 + heartX, 35 + heartY, 80 + heartX, 0 + heartY, 50 + heartX, 0 + heartY);
    heartShape.bezierCurveTo(35 + heartX, 0 + heartY, 25 + heartX, 25 + heartY, 25 + heartX, 25 + heartY);

    const extrudeSettings = {
      depth: 8,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 2,
      bevelSize: 1,
      bevelThickness: 1,
    };

    const materialRed = new THREE.MeshBasicMaterial({
      color: new THREE.Color("rgb(255, 182, 193)")
    });
    for (let i = 0; i < 100; i++) {
      const geometryHeart = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
      const meshHeart = new THREE.Mesh(geometryHeart, materialRed);
      meshHeart.rotation.x = Math.PI;
      meshHeart.position.x = (Math.random() - 0.5) * 20;
      meshHeart.position.y = (Math.random() - 0.5) * 20;
      meshHeart.position.z = (Math.random() - 0.5) * 20;
      meshHeart.scale.set(0.01, 0.01, 0.01);
      gsap.to(meshHeart.scale, { x: 0.008, y: 0.008, z: 0.008, duration: 1, repeat: -1 });
      scene.add(meshHeart);
    }
    const controls = new OrbitControls(camera, renderer.domElement);
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();
    return () => {
      renderer.dispose();
      sceneRef.current.removeChild(renderer.domElement);
    };

  }, []);
  return <div ref={sceneRef}></div>
};
export default App;