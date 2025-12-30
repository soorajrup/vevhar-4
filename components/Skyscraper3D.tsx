import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { Center, Environment, shaderMaterial, Edges } from '@react-three/drei';
import * as THREE from 'three';

// --- Kinetic Data Material ---
// A shader that simulates data/energy flowing through the structure
const KineticGoldMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color("#FFD700"), // Brighter Gold
    uBaseColor: new THREE.Color("#050505"), // Deep Black
    uGridColor: new THREE.Color("#333333"), // Dark Grey Grid
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    varying vec3 vWorldPosition;
    varying vec3 vNormal;

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPos.xyz;
      gl_Position = projectionMatrix * viewMatrix * worldPos;
    }
  `,
  // Fragment Shader
  `
    uniform float uTime;
    uniform vec3 uColor;
    uniform vec3 uBaseColor;
    uniform vec3 uGridColor;
    
    varying vec2 vUv;
    varying vec3 vWorldPosition;
    varying vec3 vNormal;

    void main() {
      vec3 viewDir = normalize(cameraPosition - vWorldPosition);
      float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 2.0);
      
      // Architectural Grid
      float gridScale = 4.0;
      float gridX = step(0.95, fract(vWorldPosition.x * gridScale)); 
      float gridY = step(0.95, fract(vWorldPosition.y * gridScale));
      float grid = max(gridX, gridY);

      // Upward Data Flow Animation - Adjusted speed
      float flowSpeed = 2.0;
      float repeatHeight = 5.0; // Shorter distance between beams
      float flow = mod(vWorldPosition.y - uTime * flowSpeed + vWorldPosition.x * 0.3, repeatHeight);
      
      // Pulse is wider and brighter now
      float pulse = smoothstep(0.0, 0.8, flow) * smoothstep(2.5, 0.8, flow); 
      
      // Secondary fast flicker
      float flicker = step(0.98, sin(vWorldPosition.y * 20.0 - uTime * 10.0));

      // Combine
      vec3 color = uBaseColor;
      
      // Grid lines glow intensely with the pulse
      vec3 activeGridColor = mix(uGridColor, uColor, pulse * 1.5 + flicker * 0.8);
      color = mix(color, activeGridColor, grid);
      
      // Surface Glow: The wall itself lights up slightly when the beam passes
      color += uColor * pulse * 0.35;
      
      // Fresnel edge glow - much stronger during pulse
      color += uColor * fresnel * 0.8 * pulse;

      // Translucency: Base is transparent, but becomes significantly more opaque during the pulse
      float alpha = 0.02 + (fresnel * 0.1) + (pulse * 0.3);
      
      gl_FragColor = vec4(color, alpha);
    }
  `
);

extend({ KineticGoldMaterial });

const ApartmentSuite = () => {
  const groupRef = useRef<THREE.Group>(null);
  const material = useMemo(() => new KineticGoldMaterial({ transparent: true, side: THREE.DoubleSide }), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    material.uniforms.uTime.value = t;

    // Slowly rotate the entire suite
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.15;
    }
  });

  const wallHeight = 1.2;
  const wallThickness = 0.05;
  const edgeColor = "#666";

  return (
    <Center top>
      <group ref={groupRef} rotation={[0.2, 0, 0]}>
        
        {/* --- EXTERIOR WALLS --- */}
        
        {/* Back Wall (North) */}
        <mesh position={[0, wallHeight/2, -2.5]}>
          <boxGeometry args={[6, wallHeight, wallThickness]} />
          <primitive object={material} attach="material" />
          <Edges scale={1} threshold={15} color={edgeColor} />
        </mesh>

        {/* Front Wall (South) - Split for entry */}
        <mesh position={[-2, wallHeight/2, 2.5]}>
          <boxGeometry args={[2, wallHeight, wallThickness]} />
          <primitive object={material} attach="material" />
          <Edges scale={1} threshold={15} color={edgeColor} />
        </mesh>
        <mesh position={[2, wallHeight/2, 2.5]}>
          <boxGeometry args={[2, wallHeight, wallThickness]} />
          <primitive object={material} attach="material" />
          <Edges scale={1} threshold={15} color={edgeColor} />
        </mesh>

        {/* Left Wall (West) */}
        <mesh position={[-3, wallHeight/2, 0]}>
          <boxGeometry args={[wallThickness, wallHeight, 5]} />
          <primitive object={material} attach="material" />
          <Edges scale={1} threshold={15} color={edgeColor} />
        </mesh>

        {/* Right Wall (East) */}
        <mesh position={[3, wallHeight/2, 0]}>
          <boxGeometry args={[wallThickness, wallHeight, 5]} />
          <primitive object={material} attach="material" />
          <Edges scale={1} threshold={15} color={edgeColor} />
        </mesh>

        {/* --- INTERIOR WALLS --- */}

        {/* Bedroom/Bath Partition */}
        <mesh position={[0, wallHeight/2, -1]}>
          <boxGeometry args={[wallThickness, wallHeight, 3]} />
          <primitive object={material} attach="material" />
          <Edges scale={1} threshold={15} color={edgeColor} />
        </mesh>
        
        {/* Living Room Partition */}
        <mesh position={[1.5, wallHeight/2, 0.5]}>
          <boxGeometry args={[3, wallHeight, wallThickness]} />
          <primitive object={material} attach="material" />
          <Edges scale={1} threshold={15} color={edgeColor} />
        </mesh>

        {/* --- FURNITURE PLACEHOLDERS (Abstract) --- */}

        {/* Bed */}
        <mesh position={[-1.5, 0.2, -1.5]}>
          <boxGeometry args={[1.8, 0.4, 2.2]} />
          <primitive object={material} attach="material" />
          <Edges scale={1} threshold={15} color="#555" />
        </mesh>

        {/* Sofa */}
        <mesh position={[1.5, 0.25, 1.8]}>
          <boxGeometry args={[2.5, 0.5, 0.8]} />
          <primitive object={material} attach="material" />
          <Edges scale={1} threshold={15} color="#555" />
        </mesh>

        {/* Kitchen Island */}
        <mesh position={[1.5, 0.45, -0.5]}>
          <boxGeometry args={[2, 0.9, 0.8]} />
          <primitive object={material} attach="material" />
          <Edges scale={1} threshold={15} color="#555" />
        </mesh>

      </group>
    </Center>
  );
};

export const Skyscraper3D: React.FC = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [8, 8, 8], fov: 35 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]} 
      >
        <ambientLight intensity={0.2} />
        <Environment preset="city" />
        
        <spotLight position={[10, 15, 10]} angle={0.4} penumbra={1} intensity={1.5} color="#fff0d0" />
        <pointLight position={[-10, 5, -10]} intensity={0.5} color="#80a0ff" />

        <ApartmentSuite />
      </Canvas>
    </div>
  );
};