// components/Cube.js
import { Canvas } from '@react-three/fiber';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Model from './Model';

function RotatingCube() {
  const cubeRef = useRef();

  // Esto hará que el cubo gire en cada frame
  useFrame(() => {
    cubeRef.current.rotation.x += 0.02;
    cubeRef.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={cubeRef}>
      <boxGeometry args={[3, 3, 3]} />
      <meshStandardMaterial color="cyan" />
    </mesh>
  );
}

export default function Cube() {
  return (
    <Canvas style={{ height: 400, width: 400 }}>
      <ambientLight />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Model path="/dji-air-3/source/air3.glb" />
      <OrbitControls />
    </Canvas>
  );
}
