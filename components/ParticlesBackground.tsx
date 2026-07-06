import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);

  const { positions } = useMemo(() => {
    const vertices = [];
    for (let i = 0; i < 10000; i++) {
      const x = 2000 * Math.random() - 1000;
      const y = 2000 * Math.random() - 1000;
      const z = 2000 * Math.random() - 1000;
      vertices.push(x, y, z);
    }
    return { positions: new Float32Array(vertices) };
  }, []);

  const sprite = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Create a soft radial gradient for the particle
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255,255,255,1)');
      gradient.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);

  const mouse = useRef({ x: 0, y: 0 });
  const windowHalf = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      if (!event.isPrimary) return;
      mouse.current.x = event.clientX - windowHalf.current.x;
      mouse.current.y = event.clientY - windowHalf.current.y;
    };
    const onWindowResize = () => {
      windowHalf.current.x = window.innerWidth / 2;
      windowHalf.current.y = window.innerHeight / 2;
    };

    document.body.style.touchAction = 'none';
    document.body.addEventListener('pointermove', onPointerMove);
    window.addEventListener('resize', onWindowResize);
    
    return () => {
      document.body.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onWindowResize);
      document.body.style.touchAction = 'auto';
    };
  }, []);

  useFrame((state) => {
    const time = Date.now() * 0.00005;

    // camera position is updated in react-three-fiber via state.camera
    state.camera.position.x += (mouse.current.x - state.camera.position.x) * 0.05;
    state.camera.position.y += (-mouse.current.y - state.camera.position.y) * 0.05;
    state.camera.lookAt(state.scene.position);


  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={12}
        sizeAttenuation={true}
        map={sprite}
        alphaTest={0.5}
        transparent={true}
        color="#ff0000"
      />
    </points>
  );
}

const ParticlesBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none bg-black">
      <Canvas
        camera={{ fov: 55, near: 2, far: 2000, position: [0, 0, 1000] }}
        style={{ width: "100%", height: "100%", background: "transparent" }}
        dpr={[1, 2]}
      >
        <fogExp2 attach="fog" args={[0x000000, 0.001]} />
        <Particles />
      </Canvas>
    </div>
  );
};

export default ParticlesBackground;
