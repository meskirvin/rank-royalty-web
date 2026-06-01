"use client"

import { useRef, useMemo } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float uTime;
  uniform vec2  uMouse;
  varying vec2  vUv;

  float hash(vec2 p) {
    p = fract(p * vec2(234.34, 435.345));
    p += dot(p, p + 34.23);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p);
    f = f*f*(3.0-2.0*f);
    return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);
  }

  float fbm(vec2 p) {
    float v=0.0; float a=0.5;
    for(int i=0;i<5;i++){v+=a*noise(p);p=p*2.1+vec2(1.7,9.2);a*=0.5;}
    return v;
  }

  void main() {
    vec2 uv = vUv;
    vec2 mouse = uMouse * 0.2;
    float t = uTime * 0.12;

    vec2 q = vec2(fbm(uv * 2.0 + mouse + vec2(t, 0.0)), fbm(uv * 2.0 + mouse + vec2(0.0, t)));
    float n = fbm(uv * 3.0 + 2.5 * q + vec2(t * 0.4));
    n = n * 0.5 + 0.5;

    // Near-black gold palette — background must not compete with crown
    vec3 baseA  = vec3(0.02, 0.01, 0.0);   // very dark warm brown
    vec3 baseB  = vec3(0.04, 0.025, 0.0);  // slightly lighter
    vec3 glowA  = vec3(0.12, 0.07, 0.01);  // dim gold glow
    vec3 glowB  = vec3(0.07, 0.03, 0.0);   // amber

    vec3 col = mix(baseA, baseB, uv.x + q.x * 0.3);
    col = mix(col, mix(glowA, glowB, uv.x), n * 0.35);

    // Strong vignette — very dark edges
    float vig = smoothstep(1.5, 0.2, length(uv - 0.5));
    col *= vig * 0.9;

    // Subtle central warmth under the crown
    float centre = 1.0 - length((uv - 0.5) * vec2(1.0, 1.3));
    centre = clamp(centre, 0.0, 1.0);
    col += vec3(0.05, 0.025, 0.0) * pow(centre, 3.0) * n;

    gl_FragColor = vec4(col, 1.0);
  }
`

export default function BackgroundShader() {
  const meshRef = useRef<THREE.Mesh>(null)
  const { size } = useThree()

  const uniforms = useMemo(() => ({
    uTime:  { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
  }), [])

  useFrame(({ clock, pointer }) => {
    uniforms.uTime.value = clock.getElapsedTime()
    uniforms.uMouse.value.lerp(new THREE.Vector2(pointer.x, pointer.y), 0.03)
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -2]}>
      <planeGeometry args={[9, 9, 1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  )
}
