"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Environment, Float, Lightformer, Sparkles } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

function GooeyBlob() {
  const meshRef = useRef<THREE.Mesh>(null);

  // Subtle rotation over time
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      {/* Moderately sized, perfectly positioned to show its edges and curvature */}
      <mesh ref={meshRef} scale={2.8} position={[-3, 0, -2]}>
        <sphereGeometry args={[1, 128, 128]} />
        <MeshTransmissionMaterial
          backside
          backsideThickness={5}
          thickness={2}
          roughness={0.15}
          transmission={1}
          ior={1.5}
          chromaticAberration={0.4}
          anisotropy={0.3}
          color="#c8f04a" // Tinted with the brand neon green
          distortion={1.5} // Liquid wave effect built into transmission
          distortionScale={0.5}
          temporalDistortion={0.1} // Animation over time
        />
      </mesh>
    </Float>
  );
}

export default function ThreeCanvas() {
  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none mix-blend-screen opacity-90">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          
          {/* Intense Neon Green Rim Lights spread wide */}
          <pointLight position={[-10, -5, -2]} color="#c8f04a" intensity={80} distance={40} />
          <pointLight position={[10, 5, -2]} color="#c8f04a" intensity={60} distance={40} />
          <pointLight position={[0, 0, 5]} color="#14b8a6" intensity={30} distance={30} /> {/* Teal accent in center */}
          
          <GooeyBlob />

          {/* Floating glowing particles for depth and life */}
          <Sparkles count={300} scale={15} size={2} speed={0.4} color="#c8f04a" opacity={0.6} />
          <Sparkles count={150} scale={20} size={1.5} speed={0.2} color="#14b8a6" opacity={0.4} />
          
          <Environment resolution={256}>
            <group rotation={[-Math.PI / 4, -0.3, 0]}>
              <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} color="#ffffff" />
              <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[20, 0.1, 1]} color="#c8f04a" />
              <Lightformer rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[20, 0.5, 1]} color="#14b8a6" />
              <Lightformer rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 1, 1]} color="#c8f04a" />
            </group>
          </Environment>
        </Suspense>
      </Canvas>
    </div>
  );
}
