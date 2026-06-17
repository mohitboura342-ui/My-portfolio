import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Stars, Octahedron } from '@react-three/drei';
import * as THREE from 'three';

export function Scene() {
  const sphereRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = clock.getElapsedTime() * 0.2;
      sphereRef.current.rotation.y = clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#4f46e5" />
      <directionalLight position={[-10, -10, -5]} intensity={1} color="#10b981" />
      
      {/* Background stars/particles */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      {/* Main floating object */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere ref={sphereRef} args={[1.5, 64, 64]} position={[2, 0, -2]}>
          <MeshDistortMaterial
            color="#4f46e5"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={0.8}
            wireframe={true}
          />
        </Sphere>
      </Float>

      {/* Secondary Data objects */}
      <Float speed={3} rotationIntensity={2} floatIntensity={1.5}>
        <Octahedron args={[0.5]} position={[-3, 2, -1]}>
          <meshStandardMaterial color="#10b981" wireframe opacity={0.5} transparent />
        </Octahedron>
      </Float>
      
      <Float speed={1.5} rotationIntensity={3} floatIntensity={2.5}>
        <Octahedron args={[0.3]} position={[3, -2, 1]}>
          <meshStandardMaterial color="#3b82f6" wireframe opacity={0.5} transparent />
        </Octahedron>
      </Float>
    </>
  );
}
