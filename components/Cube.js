// components/Cube.js
import { Canvas } from '@react-three/fiber';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

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
      <RotatingCube />
    </Canvas>
  );
}
