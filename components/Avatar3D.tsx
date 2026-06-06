import React, { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function WireframeGun() {
  const groupRef = useRef<THREE.Group>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMouse({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;

    const maxRotationX = 0.3;
    const maxRotationY = 0.5;

    targetRotation.current.y = mouse.x * maxRotationY;
    targetRotation.current.x = mouse.y * maxRotationX;

    currentRotation.current.x = THREE.MathUtils.lerp(
      currentRotation.current.x,
      targetRotation.current.x,
      0.05
    );
    currentRotation.current.y = THREE.MathUtils.lerp(
      currentRotation.current.y,
      targetRotation.current.y,
      0.05
    );

    groupRef.current.rotation.x = currentRotation.current.x;
    groupRef.current.rotation.y = currentRotation.current.y;
  });

  // Helper to create line segments from points
  const createLineGeometry = (points: number[][]) => {
    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array(points.flat());
    geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
    return geometry;
  };

  // Barrel - main tube
  const generateBarrel = () => {
    const lines = [];
    const length = 4;
    const radius = 0.15;
    const segments = 16;

    // Barrel rings
    for (let i = 0; i <= segments; i++) {
      const z = (i / segments) * length;
      const points: number[][] = [];
      for (let j = 0; j <= 32; j++) {
        const angle = (j / 32) * Math.PI * 2;
        points.push([
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          z
        ]);
      }
      lines.push(
        <lineSegments key={`barrel-ring-${i}`} geometry={createLineGeometry(points)}>
          <lineBasicMaterial color="#10b981" transparent opacity={0.8} />
        </lineSegments>
      );
    }

    // Barrel length lines
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const points: number[][] = [
        [Math.cos(angle) * radius, Math.sin(angle) * radius, 0],
        [Math.cos(angle) * radius, Math.sin(angle) * radius, length]
      ];
      lines.push(
        <lineSegments key={`barrel-line-${i}`} geometry={createLineGeometry(points)}>
          <lineBasicMaterial color="#10b981" transparent opacity={0.6} />
        </lineSegments>
      );
    }

    return lines;
  };

  // Muzzle brake
  const generateMuzzleBrake = () => {
    const points: number[][] = [];
    const length = 0.6;
    const radius = 0.25;
    
    // Front ring
    for (let i = 0; i <= 32; i++) {
      const angle = (i / 32) * Math.PI * 2;
      points.push([
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        4 + length
      ]);
    }
    
    // Back ring
    for (let i = 0; i <= 32; i++) {
      const angle = (i / 32) * Math.PI * 2;
      points.push([
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        4
      ]);
    }
    
    return (
      <lineSegments geometry={createLineGeometry(points)}>
        <lineBasicMaterial color="#10b981" transparent opacity={0.7} />
      </lineSegments>
    );
  };

  // Handguard - ventilated tube around barrel
  const generateHandguard = () => {
    const lines = [];
    const startZ = 1.2;
    const endZ = 3.5;
    const radius = 0.35;
    
    // Top and bottom rails
    for (let z = startZ; z <= endZ; z += 0.3) {
      const points: number[][] = [
        [-0.2, radius, z],
        [0.2, radius, z],
        [0.2, -radius, z],
        [-0.2, -radius, z]
      ];
      lines.push(
        <lineSegments key={`rail-${z}`} geometry={createLineGeometry(points)}>
          <lineBasicMaterial color="#10b981" transparent opacity={0.6} />
        </lineSegments>
      );
    }
    
    return lines;
  };

  // Receiver/body - main housing
  const generateReceiver = () => {
    const lines = [];
    
    // Main body box
    const points: number[][] = [
      // Top face
      [-0.4, 0.4, -0.5], [0.4, 0.4, -0.5],
      [0.4, 0.4, -0.5], [0.4, 0.4, 1.2],
      [0.4, 0.4, 1.2], [-0.4, 0.4, 1.2],
      [-0.4, 0.4, 1.2], [-0.4, 0.4, -0.5],
      // Bottom face
      [-0.4, -0.3, -0.5], [0.4, -0.3, -0.5],
      [0.4, -0.3, -0.5], [0.4, -0.3, 1.2],
      [0.4, -0.3, 1.2], [-0.4, -0.3, 1.2],
      [-0.4, -0.3, 1.2], [-0.4, -0.3, -0.5],
      // Vertical edges
      [-0.4, 0.4, -0.5], [-0.4, -0.3, -0.5],
      [0.4, 0.4, -0.5], [0.4, -0.3, -0.5],
      [0.4, 0.4, 1.2], [0.4, -0.3, 1.2],
      [-0.4, 0.4, 1.2], [-0.4, -0.3, 1.2]
    ];
    
    lines.push(
      <lineSegments key="receiver" geometry={createLineGeometry(points)}>
        <lineBasicMaterial color="#10b981" transparent opacity={0.7} />
      </lineSegments>
    );
    
    return lines;
  };

  // Magazine - curved box below receiver
  const generateMagazine = () => {
    const points: number[][] = [];
    const curve = [];
    
    // Magazine curve
    for (let i = 0; i <= 20; i++) {
      const t = i / 20;
      const x = 0;
      const y = -0.3 - t * 1.5;
      const z = 0.5 + Math.sin(t * Math.PI) * 0.3;
      curve.push([x, y, z]);
    }
    
    // Magazine width
    for (let i = 0; i < curve.length - 1; i++) {
      points.push(curve[i]);
      points.push(curve[i + 1]);
    }
    
    return (
      <lineSegments geometry={createLineGeometry(points)}>
        <lineBasicMaterial color="#10b981" transparent opacity={0.7} />
      </lineSegments>
    );
  };

  // Stock - shoulder rest
  const generateStock = () => {
    const points: number[][] = [];
    
    // Stock outline
    const stockPoints = [
      [-0.35, 0.3, -0.5],
      [-0.35, 0.3, -2.0],
      [-0.35, -0.3, -2.0],
      [-0.35, -0.3, -0.5],
      [0.35, 0.3, -0.5],
      [0.35, 0.3, -2.0],
      [0.35, -0.3, -2.0],
      [0.35, -0.3, -0.5]
    ];
    
    // Connect stock points
    for (let i = 0; i < 4; i++) {
      points.push(stockPoints[i]);
      points.push(stockPoints[(i + 1) % 4]);
    }
    for (let i = 4; i < 8; i++) {
      points.push(stockPoints[i]);
      points.push(stockPoints[((i + 1) % 4) + 4]);
    }
    // Connect front and back
    for (let i = 0; i < 4; i++) {
      points.push(stockPoints[i]);
      points.push(stockPoints[i + 4]);
    }
    
    return (
      <lineSegments geometry={createLineGeometry(points)}>
        <lineBasicMaterial color="#10b981" transparent opacity={0.7} />
      </lineSegments>
    );
  };

  // Grip - handle below trigger
  const generateGrip = () => {
    const points: number[][] = [];
    
    // Grip shape
    const gripPoints = [
      [-0.2, -0.3, 0.3],
      [-0.2, -0.8, 0.4],
      [-0.2, -0.9, 0.6],
      [-0.2, -0.3, 0.7],
      [0.2, -0.3, 0.3],
      [0.2, -0.8, 0.4],
      [0.2, -0.9, 0.6],
      [0.2, -0.3, 0.7]
    ];
    
    // Connect grip points
    for (let i = 0; i < 4; i++) {
      points.push(gripPoints[i]);
      points.push(gripPoints[(i + 1) % 4]);
    }
    for (let i = 4; i < 8; i++) {
      points.push(gripPoints[i]);
      points.push(gripPoints[((i + 1) % 4) + 4]);
    }
    // Connect sides
    for (let i = 0; i < 4; i++) {
      points.push(gripPoints[i]);
      points.push(gripPoints[i + 4]);
    }
    
    return (
      <lineSegments geometry={createLineGeometry(points)}>
        <lineBasicMaterial color="#10b981" transparent opacity={0.7} />
      </lineSegments>
    );
  };

  // Trigger guard
  const generateTriggerGuard = () => {
    const points: number[][] = [];
    const curve = [];
    
    // Trigger guard curve
    for (let i = 0; i <= 16; i++) {
      const t = i / 16;
      const angle = t * Math.PI;
      const x = 0;
      const y = -0.3 + Math.sin(angle) * 0.3;
      const z = 0.2 + Math.cos(angle) * 0.2;
      curve.push([x, y, z]);
    }
    
    for (let i = 0; i < curve.length - 1; i++) {
      points.push(curve[i]);
      points.push(curve[i + 1]);
    }
    
    return (
      <lineSegments geometry={createLineGeometry(points)}>
        <lineBasicMaterial color="#10b981" transparent opacity={0.8} />
      </lineSegments>
    );
  };

  // Sights - front and rear
  const generateSights = () => {
    const lines = [];
    
    // Rear sight (on receiver)
    const rearPoints: number[][] = [
      [-0.1, 0.4, -0.3], [0.1, 0.4, -0.3],
      [-0.1, 0.4, -0.3], [-0.1, 0.55, -0.3],
      [0.1, 0.4, -0.3], [0.1, 0.55, -0.3],
      [-0.1, 0.55, -0.3], [0.1, 0.55, -0.3]
    ];
    
    // Front sight (on barrel)
    const frontPoints: number[][] = [
      [0, 0.15, 3.8], [0, 0.35, 3.8],
      [-0.05, 0.35, 3.8], [0.05, 0.35, 3.8],
      [0, 0.35, 3.8], [0, 0.35, 3.9]
    ];
    
    lines.push(
      <lineSegments key="rear-sight" geometry={createLineGeometry(rearPoints)}>
        <lineBasicMaterial color="#10b981" transparent opacity={0.9} />
      </lineSegments>
    );
    
    lines.push(
      <lineSegments key="front-sight" geometry={createLineGeometry(frontPoints)}>
        <lineBasicMaterial color="#10b981" transparent opacity={0.9} />
      </lineSegments>
    );
    
    return lines;
  };

  return (
    <group ref={groupRef}>
      {/* Barrel */}
      {generateBarrel()}
      
      {/* Muzzle brake */}
      {generateMuzzleBrake()}
      
      {/* Handguard */}
      {generateHandguard()}
      
      {/* Receiver */}
      {generateReceiver()}
      
      {/* Magazine */}
      {generateMagazine()}
      
      {/* Stock */}
      {generateStock()}
      
      {/* Grip */}
      {generateGrip()}
      
      {/* Trigger guard */}
      {generateTriggerGuard()}
      
      {/* Sights */}
      {generateSights()}
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#10b981" />
      <pointLight position={[-5, -5, 5]} intensity={0.3} color="#10b981" />
      <WireframeGun />
    </>
  );
}

const Avatar3D: React.FC = () => {
  return (
    <div className="w-full h-[400px] md:h-[500px] lg:h-[600px]">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        style={{ width: "100%", height: "100%", background: "transparent" }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Avatar3D;