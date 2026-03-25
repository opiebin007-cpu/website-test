import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from './ThemeProvider';

const ParticleWave = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 60; // 60x60 grid = 3600 points
  const sep = 0.4; // Separation between points
  
  // Initialize positions
  const positions = useMemo(() => {
    const pos = new Float32Array(count * count * 3);
    let i = 0;
    for (let ix = 0; ix < count; ix++) {
      for (let iy = 0; iy < count; iy++) {
        pos[i] = ix * sep - (count * sep) / 2; // x
        pos[i + 1] = 0; // y
        pos[i + 2] = iy * sep - (count * sep) / 2; // z
        i += 3;
      }
    }
    return pos;
  }, [count, sep]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    let i = 0;
    for (let ix = 0; ix < count; ix++) {
      for (let iy = 0; iy < count; iy++) {
        // Complex wave math for a "data flow" look
        positions[i + 1] = 
          Math.sin((ix + time * 1.5) * 0.3) * 0.5 + 
          Math.sin((iy + time * 1.2) * 0.5) * 0.5 +
          Math.cos((ix + iy - time) * 0.2) * 0.5;
          
        i += 3;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Slow rotation of the entire grid
    pointsRef.current.rotation.y = time * 0.05;
  });

  return (
    <points ref={pointsRef} rotation={[Math.PI / 4, 0, 0]} position={[0, -3, -5]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count * count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.06} 
        color="#0053d5" 
        transparent 
        opacity={0.9} 
        sizeAttenuation={true} 
      />
    </points>
  );
};

const CoreSphere = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { theme } = useTheme();
  const wireframeColor = theme === 'light' ? '#000000' : '#ffffff';
  
  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.x = time * 0.1;
    groupRef.current.rotation.y = time * 0.15;
    // Gentle floating
    groupRef.current.position.y = Math.sin(time * 0.5) * 0.2 + 0.5;
  });

  return (
    <group ref={groupRef} position={[4, 0.5, -4]}>
      {/* Outer wireframe */}
      <mesh>
        <icosahedronGeometry args={[2.5, 1]} />
        <meshBasicMaterial color={wireframeColor} wireframe transparent opacity={0.05} />
      </mesh>
      
      {/* Inner core */}
      <mesh scale={0.6}>
        <icosahedronGeometry args={[2.5, 0]} />
        <meshBasicMaterial color="#0053d5" wireframe transparent opacity={0.2} />
      </mesh>
    </group>
  );
};

export default function Hero3DBackground() {
  const { theme } = useTheme();
  const fogColor = theme === 'light' ? '#ffffff' : '#050505';

  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-100">
      <Canvas camera={{ position: [0, 2, 5], fov: 75 }}>
        <fog attach="fog" args={[fogColor, 5, 20]} />
        <ParticleWave />
        <CoreSphere />
      </Canvas>
    </div>
  );
}
