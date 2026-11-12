import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Environment, Lightformer } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import type { Group } from "three";
function Stack({ colors, reduced }: { colors: string[]; reduced: boolean }) {
  const ref = useRef<Group>(null);
  useFrame((state,delta) => { if (!ref.current || reduced) return; ref.current.rotation.y += Math.min(delta,0.05)*0.12; ref.current.rotation.x = -0.25 + state.pointer.y * 0.08; });
  return <group ref={ref} rotation={[-0.25,0.5,0.05]}>{colors.map((color,i) => <RoundedBox key={i} args={[2.2,0.28,1.5]} radius={0.1} smoothness={3} position={[0,(i-1)*0.55,0]}><meshStandardMaterial color={color} metalness={0.45} roughness={0.28} /></RoundedBox>)}</group>;
}
export default function BrandScene() {
  const [colors,setColors] = useState<string[]>([]); const reduced = useReducedMotion();
  useEffect(() => { const styles = getComputedStyle(document.documentElement); const canvas = document.createElement("canvas"); const ctx = canvas.getContext("2d"); setColors(["--brand-cyan","--brand-blue","--brand-violet"].map((token) => { if (!ctx) return ""; ctx.fillStyle = styles.getPropertyValue(token).trim(); ctx.fillRect(0,0,1,1); const pixel = ctx.getImageData(0,0,1,1).data; return `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`; })); }, []);
  if (!colors.length) return null;
  return <div className="h-56 sm:h-72 w-full" data-scene-ready="true" aria-label="Interactive SecStackHQ technology layers"><Canvas camera={{ position:[0,1,5],fov:40 }} dpr={1} frameloop={reduced ? "demand" : "always"}><ambientLight intensity={1.5} /><directionalLight position={[4,5,5]} intensity={3} /><Environment resolution={64}><Lightformer intensity={2} position={[0,4,0]} scale={[10,10,1]} /><Lightformer intensity={1} position={[-3,1,0]} rotation-y={Math.PI/2} scale={[10,10,1]} /></Environment><Stack colors={colors} reduced={!!reduced} /></Canvas></div>;
}