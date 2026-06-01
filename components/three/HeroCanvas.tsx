"use client"

import { Canvas } from "@react-three/fiber"
import { Suspense, useEffect, useState } from "react"
import { ScrollControls, Scroll } from "@react-three/drei"
import HeroScene from "./HeroScene"

export default function HeroCanvas({ children }: { children?: React.ReactNode }) {
  const [eventSource, setEventSource] = useState<HTMLElement | null>(null)

  useEffect(() => {
    setEventSource(document.body)
  }, [])

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: -1, pointerEvents: "none" }}>
      <Canvas
        id="hero-canvas"
        eventSource={eventSource || undefined}
        eventPrefix="client"
        camera={{ position: [0, 0, 4], fov: 60 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
          toneMapping: 3, // ACESFilmic
          toneMappingExposure: 1.1,
        }}
      >
        <Suspense fallback={null}>
          <ScrollControls pages={6} damping={0.15} distance={1.2}>
            <HeroScene />
            <Scroll html style={{ width: "100vw" }}>
              {children}
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  )
}
