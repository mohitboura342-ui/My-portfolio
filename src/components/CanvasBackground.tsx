import { Canvas } from '@react-three/fiber';
import { Scene } from './Scene';

export function CanvasBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Scene />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/0 via-[#050505]/50 to-[#050505] pointer-events-none backdrop-blur-[1px]"></div>
    </div>
  );
}
