"use client"

import { useRef, useMemo } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

const vert = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const frag = `
uniform float uTime;
uniform vec2  uMouse;
uniform vec2  uVelocity;
uniform vec2  uResolution;
varying vec2  vUv;

// Smooth minimum — the magic that merges blobs
float smin(float a, float b, float k) {
  float h = max(k - abs(a - b), 0.0) / k;
  return min(a, b) - h * h * k * 0.25;
}

// Fast hash
float hash(vec2 p) {
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

// Value noise
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i),            hash(i + vec2(1,0)), f.x),
    mix(hash(i + vec2(0,1)),hash(i + vec2(1,1)), f.x),
    f.y
  );
}

// Fractal brownian motion — layered noise
float fbm(vec2 p) {
  float v = 0.0; float a = 0.5;
  for (int i = 0; i < 6; i++) {
    v += a * noise(p);
    p  = p * 2.1 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = vUv * 2.0 - 1.0;
  // Aspect correction
  uv.x *= uResolution.x / uResolution.y;

  float t     = uTime * 0.35;
  float speed = length(uVelocity);
  vec2  vel   = uVelocity;

  // Domain warping — makes the blob feel fluid, not geometric
  float warpAmt = 0.22 + speed * 0.18;
  vec2 q = vec2(
    fbm(uv * 1.4 + vec2(t * 0.4, 0.0)),
    fbm(uv * 1.4 + vec2(0.0, t * 0.4))
  );
  vec2 r = vec2(
    fbm(uv * 1.8 + 4.0 * q + vec2(1.7, 9.2) + t * 0.15),
    fbm(uv * 1.8 + 4.0 * q + vec2(8.3, 2.8) + t * 0.15)
  );
  vec2 wuv = uv + warpAmt * r;

  // Mouse-following center (sluggish — feels heavy)
  vec2 center = uMouse * 0.28;

  // === METABALLS ===

  // 1. Core blob — large, always present
  float d1 = length(wuv - center) - 0.44;

  // 2. Velocity blob — appears in direction of mouse movement, size = speed
  vec2  velDir = length(vel) > 0.001 ? normalize(vel) : vec2(0.0);
  float stretch = min(speed * 2.0, 0.35);
  float d2 = length(wuv - center - velDir * stretch) - (0.26 + stretch * 0.5);

  // 3. Trailing ghost — lags behind movement
  float d3 = length(wuv - center + velDir * stretch * 0.5) - 0.18;

  // 4. Two small orbiting satellites
  float o = t * 0.65;
  vec2 orb1 = center + vec2(cos(o)       * 0.28, sin(o * 0.9)       * 0.22);
  vec2 orb2 = center + vec2(cos(o + 2.1) * 0.22, sin(o * 1.15 + 1.) * 0.20);
  float d4 = length(wuv - orb1) - 0.13;
  float d5 = length(wuv - orb2) - 0.11;

  // Merge everything smoothly
  float d = smin(d1, d2, 0.20);
  d = smin(d, d3, 0.16);
  d = smin(d, d4, 0.14);
  d = smin(d, d5, 0.12);

  // === COLORING ===

  // Base alpha — sharp but slightly soft edge
  float alpha = smoothstep(0.018, -0.018, d);
  if (alpha < 0.001) discard;

  // Edge factor (0 = inside, 1 = at boundary)
  float edge = smoothstep(-0.35, 0.0, d);

  // Core caustics — internal shimmer
  float caustic  = fbm(wuv * 3.5 + vec2(t * 0.7, t * 0.4)) * 0.35;
  float caustic2 = fbm(wuv * 6.0 - vec2(t * 0.5, 0.0))     * 0.15;

  // Teal palette
  vec3 coreTeal  = vec3(0.04, 0.82, 0.85);   // bright teal
  vec3 midTeal   = vec3(0.0,  0.48, 0.58);   // medium
  vec3 deepTeal  = vec3(0.0,  0.10, 0.18);   // near-black teal
  vec3 highlight = vec3(0.6,  0.95, 1.0);    // cyan-white highlight

  vec3 col = mix(mix(coreTeal, midTeal, edge * 0.7), deepTeal, edge * edge);

  // Add caustics to interior
  col += vec3(0.0, caustic * 0.45, caustic * 0.55) * (1.0 - edge);
  col += vec3(caustic2 * 0.1, caustic2 * 0.3, caustic2 * 0.35);

  // Specular highlight (top-left, like a real 3D sphere)
  float hlDist = length(wuv - center + vec2(-0.12, 0.16)) - 0.12;
  float hl     = smoothstep(0.08, -0.04, hlDist) * (1.0 - edge * 0.7);
  col += highlight * hl * 0.55;

  // Chromatic aberration at edges (colour split)
  float aberr = smoothstep(-0.1, 0.01, d) * 0.012;
  float rA = smoothstep(0.018, -0.018, d + aberr);
  float bA = smoothstep(0.018, -0.018, d - aberr);
  vec3 finalCol = vec3(col.r * rA / max(alpha, 0.001), col.g, col.b * bA / max(alpha, 0.001)) * alpha;

  gl_FragColor = vec4(finalCol, alpha * 0.95);
}
`

export default function BlobShader() {
  const meshRef = useRef<THREE.Mesh>(null)
  const { size } = useThree()
  const velRef  = useRef(new THREE.Vector2(0, 0))
  const prevMouse = useRef(new THREE.Vector2(0, 0))

  const uniforms = useMemo(() => ({
    uTime:       { value: 0 },
    uMouse:      { value: new THREE.Vector2(0, 0) },
    uVelocity:   { value: new THREE.Vector2(0, 0) },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
  }), [size.width, size.height])

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime()
    uniforms.uTime.value = t

    // Smooth mouse follow
    uniforms.uMouse.value.lerp(new THREE.Vector2(pointer.x, pointer.y), 0.06)

    // Velocity = how fast mouse is moving
    const curr = new THREE.Vector2(pointer.x, pointer.y)
    const v    = curr.clone().sub(prevMouse.current).multiplyScalar(60)
    velRef.current.lerp(v, 0.15)
    uniforms.uVelocity.value.copy(velRef.current)
    prevMouse.current.copy(curr)
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -0.5]}>
      <planeGeometry args={[6, 6, 1, 1]} />
      <shaderMaterial
        vertexShader={vert}
        fragmentShader={frag}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}
