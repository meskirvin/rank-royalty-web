"use client"

import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import BackgroundShader from "./BackgroundShader"
import { EffectComposer, Noise, Vignette } from "@react-three/postprocessing"
import { BlendFunction } from "postprocessing"

export default function BackgroundCanvas() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: -2, pointerEvents: "none" }}>
      <Canvas camera={{ position: [0, 0, 4], fov: 60 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <BackgroundShader />
          <EffectComposer>
            <Noise opacity={0.06} blendFunction={BlendFunction.SOFT_LIGHT} />
            <Vignette eskil={false} offset={0.5} darkness={1.0} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  )
}
