"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { RoundedBox, Text } from "@react-three/drei"
import * as THREE from "three"

interface CardData {
  position: [number, number, number]
  rotation: [number, number, number]
  rank: number
  keyword: string
  domain: string
  color: string
  speed: number
  phase: number
}

const CARDS: CardData[] = [
  { position: [-2.2,  0.8, 0.4], rotation: [0.05, 0.25, -0.05], rank: 1, keyword: "seo agency near me",        domain: "rankroyalty.com",   color: "#00ff87", speed: 0.9,  phase: 0 },
  { position: [ 2.4,  0.4, 0.2], rotation: [0.0, -0.2, 0.04],   rank: 1, keyword: "best seo company",          domain: "rankroyalty.com",   color: "#00ff87", speed: 1.1,  phase: 1.5 },
  { position: [-1.8, -1.0, 0.6], rotation: [-0.04, 0.15, 0.06], rank: 2, keyword: "local seo services",        domain: "rankroyalty.com",   color: "#a78bfa", speed: 0.85, phase: 3.0 },
  { position: [ 1.8,  1.4, 0.1], rotation: [0.06, -0.12, -0.03],rank: 3, keyword: "technical seo audit",       domain: "rankroyalty.com",   color: "#60a5fa", speed: 1.2,  phase: 0.8 },
  { position: [-3.0,  0.0, 0.0], rotation: [0.02, 0.3, -0.02],  rank: 1, keyword: "seo link building agency",  domain: "rankroyalty.com",   color: "#00ff87", speed: 0.95, phase: 2.2 },
  { position: [ 3.1, -0.6, 0.3], rotation: [-0.03, -0.25, 0.03],rank: 4, keyword: "keyword research service",  domain: "rankroyalty.com",   color: "#f59e0b", speed: 1.05, phase: 4.1 },
]

function SerpCard({ data, index }: { data: CardData; index: number }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()

    // Organic Float animation
    const targetY = data.position[1] + Math.sin(t * data.speed + data.phase) * 0.12 + Math.cos(t * data.speed * 0.4) * 0.04
    const targetX = data.position[0] + Math.cos(t * data.speed * 0.7 + data.phase) * 0.08
    const targetZ = data.position[2] + Math.sin(t * data.speed * 0.5 + data.phase) * 0.1

    groupRef.current.position.set(targetX, targetY, targetZ)

    // Smooth mouse parallax
    const targetRotY = data.rotation[1] + pointer.x * 0.15
    const targetRotX = data.rotation[0] - pointer.y * 0.15
    
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05)
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05)
  })

  const glowColor = new THREE.Color(data.color)

  return (
    <group
      ref={groupRef}
      position={data.position}
      rotation={data.rotation}
    >
      {/* Card body */}
      <RoundedBox args={[1.7, 0.72, 0.04]} radius={0.04} smoothness={4}>
        <meshPhysicalMaterial
          color="#ffffff"
          metalness={0.1}
          roughness={0.15}
          transmission={1}
          ior={1.52}
          thickness={0.8}
          attenuationColor={glowColor}
          attenuationDistance={0.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transparent
        />
      </RoundedBox>

      {/* Border glow */}
      <RoundedBox args={[1.72, 0.74, 0.035]} radius={0.042} smoothness={4}>
        <meshBasicMaterial 
          color={data.color} 
          transparent 
          opacity={0.25} 
          blending={THREE.AdditiveBlending} 
          side={THREE.BackSide} 
        />
      </RoundedBox>

      {/* Rank badge */}
      <mesh position={[-0.65, 0.18, 0.025]}>
        <planeGeometry args={[0.22, 0.16]} />
        <meshBasicMaterial color={data.color} transparent opacity={0.15} />
      </mesh>

      {/* Rank number */}
      <Text
        position={[-0.65, 0.18, 0.03]}
        fontSize={0.08}
        color={data.color}
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
      >
        #{data.rank}
      </Text>

      {/* Keyword */}
      <Text
        position={[-0.1, 0.18, 0.03]}
        fontSize={0.065}
        color="rgba(255,255,255,0.9)"
        anchorX="left"
        anchorY="middle"
        maxWidth={1.2}
        font="/fonts/inter-medium.woff"
      >
        {data.keyword}
      </Text>

      {/* Domain */}
      <Text
        position={[-0.65, -0.04, 0.03]}
        fontSize={0.055}
        color={data.color}
        anchorX="left"
        anchorY="middle"
        font="/fonts/inter-regular.woff"
      >
        {data.domain}
      </Text>

      {/* Snippet line 1 */}
      <Text
        position={[-0.65, -0.16, 0.03]}
        fontSize={0.045}
        color="rgba(255,255,255,0.35)"
        anchorX="left"
        anchorY="middle"
        maxWidth={1.4}
        font="/fonts/inter-regular.woff"
      >
        Results-driven SEO that actually moves rankings...
      </Text>

      {/* Glow point light behind card */}
      <pointLight
        position={[0, 0, -0.3]}
        color={glowColor}
        intensity={1.5}
        distance={2.5}
      />
    </group>
  )
}

export default function SerpCards() {
  return (
    <group>
      {CARDS.map((card, i) => (
        <SerpCard key={i} data={card} index={i} />
      ))}
    </group>
  )
}
