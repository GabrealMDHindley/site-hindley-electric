"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { createBoltGeometry } from "./BoltGeometry";

function Bolt({ reduced }: { reduced: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const geometry = useMemo(() => createBoltGeometry(), []);
  const { pointer } = useThree();
  const nextFlicker = useRef(4 + Math.random() * 4);
  const flickerClock = useRef(0);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    if (!reduced) {
      meshRef.current.rotation.y += delta * 0.25;
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        pointer.y * 0.25,
        0.04
      );
      meshRef.current.rotation.z = THREE.MathUtils.lerp(
        meshRef.current.rotation.z,
        -pointer.x * 0.18,
        0.04
      );
    }

    if (materialRef.current) {
      flickerClock.current += delta;
      if (flickerClock.current > nextFlicker.current) {
        flickerClock.current = 0;
        nextFlicker.current = 5 + Math.random() * 6;
        materialRef.current.emissiveIntensity = 2.4;
      } else {
        materialRef.current.emissiveIntensity = THREE.MathUtils.lerp(
          materialRef.current.emissiveIntensity,
          1.1,
          0.08
        );
      }
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} scale={1.8}>
      <meshStandardMaterial
        ref={materialRef}
        color="#e8e2d4"
        metalness={0.85}
        roughness={0.22}
        emissive="#e5231b"
        emissiveIntensity={1.1}
      />
    </mesh>
  );
}

export default function HeroScene({ reduced = false }: { reduced?: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 5.2], fov: 42 }}
    >
      <ambientLight intensity={0.35} />
      <pointLight position={[4, 3, 5]} intensity={120} color="#ff4a3d" />
      <pointLight position={[-4, -2, 3]} intensity={40} color="#ffd9d4" />
      <directionalLight position={[0, 4, 2]} intensity={0.6} color="#f5f2e8" />
      <Bolt reduced={reduced} />
      {!reduced && (
        <Sparkles
          count={40}
          scale={[6, 6, 3]}
          size={2}
          speed={0.25}
          opacity={0.5}
          color="#e5231b"
        />
      )}
    </Canvas>
  );
}
