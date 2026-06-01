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

float smin(float a, float b, float k) {
  float h = max(k - abs(a - b), 0.0) / k;
  return min(a, b) - h * h * k * 0.25;
}

float hash(vec2 p) {
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p); vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1,0)), f.x),
    mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x), f.y
  );
}

float fbm(vec2 p) {
  float v = 0.0; float a = 0.5;
  for (int i = 0; i < 6; i++) { v += a * noise(p); p = p * 2.1 + vec2(1.7, 9.2); a *= 0.5; }
  return v;
}

void main() {
  vec2 uv = vUv * 2.0 - 1.0;
  uv.x *= uResolution.x / uResolution.y;

  float t     = uTime * 0.28;
  float speed = length(uVelocity);
  vec2  vel   = uVelocity;

  // Domain warp
  float warpAmt = 0.18 + speed * 0.15;
  vec2 q = vec2(fbm(uv * 1.3 + vec2(t * 0.35, 0.0)), fbm(uv * 1.3 + vec2(0.0, t * 0.35)));
  vec2 r = vec2(fbm(uv * 1.7 + 3.5 * q + vec2(1.7, 9.2) + t * 0.12), fbm(uv * 1.7 + 3.5 * q + vec2(8.3, 2.8) + t * 0.12));
  vec2 wuv = uv + warpAmt * r;

  vec2 center = uMouse * 0.25;

  // Metaballs — gold/amber palette
  vec2  velDir = length(vel) > 0.001 ? normalize(vel) : vec2(0.0);
  float stretch = min(speed * 1.8, 0.3);
  float d1 = length(wuv - center) - 0.52;
  float d2 = length(wuv - center - velDir * stretch) - (0.32 + stretch * 0.4);
  float d3 = length(wuv - center + velDir * stretch * 0.4) - 0.22;

  float o = t * 0.5;
  float d4 = length(wuv - center - vec2(cos(o)       * 0.32, sin(o * 0.9)       * 0.26)) - 0.14;
  float d5 = length(wuv - center - vec2(cos(o + 2.1) * 0.26, sin(o * 1.1 + 1.0) * 0.24)) - 0.12;

  float d = smin(d1, d2, 0.22);
  d = smin(d, d3, 0.18);
  d = smin(d, d4, 0.15);
  d = smin(d, d5, 0.13);

  float alpha = smoothstep(0.02, -0.02, d);
  if (alpha < 0.001) discard;

  float edge = smoothstep(-0.4, 0.0, d);

  // Gold caustics
  float caustic  = fbm(wuv * 3.0 + vec2(t * 0.6, t * 0.3)) * 0.4;
  float caustic2 = fbm(wuv * 5.5 - vec2(t * 0.4, 0.0))     * 0.2;

  // Gold color palette
  vec3 coreGold  = vec3(1.0,  0.82, 0.2);   // bright warm gold
  vec3 midGold   = vec3(0.75, 0.52, 0.08);  // rich gold
  vec3 deepAmber = vec3(0.18, 0.08, 0.01);  // near-black amber
  vec3 highlight = vec3(1.0,  0.96, 0.75);  // bright highlight

  vec3 col = mix(mix(coreGold, midGold, edge * 0.65), deepAmber, edge * edge);
  col += vec3(caustic * 0.5, caustic * 0.3, caustic * 0.05) * (1.0 - edge);
  col += vec3(caustic2 * 0.3, caustic2 * 0.2, 0.0);

  // Specular highlight — upper left
  float hlDist = length(wuv - center + vec2(-0.14, 0.18)) - 0.1;
  float hl = smoothstep(0.1, -0.04, hlDist) * (1.0 - edge * 0.6);
  col += highlight * hl * 0.7;

  // Chromatic aberration at edge
  float aberr = smoothstep(-0.1, 0.01, d) * 0.01;
  float rA = smoothstep(0.02, -0.02, d + aberr);
  float bA = smoothstep(0.02, -0.02, d - aberr);
  vec3 finalCol = vec3(col.r * rA / max(alpha, 0.001), col.g, col.b * bA / max(alpha, 0.001)) * alpha;

  gl_FragColor = vec4(finalCol, alpha * 0.6);
}
`

export default function BlobShader() {
  const meshRef = useRef<THREE.Mesh>(null)
  const { size } = useThree()
  const velRef    = useRef(new THREE.Vector2(0, 0))
  const prevMouse = useRef(new THREE.Vector2(0, 0))

  const uniforms = useMemo(() => ({
    uTime:       { value: 0 },
    uMouse:      { value: new THREE.Vector2(0, 0) },
    uVelocity:   { value: new THREE.Vector2(0, 0) },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
  }), [size.width, size.height])

  useFrame(({ clock, pointer }) => {
    uniforms.uTime.value = clock.getElapsedTime()
    uniforms.uMouse.value.lerp(new THREE.Vector2(pointer.x, pointer.y), 0.05)
    const curr = new THREE.Vector2(pointer.x, pointer.y)
    const v    = curr.clone().sub(prevMouse.current).multiplyScalar(60)
    velRef.current.lerp(v, 0.12)
    uniforms.uVelocity.value.copy(velRef.current)
    prevMouse.current.copy(curr)
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -0.8]}>
      <planeGeometry args={[7, 7, 1, 1]} />
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
