"use client"

import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import HeroScene from "./HeroScene"

export default function HeroCanvas() {
  return (
    <Canvas
      id="hero-canvas"
      camera={{ position: [0, 0.5, 4.5], fov: 55 }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
        toneMapping: 3,
        toneMappingExposure: 1.2,
      }}
    >
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>
    </Canvas>
  )
}
