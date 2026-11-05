import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";
import { explodeFor, spinFor } from "./wheelMath";

// Cores da marca (three precisa de valores concretos, não de tokens CSS)
const RED = "#e63946";
const RUBBER = "#151515";

/** Textura procedural de sulcos para o pneu. */
const useTreadTexture = () =>
  useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 512;
    c.height = 64;
    const g = c.getContext("2d")!;
    g.fillStyle = "#1a1a1a";
    g.fillRect(0, 0, 512, 64);
    g.strokeStyle = "#050505";
    g.lineWidth = 6;
    for (let x = 0; x < 512; x += 16) {
      g.beginPath();
      g.moveTo(x, 0);
      g.lineTo(x + 10, 32);
      g.lineTo(x, 64);
      g.stroke();
    }
    g.fillStyle = "#070707";
    g.fillRect(0, 28, 512, 8);
    const t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(6, 1);
    return t;
  }, []);

const Wheel = ({ progress }: { progress: MotionValue<number> }) => {
  const root = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const tire = useRef<THREE.Group>(null);
  const rim = useRef<THREE.Group>(null);
  const caliper = useRef<THREE.Group>(null);
  const tread = useTreadTexture();

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const p = progress.get();
    const e = explodeFor(p);
    if (spin.current) spin.current.rotation.z = THREE.MathUtils.damp(spin.current.rotation.z, -spinFor(p), 6, dt);
    if (tire.current) tire.current.position.z = THREE.MathUtils.damp(tire.current.position.z, -0.9 * e, 6, dt);
    if (rim.current) rim.current.position.z = THREE.MathUtils.damp(rim.current.position.z, 0.7 * e, 6, dt);
    if (caliper.current) {
      caliper.current.position.x = THREE.MathUtils.damp(caliper.current.position.x, 0.55 + 0.7 * e, 6, dt);
    }
    if (root.current) {
      // inclina levemente seguindo o mouse
      root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, -0.5 + state.pointer.x * 0.25, 4, dt);
      root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, -state.pointer.y * 0.15, 4, dt);
    }
  });

  const spokes = [0, 1, 2, 3, 4].map((i) => (i / 5) * Math.PI * 2);

  return (
    <group ref={root} rotation={[0, -0.5, 0]}>
      <group ref={spin}>
        {/* Pneu */}
        <group ref={tire}>
          <mesh castShadow>
            <torusGeometry args={[1.18, 0.36, 32, 96]} />
            <meshStandardMaterial color={RUBBER} roughness={0.95} metalness={0} map={tread} bumpMap={tread} bumpScale={0.04} />
          </mesh>
        </group>

        {/* Aro de liga + raios + cubo */}
        <group ref={rim}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.92, 0.92, 0.42, 64, 1, true]} />
            <meshStandardMaterial color="#d8d8d8" metalness={1} roughness={0.18} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0, 0, 0.2]}>
            <torusGeometry args={[0.9, 0.05, 16, 96]} />
            <meshStandardMaterial color="#f0f0f0" metalness={1} roughness={0.12} />
          </mesh>
          {spokes.map((a) => (
            <group key={a} rotation={[0, 0, a]}>
              <mesh position={[0, 0.5, 0.16]} rotation={[0.12, 0, 0]}>
                <boxGeometry args={[0.16, 0.8, 0.08]} />
                <meshStandardMaterial color="#e6e6e6" metalness={0.85} roughness={0.25} />
              </mesh>
            </group>
          ))}
          <mesh position={[0, 0, 0.18]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.2, 0.24, 0.16, 32]} />
            <meshStandardMaterial color="#9a9a9a" metalness={1} roughness={0.25} />
          </mesh>
          <mesh position={[0, 0, 0.27]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.04, 24]} />
            <meshStandardMaterial color={RED} metalness={0.4} roughness={0.35} />
          </mesh>
        </group>

        {/* Disco de freio (gira junto) */}
        <mesh position={[0, 0, -0.1]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.7, 0.7, 0.05, 64]} />
          <meshStandardMaterial color="#6b6b6b" metalness={0.9} roughness={0.45} />
        </mesh>
      </group>

      {/* Pinça de freio vermelha (não gira) */}
      <group ref={caliper} position={[0.55, 0.3, -0.02]} rotation={[0, 0, -0.5]}>
        <mesh castShadow>
          <boxGeometry args={[0.22, 0.55, 0.22]} />
          <meshStandardMaterial color={RED} metalness={0.3} roughness={0.35} />
        </mesh>
      </group>
    </group>
  );
};

/** Canvas da roda. `active` controla o frameloop (demand fora da viewport). */
const WheelCanvas = ({ progress, active }: { progress: MotionValue<number>; active: boolean }) => (
  <Canvas
    dpr={[1, 1.5]}
    frameloop={active ? "always" : "demand"}
    gl={{ alpha: true, antialias: true }}
    camera={{ position: [0, 0.2, 4.4], fov: 38 }}
    onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    data-scene-ready
  >
    <ambientLight intensity={0.45} />
    <directionalLight position={[3, 4, 4]} intensity={2.2} color="#ffd9a8" />
    <pointLight position={[-2.5, 0.5, -2]} intensity={30} color={RED} distance={8} />
    <pointLight position={[2.5, -0.5, -2]} intensity={14} color={RED} distance={8} />
    <Environment resolution={128} environmentIntensity={1.4}>
      <Lightformer intensity={2} position={[0, 5, 0]} scale={[10, 10, 1]} rotation-x={Math.PI / 2} />
      <Lightformer intensity={1.2} color="#ffcf99" position={[-5, 1, -1]} rotation-y={Math.PI / 2} scale={[20, 1, 1]} />
      <Lightformer intensity={1.4} color={RED} position={[5, 1, -1]} rotation-y={-Math.PI / 2} scale={[20, 1, 1]} />
    </Environment>
    <Wheel progress={progress} />
    <ContactShadows position={[0, -1.65, 0]} opacity={0.6} scale={6} blur={2.4} far={3} frames={active ? Infinity : 1} />
  </Canvas>
);

export default WheelCanvas;
