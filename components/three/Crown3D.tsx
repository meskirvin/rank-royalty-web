"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import * as THREE from "three"

const GOLD = new THREE.Color("#D4AF37")
const GOLD_BRIGHT = new THREE.Color("#FFD060")

function GoldMaterial({ color = GOLD, roughness = 0.18 }: { color?: THREE.Color; roughness?: number }) {
  return (
    <meshPhysicalMaterial
      color={color}
      metalness={0.95}
      roughness={roughness}
      envMapIntensity={2.5}
      reflectivity={1}
    />
  )
}

function CrownSpike({ angle, height, radius }: { angle: number; height: number; radius: number }) {
  const rad = (angle * Math.PI) / 180
  const x   = Math.sin(rad) * radius
  const z   = Math.cos(rad) * radius

  return (
    <group position={[x, 0.55, z]}>
      {/* Spike */}
      <mesh castShadow>
        <coneGeometry args={[0.1, height, 6, 1]} />
        <GoldMaterial roughness={0.12} />
      </mesh>
      {/* Gem at tip */}
      <mesh position={[0, height / 2 + 0.05, 0]}>
        <octahedronGeometry args={[0.065, 0]} />
        <meshPhysicalMaterial
          color={GOLD_BRIGHT}
          metalness={0.2}
          roughness={0.05}
          transmission={0.4}
          thickness={0.1}
          envMapIntensity={3}
        />
      </mesh>
    </group>
  )
}

export default function Crown3D() {
  const groupRef = useRef<THREE.Group>(null)
  const innerRingRef = useRef<THREE.Mesh>(null)

  // Crown spike config: 5 spikes, alternating tall/short
  const spikes = useMemo(() => [
    { angle: 0,   height: 1.3 },  // front — tallest
    { angle: 72,  height: 0.75 },
    { angle: 144, height: 1.1 },
    { angle: 216, height: 1.1 },
    { angle: 288, height: 0.75 },
  ], [])

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()

    // Slow majestic rotation
    groupRef.current.rotation.y = t * 0.12

    // Gentle float
    groupRef.current.position.y = Math.sin(t * 0.4) * 0.06

    // Subtle mouse tilt
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      pointer.y * 0.12,
      0.03
    )

    // Inner detail ring counter-rotates
    if (innerRingRef.current) {
      innerRingRef.current.rotation.y = -t * 0.3
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={[0.9, 0.9, 0.9]}>
      {/* Environment for gold reflections */}
      <Environment preset="studio" />

      {/* ── BASE RING ───────────────────────────── */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[0.95, 0.12, 16, 80]} />
        <GoldMaterial roughness={0.1} />
      </mesh>

      {/* ── CROWN BODY (tapered cylinder) ───────── */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.75, 0.95, 0.6, 64, 1, true]} />
        <GoldMaterial />
      </mesh>

      {/* ── TOP RING ────────────────────────────── */}
      <mesh position={[0, 0.62, 0]}>
        <torusGeometry args={[0.76, 0.06, 12, 64]} />
        <GoldMaterial roughness={0.08} color={GOLD_BRIGHT} />
      </mesh>

      {/* ── SPIKES ──────────────────────────────── */}
      {spikes.map((s, i) => (
        <CrownSpike key={i} angle={s.angle} height={s.height} radius={0.72} />
      ))}

      {/* ── INNER DETAIL RING (counter-rotates) ─── */}
      <mesh ref={innerRingRef} position={[0, 0.3, 0]}>
        <torusGeometry args={[0.55, 0.025, 8, 48]} />
        <GoldMaterial roughness={0.05} color={GOLD_BRIGHT} />
      </mesh>

      {/* ── BASE GEMS (5 diamonds around base ring) */}
      {[0, 72, 144, 216, 288].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        return (
          <mesh key={i} position={[Math.sin(rad) * 0.95, 0, Math.cos(rad) * 0.95]}>
            <octahedronGeometry args={[0.05, 0]} />
            <meshPhysicalMaterial
              color={GOLD_BRIGHT}
              metalness={0.1}
              roughness={0.0}
              transmission={0.5}
              envMapIntensity={4}
            />
          </mesh>
        )
      })}

      {/* ── CROWN LIGHT (makes it glow from within) */}
      <pointLight position={[0, 0.5, 0]} color="#FFD060" intensity={3} distance={4} />
      <pointLight position={[0, -0.5, 0]} color="#8B6914" intensity={1} distance={3} />
    </group>
  )
}
