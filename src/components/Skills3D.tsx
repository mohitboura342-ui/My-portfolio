import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';

const SKILLS = [
  "Python", "SQL", "Power BI", "Tableau", 
  "Machine Learning", "Deep Learning", "Pandas", 
  "NumPy", "Scikit-Learn", "React", "GitHub"
];

function SkillSphere({ text, position }: { text: string; position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() + position[0]) * 0.2;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshPhysicalMaterial 
          color="#1e1b4b" 
          transmission={0.5}
          opacity={0.8}
          transparent
          roughness={0.1}
          metalness={0.8}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
        <Text
          position={[0, 0, 0.9]}
          fontSize={0.2}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.5}
          textAlign="center"
        >
          {text}
        </Text>
      </mesh>
    </Float>
  );
}

export function SkillsGroup() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {SKILLS.map((skill, i) => {
        const phi = Math.acos(-1 + (2 * i) / SKILLS.length);
        const theta = Math.sqrt(SKILLS.length * Math.PI) * phi;
        const radius = 3.2;
        const x = radius * Math.cos(theta) * Math.sin(phi);
        const y = radius * Math.sin(theta) * Math.sin(phi);
        const z = radius * Math.cos(phi);
        
        return <SkillSphere key={skill} text={skill} position={[x, y, z]} />;
      })}
    </group>
  );
}
