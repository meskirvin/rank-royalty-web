"use client"

import { useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { EffectComposer, Bloom, ChromaticAberration, Noise, Vignette } from "@react-three/postprocessing"
import { BlendFunction } from "postprocessing"
import * as THREE from "three"
import BackgroundShader from "./BackgroundShader"
import SerpCards from "./SerpCards"

function ParticleCloud() {
  const count = 300
  const ref   = useRef<THREE.Points>(null)

  const { positions, sizes } = (() => {
    const pos  = new Float32Array(count * 3)
    const sz   = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 10
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6
      pos[i * 3 + 2] = (Math.random() - 0.5) * 3 - 1
      sz[i]          = Math.random() * 3 + 0.5
    }
    return { positions: pos, sizes: sz }
  })()

  useFrame(({ clock, pointer }) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.getElapsedTime() * 0.015
    ref.current.rotation.x = pointer.y * 0.05
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size"     args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color="#00ff87"
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

function CameraRig() {
  useFrame(({ camera, pointer }) => {
    camera.position.x += (pointer.x * 0.3 - camera.position.x) * 0.04
    camera.position.y += (pointer.y * 0.2 - camera.position.y) * 0.04
    camera.lookAt(0, 0, 0)
  })
  return null
}

export default function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />
      <pointLight position={[-3, 2, 2]} intensity={1.5} color="#00ff87" distance={8} />
      <pointLight position={[ 3, -2, 2]} intensity={1.0} color="#7c3aed" distance={8} />

      <BackgroundShader />
      <ParticleCloud />
      <SerpCards />
      <CameraRig />

      <EffectComposer>
        <Bloom
          intensity={1.2}
          luminanceThreshold={0.3}
          luminanceSmoothing={0.9}
          blendFunction={BlendFunction.ADD}
        />
        <ChromaticAberration
          offset={new THREE.Vector2(0.0008, 0.0008)}
          blendFunction={BlendFunction.NORMAL}
          radialModulation={false}
          modulationOffset={0}
        />
        <Noise opacity={0.03} blendFunction={BlendFunction.SOFT_LIGHT} />
        <Vignette eskil={false} offset={0.3} darkness={0.8} />
      </EffectComposer>
    </>
  )
}
