// components/Model.js
import { useGLTF } from '@react-three/drei';
import { useRef,useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Model({ path = "/dji-air-3/source/air3.glb" }) {
  const { scene } = useGLTF(path);
  const modelRef = useRef();
  const clockRef = useRef(new THREE.Clock());

  const anguloEnGrados = 180;
  const anguloEnRadianes = THREE.MathUtils.degToRad(anguloEnGrados);
  // Si el modelo tiene animaciones
  
  /*useEffect(() => {
    if (animations.length && modelRef.current) {
      const mixer = new THREE.AnimationMixer(modelRef.current);
      const action = mixer.clipAction(animations[0]);
      action.play();

      const update = (delta) => mixer.update(delta);
      useFrame((_, delta) => update(delta));

      return () => mixer.stopAllAction();
    }
  }, [animations]);*/


useFrame(() => {
  const t = clockRef.current.getElapsedTime();

  if (modelRef.current) {
    const baseY = THREE.MathUtils.degToRad(180);  // gira 180° para que mire al frente
    const maxAngle = THREE.MathUtils.degToRad(15);
    modelRef.current.rotation.y = baseY + Math.sin(t * 2) * maxAngle;
  }
});

    return (
    <primitive
      object={scene}
      ref={modelRef}
      position={[0, 0, 0]}               // mueve el modelo
      scale={[1.5, 1.5, 1.5]}           // ajusta tamaño
    />
  );
}
