import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { gsap } from "gsap";
import * as THREE from "three";

const Canopy = () => {
  const canopyRef = useRef();

  // Load the GLTF model
  const { scene, materials, nodes } = useGLTF("/models/front_conservatory.glb");

  useEffect(() => {
    if (scene) {
      const canopy = canopyRef.current;
      canopy.scale.set(0.1, 0.1, 0.1); // Make the model really big
      canopy.position.set(0, 0, 0); // Center the model
      // Check and apply materials if necessary
      scene.traverse((child) => {
        if (child.isMesh) {
          child.material = materials[child.material.name];
        }
      });
    }
  }, [scene, materials]);

  return <primitive object={scene} ref={canopyRef} />;
};

const App = () => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas
        camera={{ position: [0, 800, 1600], fov: 40, near: 1, far: 10000 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Canopy />
        <OrbitControls />
        <axesHelper args={[5]} /> {/* Adds an axes helper */}
        <gridHelper args={[10, 10]} /> {/* Adds a grid helper */}
      </Canvas>
    </div>
  );
};

export default App;
