"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { EffectComposer, Bloom, ChromaticAberration, Noise, Vignette } from "@react-three/postprocessing"
import { BlendFunction } from "postprocessing"
import * as THREE from "three"
import BackgroundShader from "./BackgroundShader"
import BlobShader from "./BlobShader"
import Crown3D from "./Crown3D"

function GoldDust() {
  const ref   = useRef<THREE.Points>(null)
  const count = 250

  const positions = new Float32Array(count * 3)
  const sizes     = new Float32Array(count)
  for (let i = 0; i < count; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 8
    positions[i * 3 + 1] = (Math.random() - 0.5) * 5
    positions[i * 3 + 2] = (Math.random() - 0.5) * 3 - 1
    sizes[i]             = Math.random() * 2.5 + 0.5
  }

  useFrame(({ clock, pointer }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    ref.current.rotation.y = t * 0.025
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, pointer.y * 0.06, 0.04)
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size"     args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.014}
        color="#D4AF37"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

function CameraRig() {
  useFrame(({ camera, pointer }) => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.15, 0.03)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * 0.1,  0.03)
    camera.lookAt(0, 0, 0)
  })
  return null
}

export default function HeroScene() {
  return (
    <>
      {/* Royal lighting */}
      <ambientLight intensity={0.15} color="#3a2800" />
      <directionalLight position={[3, 5, 3]}  intensity={0.8} color="#FFD060" />
      <directionalLight position={[-3, -2, 2]} intensity={0.4} color="#8B6914" />
      <pointLight position={[0, 3, 3]} intensity={2} color="#FFD060" distance={10} />

      <BackgroundShader />
      <BlobShader />
      <Crown3D />
      <GoldDust />
      <CameraRig />

      <EffectComposer>
        <Bloom
          intensity={1.8}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          blendFunction={BlendFunction.ADD}
        />
        <ChromaticAberration
          offset={new THREE.Vector2(0.0005, 0.0005)}
          blendFunction={BlendFunction.NORMAL}
          radialModulation={false}
          modulationOffset={0}
        />
        <Noise opacity={0.03} blendFunction={BlendFunction.SOFT_LIGHT} />
        <Vignette eskil={false} offset={0.2} darkness={0.95} />
      </EffectComposer>
    </>
  )
}
