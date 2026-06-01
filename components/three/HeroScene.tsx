"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { EffectComposer, Bloom, ChromaticAberration, Noise, Vignette, DepthOfField } from "@react-three/postprocessing"
import { BlendFunction } from "postprocessing"
import * as THREE from "three"
import BackgroundShader from "./BackgroundShader"
import SerpCards from "./SerpCards"

const particleVertexShader = `
  uniform float uTime;
  attribute float size;
  void main() {
    vec3 pos = position;
    // Fluid vortex motion
    pos.x += sin(uTime * 0.3 + pos.y * 1.5) * 0.8;
    pos.z += cos(uTime * 0.4 + pos.x * 1.5) * 0.8;
    pos.y += sin(uTime * 0.2 + pos.z * 1.0) * 0.5;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = size * (20.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const particleFragmentShader = `
  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;
    float alpha = smoothstep(0.5, 0.1, dist);
    gl_FragColor = vec4(0.0, 1.0, 0.53, alpha * 0.5); // #00ff87
  }
`

function ParticleCloud() {
  const count = 300
  const ref   = useRef<THREE.Points>(null)
  const matRef = useRef<THREE.ShaderMaterial>(null)

  const { positions, sizes } = useMemo(() => {
    const pos  = new Float32Array(count * 3)
    const sz   = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 12
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5 - 1
      sz[i]          = Math.random() * 2.5 + 0.5
    }
    return { positions: pos, sizes: sz }
  }, [])

  const uniforms = useMemo(() => ({
    uTime: { value: 0 }
  }), [])

  useFrame(({ clock, pointer }) => {
    if (!ref.current || !matRef.current) return
    const t = clock.getElapsedTime()
    matRef.current.uniforms.uTime.value = t
    ref.current.rotation.y = t * 0.05 + pointer.x * 0.15
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, pointer.y * 0.15, 0.05)
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size"     args={[sizes, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function CameraRig() {
  useFrame(({ camera, pointer }) => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.6, 0.03)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * 0.4, 0.03)
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

      <EffectComposer disableNormalPass>
        <DepthOfField
          focusDistance={0.01}
          focalLength={0.05}
          bokehScale={4}
          height={480}
        />
        <Bloom
          intensity={1.5}
          luminanceThreshold={0.4}
          luminanceSmoothing={0.9}
          blendFunction={BlendFunction.ADD}
        />
        <ChromaticAberration
          offset={new THREE.Vector2(0.0015, 0.0015)}
          blendFunction={BlendFunction.NORMAL}
          radialModulation={true}
          modulationOffset={0.2}
        />
        <Noise opacity={0.06} blendFunction={BlendFunction.SOFT_LIGHT} />
        <Vignette eskil={false} offset={0.5} darkness={1.0} />
      </EffectComposer>
    </>
  )
}
