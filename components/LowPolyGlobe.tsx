import React, { useRef, useEffect, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ─── Particles ────────────────────────────────────────────────────────────────
function AtmosphereParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const COUNT = 180;

  // Random positions on a shell between r=4.1 and r=5.5
  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const velocities = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const r = 4.1 + Math.random() * 1.4;
      const theta = Math.acos(2 * Math.random() - 1);
      const phi = Math.random() * Math.PI * 2;
      positions[i * 3 + 0] = r * Math.sin(theta) * Math.cos(phi);
      positions[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
      positions[i * 3 + 2] = r * Math.cos(theta);
      // Gentle random drift velocity
      velocities[i * 3 + 0] = (Math.random() - 0.5) * 0.004;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.004;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.004;
    }
    return { positions, velocities };
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;
    const pos = (pointsRef.current.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3 + 0] += velocities[i * 3 + 0];
      pos[i * 3 + 1] += velocities[i * 3 + 1];
      pos[i * 3 + 2] += velocities[i * 3 + 2];

      // Keep particle within shell — nudge back toward origin if too far/close
      const x = pos[i * 3 + 0], y = pos[i * 3 + 1], z = pos[i * 3 + 2];
      const dist = Math.sqrt(x * x + y * y + z * z);
      if (dist > 5.6 || dist < 4.0) {
        velocities[i * 3 + 0] *= -1;
        velocities[i * 3 + 1] *= -1;
        velocities[i * 3 + 2] *= -1;
      }
    }
    (pointsRef.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ff6666"
        size={0.04}
        sizeAttenuation
        transparent
        opacity={0.7}
      />
    </points>
  );
}

// ─── Moon ─────────────────────────────────────────────────────────────────────
function Moon() {
  const moonRef = useRef<THREE.Mesh>(null);
  const orbitAngle = useRef(0);

  const ORBIT_RADIUS = 5.8;
  const ORBIT_TILT = 0.4; // radians — slight inclination

  useFrame((_, delta) => {
    orbitAngle.current += delta * 0.4;
    if (!moonRef.current) return;
    const a = orbitAngle.current;
    moonRef.current.position.set(
      Math.cos(a) * ORBIT_RADIUS,
      Math.sin(a) * Math.sin(ORBIT_TILT) * ORBIT_RADIUS,
      Math.sin(a) * Math.cos(ORBIT_TILT) * ORBIT_RADIUS
    );
    // Slowly self-rotate
    moonRef.current.rotation.y += delta * 0.2;
  });

  return (
    <mesh ref={moonRef}>
      <icosahedronGeometry args={[0.2, 4]} />
      <meshBasicMaterial color="#ef4444" wireframe transparent opacity={0.2} />
    </mesh>
  );
}

// ─── Globe ────────────────────────────────────────────────────────────────────
function GlobeMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const isDesktop = useRef(window.innerWidth >= 768);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const handleResize = () => {
      isDesktop.current = window.innerWidth >= 768;
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    if (groupRef.current) {
      const targetX = isDesktop.current ? 4.5 : 0;
      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x,
        targetX,
        delta * 0.15
      );
    }

    meshRef.current.rotation.y += delta * 0.07;

    const targetRotX = mouse.current.y * 0.3;
    const targetRotZ = mouse.current.x * 0.2;

    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      targetRotX,
      delta * 0.8
    );
    meshRef.current.rotation.z = THREE.MathUtils.lerp(
      meshRef.current.rotation.z,
      targetRotZ,
      delta * 0.8
    );

    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.x = meshRef.current.rotation.x;
      atmosphereRef.current.rotation.y = meshRef.current.rotation.y;
      atmosphereRef.current.rotation.z = meshRef.current.rotation.z;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Core wireframe globe */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[3.5, 5]} />
        <meshBasicMaterial
          color="#ef4444"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Atmosphere sphere */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[3.9, 64, 64]} />
        <meshBasicMaterial
          color="#ef4444"
          transparent
          opacity={0.09}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Particles drifting through the atmosphere */}
      <AtmosphereParticles />

      {/* Orbiting moon */}
      <Moon />
    </group>
  );
}

// ─── Canvas wrapper ───────────────────────────────────────────────────────────
const LowPolyGlobe: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        style={{ width: "100%", height: "100%", background: "transparent" }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1} />
          <GlobeMesh />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default LowPolyGlobe;
